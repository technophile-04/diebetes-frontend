import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Logo } from '../Logo';
import { useSmartAccountContext } from '../contexts/SmartAccountContext';
import { useWeb3AuthContext } from '../contexts/SocialLoginContext';
import ConnectButton from '../components/ConnectButton';
import AddFunds from '../components/AddFunds';
import Testimonials from '../components/Testimonials';
import Wallet from '../components/Wallet';
import { Link } from 'react-router-dom';
import SendNotificationButton from '../components/SendNotificationButton';
import SmartAccount from '@biconomy/smart-account';
import { ChainId } from '@biconomy/core-types';
import graphQuery from '../utils/graphQuery';
import './Home.css';

const Home = () => {
  const {
    address,
    loading: eoaLoading,
    userInfo,
    connect,
    disconnect,
    getUserInfo,
    web3Provider,
  } = useWeb3AuthContext();
  const {
    selectedAccount,
    loading: scwLoading,
    setSelectedAccount,
    balance: allTokensBalance,
    // wallet
  } = useSmartAccountContext();

  // const [signer, setSigner] = useState(wallet.getsigner())
  const [graphData, setgraphData] = useState();

  // const queryData = graphQuery();
  // console.log("hellllllll", queryData);
  console.log('address', address);

  useEffect(() => {
    (async () => {
      const data1 = await graphQuery();
      setgraphData(data1.proposals);
      console.log('-------------', data1);
    })();
  }, []);

  return (
    <Stack spacing={18} position="relative" pb={12}>
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={6} w={'full'} maxW={'lg'}>
            <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
              <Text
                as={'span'}
                position={'relative'}
                _after={{
                  content: "''",
                  width: 'full',
                  height: useBreakpointValue({ base: '20%', md: '30%' }),
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  bg: 'blue.400',
                  zIndex: -1,
                }}
              >
                DieBetes
              </Text>
              <br />{' '}
              <Text color={'blue.400'} as={'span'}>
                Wellness Goodness
              </Text>{' '}
            </Heading>
            <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam
              error velit voluptas?
            </Text>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
              <ConnectButton
                onClickFunc={
                  !address
                    ? connect
                    : () => {
                        setSelectedAccount(null);
                        disconnect();
                      }
                }
                title={!address ? 'Connect Wallet' : 'Disconnect Wallet'}
                isLoading={eoaLoading}
              />
              {address && (
                <Link to="/create-proposal">
                  <Button rounded={'full'}>Create Proposal</Button>
                </Link>
              )}
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={'Login Image'}
            objectFit={'cover'}
            src={'/heroImage.png'}
          />
        </Flex>
      </Stack>
      <div className="wrap-container">
        <h1 className="h1-tag">List of All Top Proposals</h1>
        {/* <button className='view-btn' onClick={getQueyData()}>View Proposals</button> */}
        {graphData
          ? graphData.map(proposal => (
              <Link to={`${parseInt(proposal.id, 16)}`}>
                <div className="proposal-box">
                  <p>Id - {parseInt(proposal.id, 16)}</p>
                  <p>Proposer Name - {proposal.proposer}</p>
                </div>
              </Link>
            ))
          : null}
      </div>
      <Testimonials />
      <ColorModeSwitcher
        justifySelf="flex-end"
        position="absolute"
        bottom="0"
        left="0"
      />
      <Wallet />
      {/* <SendNotificationButton signer={web3Provider}/> */}
    </Stack>
  );
};

export default Home;
