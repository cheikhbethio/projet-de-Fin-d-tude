// Finir connection
// Creation article 
// Creation page


describe('The Connection page', function() {

    beforeEach(function(){

        browser.driver.manage().window().maximize();
        browser.get('http://localhost:4711/#/connection');
        expect(browser.getLocationAbsUrl()).toMatch("/connection");

        /*element(by.id('connection_link')).click();
        expect(browser.getLocationAbsUrl()).toMatch("/connection");*/

    });

     it('should show registration options', function(){
        //var button_creation_submit = element(by.id('button_creation_submit'));
        expect(element(by.id('account_creation_link')).isDisplayed()).toBeTruthy();
        expect(element(by.id('header_registration_link')).isDisplayed()).toBeTruthy();
    });


    it('should show the connection input fields', function(){

        var login_input = by.model('userCredentials.login');
        var password_input = by.model('userCredentials.password');

        expect(element(login_input).isDisplayed()).toBeTruthy();
        expect(element(password_input).isDisplayed()).toBeTruthy();
    });


    it('should be able to connect as admin', function() {

        var login_input = by.model('userCredentials.login');
        var password_input = by.model('userCredentials.password');

        element(login_input).sendKeys('admin');
        element(password_input).sendKeys('admin');

        element(by.id('connection_button')).click();

        expect(browser.getCurrentUrl()).toEqual("http://localhost:4711/#/page/home?connectionSuccess=true");

    });

});
