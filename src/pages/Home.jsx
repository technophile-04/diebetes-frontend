import React from 'react';
import { Box, Text, VStack, Code, Grid } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Logo } from '../Logo';
import { useSmartAccountContext } from '../contexts/SmartAccountContext';
import { useWeb3AuthContext } from '../contexts/SocialLoginContext';
import ConnectButton from '../components/ConnectButton';

const Home = () => {
  const {
    address,
    loading: eoaLoading,
    userInfo,
    connect,
    disconnect,
    getUserInfo,
  } = useWeb3AuthContext();
  const {
    selectedAccount,
    loading: scwLoading,
    setSelectedAccount,
  } = useSmartAccountContext();

  console.log("address", address);

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <Logo h="40vmin" pointerEvents="none" />
          <Text>
            Edit <Code fontSize="xl">src/App.js</Code> and save to reload.
          </Text>
          <ConnectButton
          onClickFunc={
            !address
              ? connect
              : () => {
                  setSelectedAccount(null);
                  disconnect();
                }
          }
          title={!address ? "Connect Wallet" : "Disconnect Wallet"}
        />
        </VStack>
      </Grid>
    </Box>
  );
};

export default Home;
