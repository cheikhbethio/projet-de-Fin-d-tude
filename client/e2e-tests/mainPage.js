describe('MyWordPress', function() {

  it('the site should have a title', function() {

    browser.get('http://localhost:4711/');

    expect(browser.getLocationAbsUrl()).toMatch("/");
    expect(browser.getTitle()).toEqual('MyWordPress');
    
  });

  it('should show connection and inscription links', function(){
  	
  });

});