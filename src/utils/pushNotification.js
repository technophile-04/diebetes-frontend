import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";
export default async function pushNotification(signer) {
    try {
        const apiResponse = await PushAPI.payloads.sendNotification({
            signer,
            type: 1, // broadcast
            identityType: 2, // direct payload
            notification: {
              title: `[SDK-TEST] notification TITLE:`,
              body: `[sdk-test] notification BODY`
            },
            payload: {
              title: `[sdk-test] payload title`,
              body: `sample msg body`,
              cta: '',
              img: ''
            },
            channel: 'eip155:5:0xB721347D2938a5594a12DF5Cc36D598b839Cb98f', // your channel address
            env: 'staging'
          });
        // apiResponse?.status === 204, if sent successfully!
        console.log('API repsonse: ', apiResponse);
      } catch (err) {
        console.error('Error: ', err);
      }
}