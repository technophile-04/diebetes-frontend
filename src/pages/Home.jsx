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
import SendNotificationButton from '../components/SendNotificationButton';
import SmartAccount from '@biconomy/smart-account';
import { ChainId } from '@biconomy/core-types';
import graphQuery from '../utils/graphQuery';

const Home = () => {
  const {
    address,
    loading: eoaLoading,
    userInfo,
    connect,
    disconnect,
    getUserInfo, web3Provider
  } = useWeb3AuthContext();
  const {
    selectedAccount,
    loading: scwLoading,
    setSelectedAccount,
    // wallet
  } = useSmartAccountContext();

  // const [signer, setSigner] = useState(wallet.getsigner())
  const queryData = graphQuery()
  console.log(queryData);
  console.log('address', address);

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
              />
              <Button rounded={'full'}>How It Works</Button>
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
      <Testimonials />
      <ColorModeSwitcher
        justifySelf="flex-end"
        position="absolute"
        bottom="0"
        left="0"
      />
      {/* <SendNotificationButton signer={web3Provider}/> */}
    </Stack>
  );
};

export default Home;
