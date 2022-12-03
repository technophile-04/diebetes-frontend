import { Box, HStack, Text } from '@chakra-ui/react';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { useSmartAccountContext } from '../contexts/SmartAccountContext';
import { useWeb3AuthContext } from '../contexts/SocialLoginContext';
import testABI from '../deployments/mumbai/TestToken.json';

const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;

const truncateEthAddress = address => {
  const match = address.match(truncateRegex);
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};

const Wallet = () => {
  const [testBalance, setTestBalance] = useState('0');
  const [isFetchingTestBalance, setIsFetchingTestBalance] = useState(false);
  const {
    address,
    loading: eoaLoading,
    ethersProvider,
    provider,
  } = useWeb3AuthContext();
  const { state, wallet } = useSmartAccountContext();

  const getAccountTestBalance = async () => {
    console.log('----------------------------------------------');
    console.log('ACOUNT BALNCE CALLED');
    console.log('----------------------------------------------');

    if (!provider || !address || !ethersProvider) return 'Wallet not connected';
    if (!state || !wallet) return 'Init Smart Account First';

    try {
      setIsFetchingTestBalance(true);
      console.log(
        '⚡️ ~ file: SmartAccountContext.tsx:235 ~ getAccountTestBalance ~ provider',
        ethersProvider
      );
      const testContract = new ethers.Contract(
        testABI.address,
        testABI.abi,
        ethersProvider
      );

      console.log(
        '⚡️ ~ file: SmartAccountContext.tsx:218 ~ getAccountTestBalance ~ state.address',
        state.address
      );
      const balance = await testContract.balanceOf(address);
      console.log(
        '⚡️ ~ file: SmartAccountContext.tsx:219 ~ getAccountTestBalance ~ balance',
        balance
      );

      const formatedBalance = ethers.utils.formatEther(balance);

      setTestBalance(formatedBalance);
      console.log(
        '⚡️ ~ file: SmartAccountContext.tsx:219 ~ getAccountTestBalance ~ testBalance',
        testBalance
      );

      setIsFetchingTestBalance(false);
      return '';
    } catch (error) {
      setIsFetchingTestBalance(false);
      console.error({ getSmartAccountBalance: error });
      return error.message;
    }
  };

  useEffect(() => {
    getAccountTestBalance();
  }, [state?.address]);

  if (!address) {
    return null;
  }

  return (
    <HStack position="absolute" top="4" right="0">
      <Text color="black" border="2px" borderColor="black">
        {isFetchingTestBalance ? 'loading...' : testBalance}
      </Text>
      <Text color="black">{truncateEthAddress(address)}</Text>
    </HStack>
  );
};

export default Wallet;
