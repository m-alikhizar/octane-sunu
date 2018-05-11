import { browser, element, by } from 'protractor';

export class Page {
  // navigateTo() {
  //   return browser.get('/home/0x053054e2dccd74ab63c4f2ff50d84d5de1b6952c');
  // }

  async getAccount() {
    const url = await browser.driver.getCurrentUrl();
    return url.split('/').pop();
  }

  getAddressText() {
    return element(by.css('.address')).getText();
  }

  getBuyTokensInput() {

    return element(by.css('app-buy-tokens input'))

  }

  getBuyTokensButton() {
    return element(by.css('app-buy-tokens .button'));
  }

  getTokensText() {
    return element(by.css('app-account-info .tokens')).getText();
  }

  getVotedStatusText() {
    return element(by.css('app-account-info .voted')).getText().then(text => JSON.parse(text));
  }

  setValueToVoteInput(input) {
    return element(by.css('app-vote input')).sendKeys(input);
  }

  clickProposalButton() {
    return element.all(by.css('app-vote .proposal')).first().click();
  }

  clickVote() {
    return element(by.css('app-vote .button.cast')).click();
  }

}
