import { browser, element, by } from 'protractor';

export class Page {
  navigateTo() {
    return browser.get('/');
  }

  getHeaderText() {
    return element(by.css('.hero .title')).getText();
  }

  getStatusClasses() {
    return element(by.css('.hero .title')).getAttribute('class').then(classes => classes.split(' '));
  }

  getFirstAccountText() {
    return element.all(by.css('table td.address')).first().getText();
  }

  clickOnAccount() {
    element.all(by.css('.button')).first().click();
  }

}
