package com.applitools.ekb;

import com.applitools.eyes.MatchLevel;
import com.applitools.eyes.RectangleSize;
import com.applitools.eyes.Region;
import com.applitools.eyes.selenium.Eyes;
import com.applitools.eyes.selenium.fluent.SeleniumCheckSettings;
import com.applitools.eyes.selenium.fluent.Target;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;


public class fluentsnippets {
    public static void main(String[] args) {
        String website = "C:\\Users\\User\\Documents\\eyes-knowledgebase-source\\FlareProjects\\Content\\example-code\\fluentsnippets\\html\\fluentsnippets.html";
        Eyes eyes = new Eyes();
        WebDriver innerDriver = new ChromeDriver();
        RectangleSize viewportSize = new RectangleSize(/*width*/ 1024, /*height*/ 800);
        String appname = "EKB examples";
        String testname = "snippets v1";

        WebDriver driver = eyes.open(innerDriver, appname, testname, viewportSize);
        try {
            driver.get(website);
            Region R1 = new Region(10,15,20,10);
            Region R2 = new Region(40,20,30,15);
            Region F3 = new Region(80,25,40,20);
            Region F4 = new Region(130,30,50,25);
            int up=10, left=30,down=20,right=40;
//%%%% start ex1
            eyes.check("Example 1a",                     // the name of the checkpoint (and step)
                 Target.window()                          // check the entire window
                       .fully()                             // use scrolling and stitching
                       .strict()                            // use a STRICT match level
                       .ignore(R1,R2)                       // ignore the regions defined by R1 and R2
                       .floating(F3, up, down, left,right)  // handle the region F3 as a floating region
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
                 Target.region(By.id("mixed-area"))          // 1st target    
                       .layout()
                       .withName("Example 2a")
            );
            /*TBD Should be a single check call*/
            eyes.check( 
                 Target.region(By.cssSelector("body table")) // 2nd  target
                       .strict()
                       .withName("Example 2b")
            );
//%%%% stop ex3

//%%%% start ex3a
            eyes.check("Example 3a", Target.window());
            
            // this is equivalent to
            eyes.checkWindow("Example 3a - non Fluent");
//%%%% stop ex3a

//%%%% start ex4a
            eyes.check("Example 3b", Target.region(By.id("mixed-area")));
            
            // this is equivalent to
            eyes.checkRegion(By.id("mixed-area"),"Example 3b - non fluent");
            
            WebElement element = driver.findElement(By.id("mixed-area"));
            eyes.check("Example 3c", Target.region(element));

            eyes.check("Example 3d", Target.region(new Region(30, 50, 300, 620)));
//%%%% stop ex4a
//%%%% start ex4b
            eyes.check("Example 3e",
                 Target.frame("frame-outer"));

            eyes.check("Example 3f",
                 Target.frame("frame-outer")
                       .frame("frame-inner"));
                    
            eyes.check("Example 3g",
                 Target.frame("frame-outer")
                       .frame("frame-inner")
                       .region(By.id("inner-text")));

            // this is equivalent to
            String [] path = {"frame-outer","frame-inner"};
            eyes.checkRegionInFrame(path, By.id("inner-text"), "Example 3g - non Fluent");
//%%%% stop ex4b
//%%%% start ex5
            eyes.check("Example 5a", 
                 Target.window().fully(true));

            eyes.check("Example 5b",
                 Target.region(By.id("mixed-area")).fully());
            
            // this is equivalent to
            eyes.checkRegion(By.id("mixed-area"), "Example 5b - non Fluent",true);

            eyes.check("Example 5c",
                 Target.frame("frame-outer")
                       .frame("frame-inner")
                       .region(By.id("inner-text"))
                       .fully()
            );
//%%%% stop ex5

//%%%% start ex6
            // pass a match level value
            eyes.check("Example6a",
                 Target.region(By.id("mixed-area")).matchLevel(MatchLevel.LAYOUT));

            // or use one of the shortcut match level methods
            eyes.check("Example6b",
                 Target.region(By.id("mixed-area")).layout());  // matchLevel(MatchLevel.LAYOUT))
            
            eyes.check("Example6c",
                 Target.region(By.id("mixed-area")).strict());  // matchLevel(MatchLevel.STRICT))
            
            eyes.check("Example6d",
                 Target.region(By.id("mixed-area")).content()); // matchLevel(MatchLevel.CONTENT))
//%%%% stop ex6

//%%%% start ex7
            int timeout_in_milliseconds = 10000;
            eyes.check("Example 7",
                 Target.window().timeout(timeout_in_milliseconds)
            );
//%%%% stop ex7

//%%%% start ex8
            Boolean doIgnore = true;
            eyes.check("Example 8",
                 Target.window().ignoreCaret(doIgnore)
            );
//%%%% stop ex8

//%%%% start ex9
            eyes.check("Example 9a",Target.window());

            eyes.check(Target.window().withName("Example 9b"));

            eyes.check(
                 Target.region(By.id("greeting"))
                       .layout()
                       .withName("Example 9c")
            );
            /*tbd remove when multiple target allowed*/
            eyes.check( 
                 Target.frame(By.id("frame-outer"))
                       .fully()
                       .withName("Example 9d")
            );
//%%%% stop ex9

//%%%% start ex10
            Region ignoreArea = new Region(10,10,50,25);

            eyes.check("Example 10a",
                 Target.region(By.id("greeting"))
                       .ignore(
                          By.id("user-name"),
                          By.id("last-login"),
                          By.id("current-date"),
                          By.id("current-time"))
                       .ignore(ignoreArea)
            );
            By [] byList = {
                By.id("user-name"),
                By.id("last-login"),
                By.id("current-date"),
                By.id("current-time")
            };
            eyes.check("Example 10b",
                 Target.region(By.id("greeting"))
                       .ignore(byList)
                       .ignore(ignoreArea)
            );                   
            eyes.check("Example 10c",
                 Target.region(By.id("greeting"))
                       .ignore(By.cssSelector("[volatile]"))
                       .ignore(ignoreArea)
            );
//%%%% stop ex10

//%%%% start ex11
            int offset = 10;
            int upwards = 5, downwards = 12, toTheLeft = 20, toTheRight = 20;

            Region region1 = new Region(10, 20, 50, 15);
            Region region2 = new Region(10,50, 100, 200);
            Region region3 = new Region(upwards,50, 100, 200);
            Region [] regionList = {region1, region2, region3 };

            eyes.check("Example 11a",
                 Target.window()
                       .floating(region1, upwards, downwards, toTheLeft, toTheRight)
                       .floating(region2, upwards, downwards, toTheLeft, toTheRight)
                       .floating(region3, upwards, downwards, toTheLeft, toTheRight)
            );
            eyes.check("Example 11b",
                 Target.window()
                       .floating(offset, regionList)
            );
            eyes.check("Example 11c",
                 Target.window()
                       .floating(offset, region1, region2, region3)
            );
//%%%% stop ex11

//%%%% start ex12
            WebElement username = driver.findElement(By.id("userid"));
            username.sendKeys("JDoe");
            WebElement password = driver.findElement(By.id("password"));
            password.sendKeys("myPassword!");
            eyes.check("Example 12a",
                 Target.region(By.id("loginform"))
                       .layout(username, password)
                       .strict(By.id("instructions"))
                       .matchLevel(MatchLevel.CONTENT) /* define a strict match level for the entire target */
            );

//%%%% stop ex12
            eyes.close(false);
        } finally {
            eyes.abortIfNotClosed();
            innerDriver.quit();
        }
    }
}
