import { Pipe, PipeTransform } from '@angular/core';
import { Web3Service } from '../services/services';

@Pipe({name: 'toUTF8'})

class ToUTF8 implements PipeTransform {

  constructor(private web3Service: Web3Service) { }

  transform(value: string): string {

    if (value) {
      const web3 = this.web3Service.web3;

      return web3.toUtf8(value);
    }

    return value;
  }
}


@Pipe({name: 'fromWei'})

class FromWei implements PipeTransform {

  constructor(private web3Service: Web3Service) { }

  transform(value: string): string {

    if (value) {
      const web3 = this.web3Service.web3;

      return web3.fromWei(value);
    }

    return value;
  }
}

const Pipes = [
    ToUTF8,
    FromWei
];

export default Pipes;
