// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Proposal extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Proposal entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Proposal must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Proposal", id.toString(), this);
    }
  }

  static load(id: string): Proposal | null {
    return changetype<Proposal | null>(store.get("Proposal", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get proposer(): Bytes {
    let value = this.get("proposer");
    return value!.toBytes();
  }

  set proposer(value: Bytes) {
    this.set("proposer", Value.fromBytes(value));
  }

  get fundingTarget(): BigInt {
    let value = this.get("fundingTarget");
    return value!.toBigInt();
  }

  set fundingTarget(value: BigInt) {
    this.set("fundingTarget", Value.fromBigInt(value));
  }

  get researchPaperCID(): string {
    let value = this.get("researchPaperCID");
    return value!.toString();
  }

  set researchPaperCID(value: string) {
    this.set("researchPaperCID", Value.fromString(value));
  }

  get researchFindingCID(): string | null {
    let value = this.get("researchFindingCID");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set researchFindingCID(value: string | null) {
    if (!value) {
      this.unset("researchFindingCID");
    } else {
      this.set("researchFindingCID", Value.fromString(<string>value));
    }
  }

  get currentFunding(): BigInt {
    let value = this.get("currentFunding");
    return value!.toBigInt();
  }

  set currentFunding(value: BigInt) {
    this.set("currentFunding", Value.fromBigInt(value));
  }
}

export class Contribution extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Contribution entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Contribution must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Contribution", id.toString(), this);
    }
  }

  static load(id: string): Contribution | null {
    return changetype<Contribution | null>(store.get("Contribution", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get proposalId(): BigInt {
    let value = this.get("proposalId");
    return value!.toBigInt();
  }

  set proposalId(value: BigInt) {
    this.set("proposalId", Value.fromBigInt(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get address(): string {
    let value = this.get("address");
    return value!.toString();
  }

  set address(value: string) {
    this.set("address", Value.fromString(value));
  }
}

export class Contributor extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Contributor entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Contributor must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Contributor", id.toString(), this);
    }
  }

  static load(id: string): Contributor | null {
    return changetype<Contributor | null>(store.get("Contributor", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get contributions(): Array<string> {
    let value = this.get("contributions");
    return value!.toStringArray();
  }

  set contributions(value: Array<string>) {
    this.set("contributions", Value.fromStringArray(value));
  }
}
