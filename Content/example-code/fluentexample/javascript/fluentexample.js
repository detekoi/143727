



function main() {
        var website = "C:\\Users\\User\\Documents\\eyes-knowledgebase-source\\FlareProjects\\Content\\example-code\\fluentsnippets\\html\\fluentsnippets.html";
        var eyes = require('eyes.selenium').Eyes();
        var innerDriver = require('selenium-webdriver');
        var viewportSize = {width : 1024,height : 800};
        var appname = "EKB examples";
        var testname = "snippets v1";

        var driver = eyes.open(innerDriver, appname, testname, viewportSize);
        try {
            driver.get(website);
            var R1 = new Region(10,15,20,10);
            var R2 = new Region(40,20,30,15);
            var F3 = new Region(80,25,40,20);
            var F4 = new Region(130,30,50,25);
            var up=10, left=30,down=20,right=40;
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
var t = Target.window();
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
                            .region(driver.By.id("mixed-area"))
                            .layout()
                            .withName("Example 2a")
            );
            eyes.check( /*TBD Should be a single target call*/
                    Target                                  // 2nd  target
                            .region(driver.By.cssSelector("body table"))
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
                    Target.region(driver.By.id("mixed-area")));

            var element = driver.findElement(driver.driver.By.id("mixed-area"));
            eyes.check("Example 4b",
                    Target.region(element));

            eyes.check("Example 4c",
                    Target.region(new Region(30, 50, 300, 620)));

            eyes.check("Example 4d",
                    Target.frame("frame-outer"));

            eyes.check("Example 4e",
                    Target.frame("frame-outer")
                            .frame("frame-inner")
                            .region(driver.By.id("inner-text"))
            );
//%%%% stop ex4

//%%%% start ex5
            eyes.check("Example 5a",
                    Target.window()
                            .fully(true));

            eyes.check("Example 5b",
                    Target.region(driver.By.id("mixed-area"))
                            .fully());

            eyes.check("Example 5c",
                    Target.frame("frame-outer")
                            .frame("frame-inner")
                            .region(driver.By.id("inner-text"))
                                    .fully()
            );
//%%%% stop ex5

//%%%% start ex6
            // pass a match level value
            eyes.check("Example6a",Target.region(driver.By.id("mixed-area")).matchLevel(MatchLevel.LAYOUT));

            // or use one of the shortcut match level methods
            eyes.check("Example6b",Target.region(driver.By.id("mixed-area")).layout());  // matchLevel(MatchLevel.LAYOUT))
            eyes.check("Example6c",Target.region(driver.driver.By.id("mixed-area")).strict());  // matchLevel(MatchLevel.STRICT))
            eyes.check("Example6d",Target.region(driver.By.id("mixed-area")).content()); // matchLevel(MatchLevel.CONTENT))
//%%%% stop ex6

//%%%% start ex7
var timeout_in_milliseconds = 10000;
            eyes.check("Example 7",
                    Target.window()
                            .timeout(timeout_in_milliseconds));
//%%%% stop ex7

//%%%% start ex8
    var doIgnore = true;
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
                    Target.region(driver.By.id("greeting"))
                            .layout()
                            .withName("Example 9c")
            );
            eyes.check( /*tbd remove when multiple targbet allowed*/
                    Target.frame(driver.By.id("frame-outer"))
                            .fully()
                            .withName("Example 9d")
            );
//%%%% stop ex9

//%%%% start ex10
var ignoreArea = new Region(10,10,50,25);

            eyes.check("Example 10a",
                    Target.region(driver.By.id("greeting"))
                    .ignore(driver.By.id("user-name"), driver.By.id("last-login"), driver.By.id("current-date"), driver.By.id("current-time"))
                    .ignore(ignoreArea)
            );
            var  bylist = [
                    driver.By.id("user-name"),
                    driver.By.id("last-login"),
                    driver.By.id("current-date"),
                    driver.By.id("current-time")
            ];
            eyes.check("Example 10b",
                    Target.region(By.id("greeting"))
                    .ignore(driver.Bylist)
                    .ignore(ignoreArea)
            );
            eyes.check("Example 10c",
                    Target.region(driver.By.id("greeting"))
                            .ignore( driver.By.cssSelector("[volatile]"))
                            .ignore(ignoreArea)
            );
//%%%% stop ex10

//%%%% start ex11
            var offset = 10;
            var upwards = 5, downwards = 12, toTheLeft = 20, toTheRight = 20;

            var region1 = new Region(10, 20, 50, 15);
            var region2 = new Region(10,50, 100, 200);
            var region3 = new Region(upwards,50, 100, 200);
            var regionList = [ region1, region2, region3 ];

            eyes.check("Example 11a",
                    Target.window()
                            .floating(region1, upwards, downwards,toTheLeft, toTheRight)
                            .floating(region2, upwards, downwards,toTheLeft, toTheRight)
                            .floating(region3, upwards, downwards,toTheLeft, toTheRight)
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
            var username = driver.findElement(driver.By.id("userid"));
            username.sendKeys("JDoe");
            var password = driver.findElement(driver.By.id("password"));
            password.sendKeys("myPassword!");
            eyes.check("Example 12a",
                    Target.region(driver.By.id("loginform"))
                            .layout(username, password)
                            .strict(driver.By.id("instructions"))
                            .matchLevel(MatchLevel.CONTENT) /* define a strict match level for the entire target */
            );

//%%%% stop ex12
            eyes.close(false);
        } finally {
            eyes.abortIfNotClosed();
            innerDriver.quit();
        }

    }
main();

