import { Button } from '@chakra-ui/react';
import React from 'react';
// import { CircularProgress } from "@material-ui/core";

type ButtonProp = {
  title: string;
  isLoading?: boolean;
  onClickFunc: any;
  children?: any;
  style?: any;
};

const ConnectButton: React.FC<ButtonProp> = ({
  title,
  onClickFunc,
  isLoading = false,
  children,
  style,
}) => {
  return (
    <Button
      onClick={onClickFunc}
      // className={}
      disabled={isLoading}
      style={style}
      rounded={'full'}
      bg={'blue.400'}
      color={'white'}
      _hover={{
        bg: 'blue.500',
      }}
    >
      {isLoading ? <>{' Loading'}</> : title}
      {children}
    </Button>
  );
};

export default ConnectButton;
