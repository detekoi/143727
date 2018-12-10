package com.applitools.ekb;

import com.applitools.eyes.MatchLevel;
import com.applitools.eyes.RectangleSize;
import com.applitools.eyes.Region;
import com.applitools.eyes.fluent.CheckSettings;
import com.applitools.eyes.selenium.Eyes;
import com.applitools.eyes.selenium.fluent.SeleniumCheckSettings;
import com.applitools.eyes.selenium.fluent.Target;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.List;
/*
    These examples are used to give examples of the Fluent syntax, they are not designed to run against an actual test.
*/

public class fluentsnippets {
    public static void main(String[] args) {

        Eyes eyes = new Eyes();
        WebDriver innerDriver = new ChromeDriver();
        RectangleSize viewportSize = new RectangleSize(/*width*/ 1024, /*height*/ 800);
        String appname = "EKB examples";
        String testname = "snippets v1";

        WebDriver driver = eyes.open(innerDriver, appname, testname, viewportSize);
        try {
            Region R1 = new Region(10,15,20,10);
            Region R2 = new Region(40,20,30,15);
            Region F3 = new Region(80,25,40,20);
            Region F4 = new Region(130,30,50,25);
            Region F5 = new Region(190,35,60,30);
            int up=10, left=30,down=20,right=40;
//%%%% start ex1
            eyes.check("Example 1a",                          // the name of the checkpoint (and step)
                Target.window()                          // check the entire window
                    .fully()                             // use scrolling and stitching
                    .strict()                            // use a STRICT match level
                    .ignore(R1,R2)                       // ignore the regions defined by R1 and R2
                    .floating(F3, up, down, left,right)  // handle the region F4 as a floating region
                    .floating(F4, up, down, left,right)  // handle the region F4 as a floating region
            );
//%%%% stop ex1

//%%%% start ex2
            SeleniumCheckSettings t = Target.window();
            t.fully();
            t.strict();
            t.ignore(R1,R2);
            t.floating(F3, up, down, left,right);
            t.floating(F4, up, down, left,right);
            eyes.check("Example 1b", t);
//%%%% stop ex2

//%%%% start ex3
            eyes.check(
                Target                                  // 1st target
                    .region(By.id("mixed-area")) 
                    .layout()                     
                    .withName("Example 2a")                 
                Target                                  // 2nd  target
                    .region(By.cssSelector("body table"))   
                    .strict()
                    .withName("Example 2b")                                             
            );
//%%%% stop ex3

//%%%% start ex3a
            eyes.check("Example 3a",
                Target.window()
                    .fully(true));

//%%%% stop ex3a

//%%%% start ex4
            eyes.check("Example 4a",
                    Target.region(By.id("mixed-area")));

            WebElement element = driver.findElement(By.id("mixed-area"));
            eyes.check("Example 4b",
                    Target.region(element));

            eyes.check("Example 4c",
                    Target.region(new Region(30, 50, 300, 620)));

            eyes.check("Example 4d",
                    Target.frame("frame-outer"));

            eyes.check("Example 4e",
                    Target.frame("frame-outer")
                            .frame("frame-inner")
                            .region(By.tagName("inner-frame-main"))
            );
//%%%% stop ex4

//%%%% start ex5
            eyes.check("Example 5a",
                    Target.window()
                    .fully(true));
                    
            eyes.check("Example 5b",
                    Target.region(By.id("mixed-area"))
                    .fully());

            eyes.check("Example 5c",
                    Target.frame("frame-outer")
                            .frame("frame-inner")
                            .region(By.tagName("inner-frame-main")
                            .fully(false));
            );
//%%%% stop ex5

//%%%% start ex6
            // pass a match level value
            eyes.check("Example6a",Target.region(By.id("mixed-area")).matchLevel(MatchLevel.LAYOUT));
            
            // or use one of the shortcut match level methods
            eyes.check("Example6b",Target.region(By.id("mixed-area")).layout());  // matchLevel(MatchLevel.LAYOUT))
            eyes.check("Example6c",Target.region(By.id("mixed-area")).strict());  // matchLevel(MatchLevel.STRICT))
            eyes.check("Example6d",Target.region(By.id("mixed-area")).content()); // matchLevel(MatchLevel.CONTENT))
//%%%% stop ex6

//%%%% start ex7
            int timeout_in_milliseconds = 10000;
            eyes.check("Example 7",
                Target.window()
                    .timeout(timeout_in_milliseconds));
//%%%% stop ex7

//%%%% start ex8
            Boolean doIgnore = true;
            eyes.check("Example 8",
                Target.window()
                    .ignoreCaret(doIgnore));
//%%%% stop ex8

//%%%% start ex9
            eyes.check("Example 9a",Target.window()); 
            
            eyes.check(
                Target.window()
                .withName("Example 9b")) ;      
                
            eyes.check(
                Target.region(By.id("greeting"))
                    .layout()
                    .withName("Example 9c"),                        
                Target.frame(By.id("id2"))
                    .fully()
                    .withName("Example 9d")
            );
//%%%% stop ex9

//%%%% start ex10
            List<WebElement> elements = driver.findElements(By.className("data-entry"));
            WebElement [] elementsArray = new WebElement[elements.size()];
            By [] bylist = {
                    By.id("id1"),
                    By.id("id2"),
                    By.id("id3"),
                    By.id("id4"),
            };
            eyes.check("tag1",
                    Target.region(R1)
                            .ignore(elements.toArray(elementsArray))
                            .ignore(By.className("data-entry"), By.cssSelector("[volatile]"))
                            .ignore(bylist)
                            .ignore(new Region(10,10,100,52),
                                    new Region(10,100,200,52),
                                    new Region(10,100,200,52))
                );
//%%%% stop ex10

//%%%% start ex11
        int offset = 10;
        int upwards = 5, downwards = 12, toTheLeft = 20, toTheRight = 20;
            By [] byList = {
                    By.id("line1"),
                    By.id("line2"),
                    By.id("line3")
            };

        Region region1 = new Region(upwards,downwards, toTheLeft, toTheRight);
        Region region2 = new Region(upwards,50, 100, 200);
        Region region3 = new Region(upwards,50, 100, 200);
        eyes.check("mytag",
                Target.window()
                    .floating(By.id("myLogo"), upwards, downwards,toTheLeft, toTheRight)
                    .floating(element, upwards, downwards,toTheLeft, toTheRight)
                    .floating(offset, region1, region2)
                    .floating(offset, regionList)
            );
//%%%% stop ex11
//%%%% start ex12
            WebElement username = driver.findElement(By.id("username"));
            username.sendKeys("JDoe");
            WebElement password = driver.findElement(By.id("password"));
            password.sendKeys("MySecret123?");
            eyes.check("myTag",
                Target.window()
                    .strict(By.className("fixedFields"), By.id("myID1"), By.id("myID2"))
                    .layout(username, password) /* an array of elements */
                    .content(
                        new Region(10,10,100,200),
                        new Region(10,300,100,200),
                        new Region(10,500,100,200))
                    .strict() /* define a strict match level for the entire target */
            );

//%%%% stop ex12
            eyes.close(false);
        } finally {
            eyes.abortIfNotClosed();
        }
        innerDriver.quit();
    }
}
