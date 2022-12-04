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
import storage from '../IPFS/storage';
import { useSmartAccountContext } from '../contexts/SmartAccountContext';
import { ethers } from 'ethers';
import diabeticABI from '../deployments/mumbai/DiebeticFunding.json';
import testABI from '../deployments/mumbai/TestToken.json';

const Form1 = params => {
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
              value={params.title}
              onChange={event => params.setTitle(event.target.value)}
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
            value={params.desc}
            onChange={event => params.setDesc(event.target.value)}
          />
          <FormHelperText>Brief description for your proposal.</FormHelperText>
        </FormControl>
        <FormControl as={GridItem} colSpan={[3, 2]}>
          <FormLabel
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: 'gray.50',
            }}
          >
            Target Funding
          </FormLabel>
          <InputGroup size="sm">
            <Input
              type="text"
              placeholder="10 ETH"
              focusBorderColor="brand.400"
              rounded="md"
              value={params.target}
              onChange={event => params.setTarget(event.target.value)}
            />
          </InputGroup>
        </FormControl>
      </SimpleGrid>
    </>
  );
};

const Form2 = params => {
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
          value={params.title2}
          onChange={event => {
            params.setTitle2(event.target.value);
          }}
          // onChange={}
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
          value={params.benefit}
          onChange={event => {
            params.setBenefit(event.target.value);
          }}
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
          value={params.benefit2}
          onChange={event => {
            params.setBenefit2(event.target.value);
          }}
        />
      </FormControl>
    </>
  );
};

export default function CreateProposal() {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(50);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [title2, setTitle2] = useState('');
  const [benefit, setBenefit] = useState('');
  const [benefit2, setBenefit2] = useState('');
  const [target, setTarget] = useState('');
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [cid, setCid] = useState('');
  const [proposalLoading, setProposalLoading] = useState(false);

  const { mainSmartAccount: smartAccount } = useSmartAccountContext();

  const createProposal = async () => {
    try {
      setProposalLoading(true);
      // const erc20Interface = new ethers.utils.Interface(testABI.abi);
      const dappInterface = new ethers.utils.Interface(diabeticABI.abi);

      const txs = [];

      const dappContractAddress = diabeticABI.address;

      const data1 = dappInterface.encodeFunctionData('createFundingProposal', [
        ethers.utils.parseUnits(target, 'ether'),
        cid,
      ]);

      const tx1 = {
        to: dappContractAddress,
        data: data1,
      };

      txs.push(tx1);

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

  async function onUploadClick() {
    const cid = await storage(selectedImageFile, 'research.pdf');
    console.log(cid);
    const metadata = {
      proposalTitle: title,
      description: desc,
      NftTitle: title2,
      benefit: benefit,
      benefit2: benefit2,
      cid: cid,
    };
    console.log(metadata);
    setCid(cid);
  }

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
        {step === 1 ? (
          <Form1
            title={title}
            setTitle={setTitle}
            desc={desc}
            setDesc={setDesc}
            target={target}
            setTarget={setTarget}
          />
        ) : (
          <Form2
            title2={title2}
            setTitle2={setTitle2}
            benefit={benefit}
            benefit2={benefit2}
            setBenefit={setBenefit}
            setBenefit2={setBenefit2}
          />
        )}
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Button
              w="7rem"
              isDisabled={step === 2}
              onClick={() => {
                document.querySelector('.input_pdf').click();
              }}
              colorScheme="blue"
              variant="outline"
            >
              Upload
            </Button>
            <input
              className="input_pdf"
              accept="application/pdf"
              type="file"
              hidden
              onChange={e => {
                setSelectedImageFile(e.target.files[0]);
              }}
            />
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
                onClick={() => {
                  onUploadClick();
                  toast({
                    title: 'Account created.',
                    description: "We've created your account for you.",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  });
                }}
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
