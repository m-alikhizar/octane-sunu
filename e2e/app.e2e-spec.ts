import { Page } from './app.po';
import { browser, element, by } from 'protractor';

describe('App', () => {
  let page: Page;

  beforeEach(() => {
    page = new Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();

    const expected = 'Octane Sunu';

    expect<any>(page.getHeaderText()).toEqual(expected);

    browser.sleep(1000);

  });

  it('should load Application Binary Interface for voting contract', () => {

    const expected = 'connected';

    expect<any>(page.getStatusClasses()).toContain(expected);

    browser.sleep(1000);

  });

  it('should login in with the account', () => {

    const account = page.getFirstAccountText();

    page.clickOnAccount();

    // browser.sleep(2500);

    expect<any>(browser.driver.getCurrentUrl()).toContain(account);

    browser.sleep(1000);

  });
});
