import React, { useEffect } from 'react';
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
    balance: allTokensBalance,
  } = useSmartAccountContext();

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
      <Testimonials />
      <ColorModeSwitcher
        justifySelf="flex-end"
        position="absolute"
        bottom="0"
        left="0"
      />
      <Wallet />
    </Stack>
  );
};

export default Home;
