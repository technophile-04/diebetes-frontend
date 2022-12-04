import React, { useState } from 'react';
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  SimpleGrid,
  InputGroup,
  Textarea,
  FormHelperText,
} from '@chakra-ui/react';

import { useToast } from '@chakra-ui/react';
import diabeticABI from '../deployments/mumbai/DiebeticFunding.json';
import { useSmartAccountContext } from '../contexts/SmartAccountContext';
import { useWeb3AuthContext } from '../contexts/SocialLoginContext';
import testABI from '../deployments/mumbai/TestToken.json';
import { ethers } from 'ethers';

const Form1 = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal">
        Create Proposal
      </Heading>
      <SimpleGrid columns={1} spacing={6}>
        <FormControl as={GridItem} colSpan={[3, 2]}>
          <FormLabel
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: 'gray.50',
            }}
          >
            Title
          </FormLabel>
          <InputGroup size="sm">
            <Input
              type="tel"
              placeholder="www.example.com"
              focusBorderColor="brand.400"
              rounded="md"
            />
          </InputGroup>
        </FormControl>

        <FormControl id="email" mt={1}>
          <FormLabel
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: 'gray.50',
            }}
          >
            Description
          </FormLabel>
          <Textarea
            placeholder="you@example.com"
            rows={3}
            shadow="sm"
            focusBorderColor="brand.400"
            fontSize={{
              sm: 'sm',
            }}
          />
          <FormHelperText>Brief description for your proposal.</FormHelperText>
        </FormControl>
      </SimpleGrid>
    </>
  );
};

const Form2 = () => {
  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
        NFT Details
      </Heading>
      <FormControl as={GridItem} colSpan={6}>
        <FormLabel
          htmlFor="TItle"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}
          mt="2%"
        >
          Title
        </FormLabel>
        <Input
          type="text"
          name="TItle"
          id="TItle"
          autoComplete="street-address"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
        <FormLabel
          htmlFor="benefit1"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}
          mt="2%"
        >
          Benefit 1
        </FormLabel>
        <Input
          type="text"
          name="benefit1"
          id="benefit1"
          autoComplete="benefit1"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
        <FormLabel
          htmlFor="benefit2"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: 'gray.50',
          }}
          mt="2%"
        >
          Benefit 2
        </FormLabel>
        <Input
          type="text"
          name="benefit2"
          id="benefit2"
          autoComplete="benefit2"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
        />
      </FormControl>
    </>
  );
};

export default function CreateProposal() {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(50);
  const [proposalLoading, setProposalLoading] = useState(false);

  const { mainSmartAccount: smartAccount } = useSmartAccountContext();

  const createProposal = async () => {
    try {
      setProposalLoading(true);
      const erc20Interface = new ethers.utils.Interface(testABI.abi);
      const dappInterface = new ethers.utils.Interface(diabeticABI.abi);

      const txs = [];

      const dappContractAddress = diabeticABI.address;
      const tokenAddress = testABI.address;

      const data1 = erc20Interface.encodeFunctionData('approve', [
        dappContractAddress,
        ethers.utils.parseUnits('50', 'ether'),
      ]);

      const tx1 = {
        to: tokenAddress,
        data: data1,
      };

      txs.push(tx1);

      const data2 = dappInterface.encodeFunctionData('createFundingProposal', [
        ethers.utils.parseUnits('3', 'ether'),
        'bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi',
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
        '⚡️ ~ file: CreateProposal2.jsx:215 ~ createProposal ~ response',
        response
      );

      toast({
        title: 'Proposal created.',
        description: 'Your proposal has been created',
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
    <>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto"
        as="form"
      >
        <Progress
          hasStripe
          value={progress}
          mb="5%"
          mx="5%"
          isAnimated
        ></Progress>
        {step === 1 ? <Form1 /> : <Form2 />}
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1);
                  setProgress(progress - 50);
                }}
                isDisabled={step === 1}
                colorScheme="blue"
                variant="solid"
                w="7rem"
                mr="5%"
              >
                Back
              </Button>
              <Button
                w="7rem"
                isDisabled={step === 2}
                onClick={() => {
                  setStep(step + 1);
                  if (step === 2) {
                    setProgress(100);
                  } else {
                    setProgress(progress + 50);
                  }
                }}
                colorScheme="blue"
                variant="outline"
              >
                Next
              </Button>
            </Flex>
            {step === 2 ? (
              <Button
                w="7rem"
                colorScheme="blue"
                variant="solid"
                onClick={createProposal}
                disabled={proposalLoading}
                isLoading={proposalLoading}
              >
                Submit
              </Button>
            ) : null}
          </Flex>
        </ButtonGroup>
      </Box>
    </>
  );
}
