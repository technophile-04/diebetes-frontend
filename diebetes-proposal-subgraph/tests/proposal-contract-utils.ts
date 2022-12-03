import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Pay,
  ProposalCreated,
  ResearchFindingAdded,
  WithdrawContribution,
  WithdrawFunding
} from "../generated/ProposalContract/ProposalContract"

export function createPayEvent(
  contributor: Address,
  proposalId: BigInt,
  amount: BigInt
): Pay {
  let payEvent = changetype<Pay>(newMockEvent())

  payEvent.parameters = new Array()

  payEvent.parameters.push(
    new ethereum.EventParam(
      "contributor",
      ethereum.Value.fromAddress(contributor)
    )
  )
  payEvent.parameters.push(
    new ethereum.EventParam(
      "proposalId",
      ethereum.Value.fromUnsignedBigInt(proposalId)
    )
  )
  payEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return payEvent
}

export function createProposalCreatedEvent(
  proposalId: BigInt,
  proposer: Address,
  fundingTarget: BigInt,
  researchPaperCID: string
): ProposalCreated {
  let proposalCreatedEvent = changetype<ProposalCreated>(newMockEvent())

  proposalCreatedEvent.parameters = new Array()

  proposalCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "proposalId",
      ethereum.Value.fromUnsignedBigInt(proposalId)
    )
  )
  proposalCreatedEvent.parameters.push(
    new ethereum.EventParam("proposer", ethereum.Value.fromAddress(proposer))
  )
  proposalCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "fundingTarget",
      ethereum.Value.fromUnsignedBigInt(fundingTarget)
    )
  )
  proposalCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "researchPaperCID",
      ethereum.Value.fromString(researchPaperCID)
    )
  )

  return proposalCreatedEvent
}

export function createResearchFindingAddedEvent(
  proposalId: BigInt,
  researchFindingCID: string
): ResearchFindingAdded {
  let researchFindingAddedEvent = changetype<ResearchFindingAdded>(
    newMockEvent()
  )

  researchFindingAddedEvent.parameters = new Array()

  researchFindingAddedEvent.parameters.push(
    new ethereum.EventParam(
      "proposalId",
      ethereum.Value.fromUnsignedBigInt(proposalId)
    )
  )
  researchFindingAddedEvent.parameters.push(
    new ethereum.EventParam(
      "researchFindingCID",
      ethereum.Value.fromString(researchFindingCID)
    )
  )

  return researchFindingAddedEvent
}

export function createWithdrawContributionEvent(
  contributor: Address,
  proposalId: BigInt,
  withdrawnAmount: BigInt
): WithdrawContribution {
  let withdrawContributionEvent = changetype<WithdrawContribution>(
    newMockEvent()
  )

  withdrawContributionEvent.parameters = new Array()

  withdrawContributionEvent.parameters.push(
    new ethereum.EventParam(
      "contributor",
      ethereum.Value.fromAddress(contributor)
    )
  )
  withdrawContributionEvent.parameters.push(
    new ethereum.EventParam(
      "proposalId",
      ethereum.Value.fromUnsignedBigInt(proposalId)
    )
  )
  withdrawContributionEvent.parameters.push(
    new ethereum.EventParam(
      "withdrawnAmount",
      ethereum.Value.fromUnsignedBigInt(withdrawnAmount)
    )
  )

  return withdrawContributionEvent
}

export function createWithdrawFundingEvent(
  proposalId: BigInt,
  fundingAmount: BigInt
): WithdrawFunding {
  let withdrawFundingEvent = changetype<WithdrawFunding>(newMockEvent())

  withdrawFundingEvent.parameters = new Array()

  withdrawFundingEvent.parameters.push(
    new ethereum.EventParam(
      "proposalId",
      ethereum.Value.fromUnsignedBigInt(proposalId)
    )
  )
  withdrawFundingEvent.parameters.push(
    new ethereum.EventParam(
      "fundingAmount",
      ethereum.Value.fromUnsignedBigInt(fundingAmount)
    )
  )

  return withdrawFundingEvent
}
