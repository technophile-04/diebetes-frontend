import Transak from '@biconomy/transak';
import { Button } from '@chakra-ui/react';

// Takes in the User Address and User info from social login as input
export default function AddFunds(params) {
  function onClickHandler() {
    const transak = new Transak('STAGING', {
      walletAddress: params.userAddress || '',
      userData: {
        firstName: params.userInfo?.name || '',
        email: params.userInfo?.email || '',
      },
    });
    transak.init();
  }
  return <Button onClick={onClickHandler}>Add Funds</Button>;
}
