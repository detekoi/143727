// version 1.0.1

package com.applitools.ekb;

import com.applitools.eyes.RectangleSize;
// %%%% start set-matchlevel
import com.applitools.eyes.MatchLevel;
// ...
// %%%% stop set-matchlevel
import com.applitools.eyes.TestResults;
import com.applitools.eyes.selenium.Eyes;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import java.net.URI;
import java.net.URISyntaxException;

public  class HelloWorldEnvironment {

    public static void main(String[] args) {

        // Initialize the eyes SDK and set your private API key.

            URI serverURL = null;

        try {

            serverURL = new URI("https://eyesapi.applitools.com");

        } catch (URISyntaxException e) {
            System.out.println("URI Exception ");
            return;
        }

        // %%%% start set-baseline-env
        Eyes eyes = new Eyes();
        // %%%% stop set-baseline-env

        eyes.setServerUrl(serverURL);
        String apiKey = System.getenv("APPLITOOLS_API_KEY");
        eyes.setApiKey(apiKey);

        WebDriver innerDriver = new ChromeDriver();  // Open a Chrome browser.
        RectangleSize viewportSize = new RectangleSize(/*width*/ 1024, /*height*/ 768 );

        eyes.setHostOS("Windows 7");
        eyes.setHostApp("Firefox");
        // %%%% start set-matchlevel
        eyes.setMatchLevel(MatchLevel.LAYOUT);
        // %%%% stop set-matchlevel
        // %%%% start set-baseline-env
        eyes.setBaselineEnvName("desktop browser");
        //now call open...
        // %%%% stop set-baseline-env
       
        WebDriver driver = eyes.open(innerDriver, "cross environment", "test 1", viewportSize);
        
        try {
            // insert your checkpoints here....

            // Navigate the browser to the "hello world!" web-site.
            String website = "https://applitools.com/helloworld";
            driver.get(website);
            // Visual checkpoint #1

            eyes.checkWindow("Before mouse click");

            driver.findElement(By.tagName("button")).click(); // Click the "Click me!" button.
            // Visual checkpoint #2.
            eyes.checkWindow("After mouse click");

            // End the test

            Boolean throwtTestCompleteException = false;
            TestResults result = eyes.close(throwtTestCompleteException);

            String url = result.getUrl();
            if (result.isNew()) {
                System.out.println("New Baseline Created: URL=" + url);
            } else if (result.isPassed()) {
                System.out.println("All steps passed:     URL=" + url);
            } else {
                System.out.println("Test Failed:          URL=" + url);
            }


        } finally {
            eyes.abortIfNotClosed();
        }

        // Close the browser.

        if (innerDriver != null)
            innerDriver.quit();
    }
}
