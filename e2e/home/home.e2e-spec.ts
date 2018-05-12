import { Page } from './home.po';
import { browser, element, by } from 'protractor';

describe('Home', () => {
  let page: Page;

  beforeAll(() => {
    page = new Page();
    // page.navigateTo();
  });

  beforeEach(() => {

    browser.waitForAngular();

  });

  it('should display address saying address', async () => {

    const account = await page.getAccount();

    expect<any>(page.getAddressText()).toEqual(account);

    browser.sleep(2000);

  });

  it('should buy tokens and adds display in user info', async () => {

    const tokensToBuy = 1;

    const currentTokens = await page.getTokensText();

    const expected = parseInt(currentTokens, 10) + tokensToBuy;

    await page.getBuyTokensInput().sendKeys(tokensToBuy.toString());

    page.getBuyTokensButton().click();

    expect<any>(page.getTokensText()).toEqual(expected.toString());

    browser.sleep(2000);

  });

  xit('should account status for vote defaults to false', async () => {

    expect<any>(page.getVotedStatusText()).toBeFalsy();

  });

  xit('should vote to proposal in tokens to display voted status true', async () => {

    const tokens = await page.getTokensText();

    await page.setValueToVoteInput(tokens);

    await page.clickProposalButton();

    await page.clickVote();

    expect<any>(page.getVotedStatusText()).toBeTruthy();

    expect<any>(page.getTokensText()).toEqual('0');

    browser.sleep(2000);

  });

});
