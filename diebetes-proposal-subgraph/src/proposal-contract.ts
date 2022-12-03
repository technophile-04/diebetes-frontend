import { BigInt } from '@graphprotocol/graph-ts';
import {
  Pay as PayEvent,
  ProposalCreated as ProposalCreatedEvent,
  ResearchFindingAdded as ResearchFindingAddedEvent,
  WithdrawContribution as WithdrawContributionEvent,
  WithdrawFunding as WithdrawFundingEvent,
} from '../generated/ProposalContract/ProposalContract';
import { Proposal, Contributor, Contribution } from '../generated/schema';

export function handlePay(event: PayEvent): void {
  let entity = Contribution.load( event.params.contributor.toHexString()+"-"+event.params.proposalId.toHexString());
  if (!entity) {
    entity = new Contribution(event.params.contributor.toHexString()+"-"+event.params.proposalId.toHexString())
  }
  entity.address = event.params.contributor.toHexString();
  entity.proposalId = event.params.proposalId;
  entity.amount = event.params.amount;
  entity.save();
}

export function handleProposalCreated(event: ProposalCreatedEvent): void {
  let entity = Proposal.load(event.params.proposalId.toHexString());
  if (!entity) {
    entity = new Proposal(event.params.proposalId.toHexString());
  }
  entity.proposer = event.params.proposer;
  entity.fundingTarget = event.params.fundingTarget;
  entity.researchPaperCID = event.params.researchPaperCID;
  entity.save();
}

export function handleResearchFindingAdded(
  event: ResearchFindingAddedEvent
): void {
  let entity = Proposal.load(event.params.proposalId.toHexString());
  if (!entity) {
    entity = new Proposal(event.params.proposalId.toHexString())
  }
  entity.researchFindingCID = event.params.researchFindingCID;
  entity.save();
}

export function handleWithdrawContribution(
  event: WithdrawContributionEvent
): void {
  let entity = Contribution.load( event.params.contributor.toHexString()+"-"+event.params.proposalId.toHexString());
  if (!entity) {
    entity = new Contribution(event.params.contributor.toHexString()+"-"+event.params.proposalId.toHexString())
  }
  entity.address = event.params.contributor.toHexString();
  entity.proposalId = event.params.proposalId;
  entity.amount =  entity.amount.minus(event.params.withdrawnAmount) ;
  entity.save();

  let contributor = Contributor.load(event.params.contributor.toHexString())
  if (!contributor) {
    contributor = new Contributor(event.params.contributor.toHexString())
  }
  contributor.save()
}

// export function handleWithdrawFunding(event: WithdrawFundingEvent): void {
//   let entity = new WithdrawFunding(
//     event.transaction.hash.toHex() + '-' + event.logIndex.toString()
//   );
//   entity.proposalId = event.params.proposalId;
//   entity.fundingAmount = event.params.fundingAmount;
//   entity.save();
// }
