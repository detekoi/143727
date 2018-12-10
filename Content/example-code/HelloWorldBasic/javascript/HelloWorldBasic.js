//version 1.0.2
// %%%% start all
var Eyes = require('eyes.selenium').Eyes;
var Webdriver = require('selenium-webdriver');

function main() {
    var eyes = new Eyes();                                                // Note 1
    var apiKey = process.env.MY_APPLITOOLS_API_KEY;                       
    eyes.setApiKey(apiKey);                                               // Note 2
    var innerDriver = new Webdriver.Builder()                             // Note 3
        .withCapabilities(Webdriver.Capabilities.chrome())
        .build();
    var viewportSize = {width: 1024, height: 768};
    eyes.open(innerDriver,                                                // Note 4  
            'My Application Name', 'My Test Name', viewportSize)
        .then(function (driver){ afterOpen(driver)});
}

function afterOpen(eyes, driver) {
    try {
        var  website = "https://applitools.com/helloworld";
        driver.get(website);                                              // Note 5 
        eyes.checkWindow('Before mouse click');                           // Note 6 
        eyes.close(false)                                                 // Note 7 
        .then(function(testResults) {
            //process results here
        })
    } finally {
      eyes.abortIfNotClosed(); //could add .then if necessary             // Note 8 
    }
    innerDriver.quit(); // Close the browser.                             // Note 9 
}
main();
// %%%% stop all