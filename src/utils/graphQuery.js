import { createClient } from 'urql';

export default async function graphQuery() {
  const apiUrl =
    'https://api.thegraph.com/subgraphs/name/nightfallsh4/diebetes-proposal';
  let querySchema = `
        query{
            proposals(first: 5) {
              id
              proposer
              fundingTarget
              researchPaperCID
            }
          }
    `;
  const client = createClient({
    url: apiUrl,
  });

  const data1 = await client
    .query(querySchema)
    .toPromise()
    .then(result => result);
    console.log(data1.data);
  return data1.data;
}
