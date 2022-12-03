import { Text } from '@chakra-ui/react';
import React from 'react';
import WorldcoinIntegrationButton from '../components/WorldcoinIntegrationButton';

const Proposal = () => {
  return (
    <div>
      <Text fontSize="4xl" textAlign="center" fontWeight="bold">
        This is proposals page
      </Text>
      <WorldcoinIntegrationButton/>
    </div>
  );
};

export default Proposal;
