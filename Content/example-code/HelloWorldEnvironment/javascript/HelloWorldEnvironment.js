//version 1.0.2

    var Eyes = require('eyes.selenium').Eyes;
    var webdriver = require('selenium-webdriver');
// %%%% start set-matchlevel
    var MatchLevel = require('eyes.selenium').MatchLevel;
    //....
// %%%% stop set-matchlevel
    var innerDriver;
    var eyes;

function main() {

// Initialize the eyes SDK and set your private API key.

    var serverURL = "https://eyesapi.applitools.com";
   
   // %%%% start set-baseline-env
    eyes = new Eyes(serverURL); 
    // %%%% stop set-baseline-env
    
    var apiKey = process.env.APPLITOOLS_API_KEY;
    eyes.setApiKey(apiKey);


    // Open a Chrome browser.
    innerDriver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .build();

    // Start the test and set the browser's viewport size to 1024 x 768.

    var viewportSize = {width: 1024, height: 768};

    // %%%% start set-matchlevel  
    eyes.setMatchLevel(MatchLevel.Layout);
    // %%%% stop set-matchlevel

    // %%%% start set-baseline-env
    eyes.setBaselineEnvName("desktop browser");
    //now call open....
    // %%%% stop set-baseline-env
    eyes.setHostingApp("Firefox");
    eyes.setHostOS("Windows 7");
    eyes.open(innerDriver, 'cross environment', 'test 1', viewportSize)
        .then(function (driver){ afterOpen(driver)});
   
}

function afterOpen(driver) {
    try {
        // insert your checkpoints here....

        // Navigate the browser to the "hello world!" web-site.
        var  website = "https://applitools.com/helloworld";
        driver.get(website);

        eyes.checkWindow('Before mouse click');  // Visual checkpoint #1.

        // Click the "Click me!" button.
        driver.findElement(webdriver.By.tagName('button')).click();


        eyes.checkWindow('After mouse click'); // Visual checkpoint #2.


        // End the test.

        var throwtTestCompleteException = false;
        eyes.close(throwtTestCompleteException)
        .then(function(result) {

            var url = result.appUrls.session;
            if (result.isNew) {
                console.log("New Baseline Created: URL=" + url);
            } else if (result.isPassed) {
                console.log("All steps passed:     URL=" + url);
            } else {
                console.log("Test Failed:          URL=" + url);
                }            
        });


    } finally {
      // If the test was aborted before eyes.close was called ends the test as aborted.
      eyes.abortIfNotClosed(); //could add .then if necessary
    }

    if (innerDriver) {
        innerDriver.quit(); // Close the browser.
    } 
}

main();
