'use server'

import {
  Inverter,
  PopPublicClient,
  RequestedModules,
} from '@inverter-network/sdk'
import { Hex, createPublicClient, http } from 'viem'
import { CacheContainer } from 'node-ts-cache'
import { MemoryStorage } from 'node-ts-cache-storage-memory'
import * as chains from 'viem/chains'

const requestedModules = {
  fundingManager: 'FM_BC_Bancor_Redeeming_VirtualSupply_v1',
  authorizer: 'AUT_Roles_v1',
  paymentProcessor: 'PP_Simple_v1',
} satisfies RequestedModules

const cachedData = new CacheContainer(new MemoryStorage())

export const getChainPublicClient = async (chainId: number) => {
  const key = `${chainId}-publicClients`

  let publicClient = await cachedData.getItem<PopPublicClient>(key)

  if (!publicClient) {
    const chain = Object.values(chains).find((c) => c.id === chainId)

    publicClient = createPublicClient({
      chain,
      transport: http(),
    }) as PopPublicClient

    cachedData.setItem(key, publicClient, {
      ttl: 60 * 60 * 12,
    })
  }

  return publicClient!
}

export const getInverter = async (chainId: number) => {
  const key = `${chainId}-inverter`

  // Try to get the Inverter instance from the cache first
  let inverter = await cachedData.getItem<Inverter>(key)

  if (!inverter) {
    // If not found in cache, get the public client and create a new Inverter instance
    const publicClient = await getChainPublicClient(chainId)

    inverter = new Inverter(publicClient)

    // Cache the new Inverter instance
    await cachedData.setItem(key, inverter, {
      ttl: 60 * 60 * 12, // Adjust TTL as needed
    })
  }

  return inverter
}

export const getWorkflow = async (
  chainId: number,
  orchestratorAddress: string
) => {
  const inverter = await getInverter(chainId)

  return await inverter.getWorkflow(
    orchestratorAddress as Hex,
    requestedModules
  )
}
