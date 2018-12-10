// version 1.0.2

package com.applitools.ekb;
// %%%% start all
import com.applitools.eyes.RectangleSize;
import com.applitools.eyes.TestResults;
import com.applitools.eyes.selenium.Eyes;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public  class HelloWorldBasic {
    public static void main(String[] args) {
        Eyes eyes = new Eyes();                                         // Note 1
        String apiKey = System.getenv("MY_APPLITOOLS_API_KEY");
        eyes.setApiKey(apiKey);                                         // Note 2

        WebDriver innerDriver = new ChromeDriver();                     // Note 3
        RectangleSize viewportSize = new RectangleSize(/*width*/ 1024, /*height*/ 768 );
        WebDriver driver = eyes.open(innerDriver, 
            "Hello World App", "Hello World Test", viewportSize);       // Note 4
        try {
            String website = "https://applitools.com/helloworld";
            driver.get(website);                                        // Note 5
            eyes.checkWindow("initial screen");                         // Note 6
            TestResults result = eyes.close(false);                     // Note 7
        } finally {
            eyes.abortIfNotClosed();                                    // Note 8
        }
        innerDriver.quit();                                             // Note 9
    }
}
// %%%% stop all