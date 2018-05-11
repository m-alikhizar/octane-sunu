export class AccountItem {
  public address: string;

  constructor(address: string) {
    this.address = address;
  }
}

export class TokensInfo {

  public total: number;
  public available: number;
  public price: number;

  constructor(arr: Array<any>) {
    this.total = parseInt(arr[0], 10);
    this.available = parseInt(arr[1], 10);
    this.price = parseFloat(arr[2]);
  }
}

export class AccountInfo {

  public tokens: number;
  public proposal: string;
  public voted: boolean;
  public delegate: string;

  constructor(arr: Array<any>) {
    this.tokens = arr[0].toString();
    this.proposal = arr[1].toString();
    this.voted = arr[2];
    this.delegate = arr[3].toString();
  }
}
