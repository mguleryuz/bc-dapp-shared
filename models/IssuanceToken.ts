import { Schema, model, models } from 'mongoose'
import {
  EIssuanceTokenStatus,
  type IssuanceToken,
  type IssuanceTokenTimeDataBase,
} from '../types'

const TimeDataSchema = new Schema<IssuanceTokenTimeDataBase>(
  {
    oneHour: {
      type: String,
    },
    fourHour: {
      type: String,
    },
    twentyFourHour: {
      type: String,
    },
  },
  {
    _id: false,
  }
)

const IssuanceTokenSchema = new Schema<IssuanceToken>(
  {
    // Chain Identifiers
    chainId: {
      type: Number,
      required: true,
    },
    creatorAddress: {
      type: String,
      required: true,
    },
    orchestratorAddress: {
      type: String,
      required: true,
      unique: true,
    },

    // Issuance Token Identifiers
    imageId: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },
    symbol: {
      type: String,
      required: true,
    },
    decimals: {
      type: Number,
      required: true,
    },

    address: {
      type: String,
      unique: true,
      sparse: true,
    },
    fundingManagerAddress: {
      type: String,
      unique: true,
      sparse: true,
    },

    // Collateral Token Identifiers
    collateralTokenName: {
      type: String,
      required: true,
    },
    collateralTokenSymbol: {
      type: String,
      required: true,
    },
    collateralTokenDecimals: {
      type: Number,
      required: true,
    },
    collateralTokenAddress: {
      type: String,
      required: true,
    },
    collateralTokenLogoUrl: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: EIssuanceTokenStatus,
      default: EIssuanceTokenStatus.STALE,
    },

    latestTransactionId: {
      type: String,
    },

    totalSupply: {
      type: String,
    },

    marketCap: {
      usd: {
        type: String,
      },
      collateral: {
        type: String,
      },
      _id: false,
    },

    price: {
      usd: {
        type: String,
      },
      collateral: {
        type: String,
      },
      _id: false,
    },

    priceChange: {
      type: TimeDataSchema,
    },

    volume: {
      type: {
        collateral: {
          type: TimeDataSchema,
        },
        usd: {
          type: TimeDataSchema,
        },
      },
      _id: false,
    },
  } satisfies Record<keyof IssuanceToken, any>,
  { timestamps: true }
)
const setModel = () => model('issuanceTokens', IssuanceTokenSchema)

if (!models.issuanceTokens) setModel()

const issuanceTokens = models.issuanceTokens as ReturnType<typeof setModel>

export default issuanceTokens
