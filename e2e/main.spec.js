'use strict';

describe('The main view', function () {
  var page;

  beforeEach(function () {
    browser.get('/index.html');
    page = require('./main.po');
  });

  it('should display expected elements', function() {
    expect(page.navbarBrand.getText().trim()).toBe('Flickr search');
    expect(page.inputSearch.getAttribute('placeholder')).toBe('Type in 3 or more letters to start a search');
  });

  it('should not return any search results when search term is less than 3 letters', function () {
    page.inputSearch.sendKeys('nb');
    expect(page.masonryBricks.isPresent()).to.become(false).and.notify(next);
  });

  it('should return search results when search term is more than 3 letters', function () {
    page.inputSearch.sendKeys('nba');
    expect(page.masonryBricks.isPresent()).to.become(true).and.notify(next);
  });

});
