import React, { useState } from 'react';
import WorldcoinIntegrationButton from '../components/WorldcoinIntegrationButton';
import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
  Input,
  useToast,
} from '@chakra-ui/react';
import ProposalImage from '../img/proposal1.jpg';
import { Chat } from '@pushprotocol/uiweb';
import diabeticABI from '../deployments/mumbai/DiebeticFunding.json';
import testABI from '../deployments/mumbai/TestToken.json';
import { useSmartAccountContext } from '../contexts/SmartAccountContext';
import { ethers } from 'ethers';

const Proposal2 = () => {
  const [fundAmount, setfundAmount] = useState('');
  const toast = useToast();

  const [proposalLoading, setProposalLoading] = useState(false);

  const { mainSmartAccount: smartAccount } = useSmartAccountContext();

  const fundProposal = async () => {
    try {
      setProposalLoading(true);
      const erc20Interface = new ethers.utils.Interface(testABI.abi);
      const dappInterface = new ethers.utils.Interface(diabeticABI.abi);

      const txs = [];

      const dappContractAddress = diabeticABI.address;
      const tokenAddress = testABI.address;

      const data1 = erc20Interface.encodeFunctionData('approve', [
        dappContractAddress,
        ethers.utils.parseUnits(fundAmount, 'ether'),
      ]);

      const tx1 = {
        to: tokenAddress,
        data: data1,
      };

      txs.push(tx1);
      const data2 = dappInterface.encodeFunctionData('pay', [
        '0x7f630d00933c5646eabe4CA991Efb12F3BC527d8',
        '2',
        ethers.utils.parseUnits(fundAmount, 'ether'),
      ]);

      const tx2 = {
        to: dappContractAddress,
        data: data2,
      };

      txs.push(tx2);

      const response = await smartAccount.sendGaslessTransactionBatch({
        transactions: txs,
      });
      console.log(
        '⚡️ ~ file: Proposal2.jsx:69 ~ fundProposal ~ response',
        response
      );

      toast({
        title: 'Proposal Funded!.',
        description: 'proposal has been Funded',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });

      setProposalLoading(false);

      console.log(response);
    } catch (error) {
      setProposalLoading(false);
      toast({
        title: 'Oops an error occured.',
        description: 'we ran into an error :(',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      console.log(error);
    }
  };

  return (
    <div>
      <Container maxW={'7xl'}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}
        >
          <Flex>
            <Image
              rounded={'md'}
              alt={'product image'}
              src={ProposalImage}
              fit={'cover'}
              align={'center'}
              w={'100%'}
              h={{ base: '100%', sm: '400px', lg: '500px' }}
            />
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={'header'}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
              >
                Making Life Better
              </Heading>
              <Text
                color={useColorModeValue('gray.900', 'gray.400')}
                fontWeight={300}
                fontSize={'2xl'}
              >
                Target Fund: 5 USDC
              </Text>
            </Box>

            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={'column'}
              divider={
                <StackDivider
                  borderColor={useColorModeValue('gray.200', 'gray.600')}
                />
              }
            >
              <VStack spacing={{ base: 4, sm: 6 }}>
                <Text fontSize={'lg'}>Proposal Description</Text>
              </VStack>
              <Box>
                <Text
                  fontSize={{ base: '16px', lg: '18px' }}
                  color={useColorModeValue('yellow.500', 'yellow.300')}
                  fontWeight={'500'}
                  textTransform={'uppercase'}
                  mb={'4'}
                >
                  Benefites
                </Text>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                  <List spacing={2}>
                    <ListItem>Chronograph</ListItem>
                    <ListItem>Master Chronometer Certified</ListItem>{' '}
                  </List>
                </SimpleGrid>
              </Box>
            </Stack>
            <Input
              type="text"
              placeholder="10 ETH"
              focusBorderColor="brand.400"
              rounded="md"
              value={fundAmount}
              onChange={event => setfundAmount(event.target.value)}
            />
            <Button
              rounded={'none'}
              w={'full'}
              mt={8}
              size={'lg'}
              py={'7'}
              isLoading={proposalLoading}
              disabled={proposalLoading}
              bg={useColorModeValue('gray.900', 'gray.50')}
              color={useColorModeValue('white', 'gray.900')}
              textTransform={'uppercase'}
              _hover={{
                transform: 'translateY(2px)',
                boxShadow: 'lg',
              }}
              onClick={fundProposal}
            >
              Fund
            </Button>
          </Stack>
        </SimpleGrid>
      </Container>
      <Chat
        account="0x6430C47973FA053fc8F055e7935EC6C2271D5174" //user address
        supportAddress="0xd9c1CCAcD4B8a745e191b62BA3fcaD87229CB26d" //support address
        apiKey="jVPMCRom1B.iDRMswdehJG7NpHDiECIHwYMMv6k2KzkPJscFIDyW8TtSnk4blYnGa8DIkfuacU0"
        env="staging"
      />
      <WorldcoinIntegrationButton />
    </div>
  );
};

export default Proposal2;
