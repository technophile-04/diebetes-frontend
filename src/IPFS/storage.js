import { Web3Storage } from "web3.storage";

const metadataJson = {
    name: "First Proposal",
    description: "Build for wellness",
    ipfs: "bafybeihjjkwdrxxjnuwevlqtqmh3iegcadc32sio4wmo7bv2gbf34qs34a"
}

const metadataBlob = new Blob([JSON.stringify(metadataJson)])

async function uploadToIpfs(metadataBlob, fileName) {
    // setLoading(true)
    const token = process.env.Web3STORAGE_KEY
    const web3Client = new Web3Storage({ token: token })

    console.log("Getting Encrypted FIle and key...")
    // const { zipBlob, encryptedSymmetricKey, accessControlConditions } =
    // await encrypt()
    console.log("Done getting Encrypted FIle and key")

    console.log("Putting files on ipfs.....")
    const cid = await web3Client.put([new File([metadataBlob], fileName)])

    console.log("Uploaded to IPFS successfully. CID is :- ")
    console.log(cid)
    // setLoading(false)
    return cid
}

const storage = (fileName) => {
    // getFiles()
    uploadToIpfs(metadataBlob, fileName)
}

export default storage