import { WorldIDWidget } from '@worldcoin/id';

export default function WorldcoinIntegrationButton(params) {


  return (
    <div id="world-id-container">
      <WorldIDWidget
        actionId="wid_staging_3ea46bc33dcc3dd4bac2a6d191b37eed" // obtain this from developer.worldcoin.org
        signal="PROPOSAL_ID"
        enableTelemetry
        onSuccess={verificationResponse => params.setWorldcoinverification(verificationResponse)} // you'll actually want to pass the proof to the API or your smart contract
        onError={error => console.error(error)}
      />
    </div>
  );
}
