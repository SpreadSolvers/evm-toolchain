import { Chain, Hex } from "viem"
import { privateKeyToAddress } from "viem/accounts"
import { RpcUrl } from "./types"

export interface IChainClientConfigService {
	privateKey: Hex
	rpcSettings?: Record<number, { rpcUrls: RpcUrl[]; disableDefaultRpcUrl: boolean } | undefined>
	customChains?: Chain[]
}

export class ChainClientConfigService implements IChainClientConfigService {
	privateKey!: Hex
	rpcSettings?: Record<number, { rpcUrls: RpcUrl[]; disableDefaultRpcUrl: boolean } | undefined>
	customChains?: Chain[]

	constructor() {
		this.privateKey = this.getPrivateKey()
	}

	private getPrivateKey(): Hex {
		const privateKey = process.env[`PRIVATE_KEY`] as Hex

		if (!privateKey) {
			throw new Error(`Private key not found`)
		}

		//viem validate pk
		privateKeyToAddress(privateKey)

		return privateKey
	}
}
