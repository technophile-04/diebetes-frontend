import { Web3Storage } from "web3.storage"

export default async function ipfsfetch(cid) {
	const token = process.env.NEXT_PUBLIC_WEB3_STORAGE
	const web3Client = new Web3Storage({ token: token })
	const res = await web3Client.get("https://cloudflare-ipfs.com/ipfs/" + cid).catch((e) => {
		console.log(e)
	})
	if (!res.ok) {
		console.log("cant find the specified res")
	} else {
		console.log(res)
		const files = await res.files()
		return URL.createObjectURL(files[0])
	}
}