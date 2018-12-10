

    const Eyes = require('eyes.selenium').Eyes;
    const Webdriver = require('selenium-webdriver');
    const By = Webdriver.By;
    const Target = require('eyes.selenium').Target;
    const MatchLevel = require('eyes.selenium').MatchLevel;

    async function main() {
        const website = "C:\\Users\\User\\Documents\\eyes-knowledgebase-source\\FlareProjects\\Content\\example-code\\fluentsnippets\\html\\fluentsnippets.html";

        const viewportSize = {width : 1024,height : 800};
        const appname = "EKB examples";
        const testname = "snippets v1";
        const eyes = new Eyes();
        const innerDriver = new Webdriver.Builder()   // Open a Chrome browser.
            .withCapabilities(Webdriver.Capabilities.chrome())
            .build();
        driver = await eyes.open(innerDriver, appname, testname, viewportSize)
        try {
            await driver.get(website);
            const R1 =  {left: 10, top: 15, width: 20, height: 10}; 
            const R2 = {left: 40, top: 20, width: 30, height: 15};
            const F3 =    {left: 80, top: 25, width: 40, height: 20,
                           maxLeftOffset : 30, maxRightOffset: 40, maxUpOffset: 10, maxDownOffset: 20};
            const F4 = {left: 130, top: 30, width: 50, height: 25,
                maxLeftOffset : 30, maxRightOffset: 40, maxUpOffset: 10, maxDownOffset: 20};

            console.log("doing ex 1");
    async        function SKIP() {
//%%%% start ex1
            await eyes.check("Example 1a",                 // the name of the checkpoint (and step)
                Target.window()                            // await checkthe entire window
                      .fully()
                      .matchLevel(MatchLevel.Strict)       // use scrolling and stitching
                      .ignore(R1)                          // ignore the regions defined by R1 and R2
                      .floating(F3)                        // handle the region F3 as a floating region
                      .floating(F4)                        // handle the region F4 as a floating region
                );
//%%%% stop ex1
console.log("doing ex 2");
//%%%% start ex2
            const t = Target.window();
            t.fully();
            t.matchLevel(MatchLevel.Strict);
            t.ignore(R1);
            t.floating(F3);
            t.floating(F4);
            await eyes.check("Example 1b", t);
//%%%% stop ex2
console.log("doing ex 3");
//%%%% start ex3
/*Not implemented
            await eyes.check(
                Target.region(By.id("mixed-area"))
                      .layout()
                      .withName("Example 2a"),
                Target.region(driver.By.cssSelector("body table"))
                      .strict()
                      .withName("Example 2b")
                );
                */
//%%%% stop ex3
console.log("doing ex3a");
//%%%% start ex3a
            await eyes.check("Example 3a",
                Target.window());
                      
             // this is equivalent to
             eyes.checkWindow("Example 3a - non Fluent");
//%%%% stop ex3a
console.log("doing ex 4a");
//%%%% start ex4a
            await eyes.check("Example 3b",
                Target.region(By.id("mixed-area")));

            // this is equivalent to
            eyes.checkRegion(By.id("mixed-area"),"Example 3b");
            
            const element = driver.findElement(By.id("mixed-area"));
            await eyes.check("Example 3c", Target.region(element));

            const R3 =  {left: 30, top: 50, width: 300, height: 620}; 
            await eyes.check("Example 3d", Target.region(R3));
//%%%% stop ex4a
            } //END SKIP
console.log("doing ex 4b");
/*
//%%%% start ex4b
Sorry, example not available in Javascript
//%%%% stop ex4b
*/
/* NOT WORKING "failed to set viewport size"
            await eyes.check("Example 3e",
                Target.frame("frame-outer"));
*/
/*NOT WORKING   Target.frame(...).frame is not a function
            await eyes.check("Example 3f",
                Target.frame("frame-outer")
                      .frame("frame-inner")
                );
                      
            await eyes.check("Example 3g",
                Target.frame("frame-outer")
                      .region(By.id("inner-text"), "frame-inner")
                );
*/  
/*NOT WORKING          
            // this is equivalent to
            let  path = ["frame-outer","frame-inner"];
            eyes.checkRegionInFrame(path, By.id("inner-text"), "Example 3g - non Fluent");   
            */        



console.log("doing ex 5");
//%%%% start ex5
            await eyes.check("Example 5a",
                Target.window().fully(true));

            await eyes.check("Example 5b",
                Target.region(By.id("mixed-area")).fully());

            // this is equivalent to
            eyes.checkRegion(By.id("mixed-area"), "Example 5b - non Fluent",true);
            //%%%% stop ex5
   /*  NOT WORKING
            await eyes.check("Example 5c",
                Target.frame("frame-outer")
                      .region(By.id("inner-text"),"frame-inner")
                      .fully()
                );
                */


console.log("doing ex 6");
//%%%% start ex6
            // pass a match level value
            await eyes.check("Example6a",Target.region(By.id("mixed-area")).matchLevel(MatchLevel.LAYOUT));
//%%%% stop ex6
/*
            // or use one of the shortcut match level methods
            await eyes.check("Example6b",
                Target.region(By.id("mixed-area")).layout());  // matchLevel(MatchLevel.LAYOUT))
            
            await eyes.check("Example6c",
                Target.region(By.id("mixed-area")).strict());  // matchLevel(MatchLevel.STRICT))
            
            await eyes.check("Example6d",
                Target.region(By.id("mixed-area")).content()); // matchLevel(MatchLevel.CONTENT))
*/
console.log("doing ex 7");
//%%%% start ex7
const timeout_in_milliseconds = 10000;
            await eyes.check("Example 7",
                Target.window().timeout(timeout_in_milliseconds));
//%%%% stop ex7
console.log("doing ex 8");
//%%%% start ex8
            const doIgnore = true;
            await eyes.check("Example 8",
                Target.window().ignoreCaret(doIgnore));
//%%%% stop ex8

console.log("doing ex 9");
//%%%% start ex9
            await eyes.check("Example 9a",Target.window());

            await eyes.check("Example 9c",
                Target.region(By.id("greeting"))
                .matchLevel(MatchLevel.LAYOUT)
                );
                
            await eyes.check("Example 9d",
                Target.frame(By.id("frame-outer"))
                      .fully()
                );
//%%%% stop ex9

console.log("doing ex 10");
//%%%% start ex10
const ignoreArea = {left: 10, top: 10, width: 50, height: 25};

            await eyes.check("Example 10a",
                Target.region(By.id("greeting"))
                      .ignore(By.id("user-name"), 
                              By.id("last-login"), 
                              By.id("current-date"), 
                              By.id("current-time"))
                      .ignore(ignoreArea)
                );
//%%%% stop ex10
                /* arrays not supported
            const  bylist = [
                    By.id("user-name"),
                    By.id("last-login"),
                    By.id("current-date"),
                    By.id("current-time")
                ];

            await eyes.check("Example 10b",
                Target.region(By.id("greeting"))
                      .ignore(bylist)
                      .ignore(ignoreArea)
                );
            await eyes.check("Example 10c",
                Target.region(By.id("greeting"))
                      .ignore(By.cssSelector("[volatile]"))
                      .ignore(ignoreArea)
                );
                */

console.log("doing ex 11");
//%%%% start ex11
            const offset = 10;

            const region1 =    {left: 10, top: 20, width: 50, height: 15,
                maxLeftOffset : 20, maxRightOffset: 20, maxUpOffset: 5, maxDownOffset: 12};

            const region2 = {left: 10, top: 50, width: 100, height: 200,
                maxLeftOffset : 20, maxRightOffset: 20, maxUpOffset: 5, maxDownOffset: 12};

            const region3 =  {left: 10, top: 5, width: 100, height: 200,
                maxLeftOffset : 20, maxRightOffset: 20, maxUpOffset: 5, maxDownOffset: 12};

            const regionList = [ region1, region2, region3 ];

            await eyes.check("Example 11a",
                Target.window()
                      .floating(region1)
                      .floating(region2)
                      .floating(region3)
                );
                //%%%% stop ex11
                /* Not implemented
            await eyes.check("Example 11b",
                Target.window()
                      .floating(offset, regionList)
                );
            await eyes.check("Example 11c",
                Target.window()
                      .floating(offset, region1, region2, region3)
                );
                */

console.log("doing ex 12");
/*
//%%%% start ex12
    Example not available for Javascript
//%%%% stop ex12
*/
/* not supported
            const username = driver.findElement(By.id("userid"));
            await username.sendKeys("JDoe");
            const password = driver.findElement(By.id("password"));
            await password.sendKeys("myPassword!");
            await eyes.check("Example 12a",
                Target.region(By.id("loginform"))
                      .layout(username, password)
                      .strict(By.id("instructions"))
                      .matchLevel(MatchLevel.Content) // define a strict match level for the entire target 
            );

*/

//%%%% stop ex12
            await eyes.close(false);
        } catch (err) {
            console.error(err);
            console.trace();
        } finally {
            eyes.abortIfNotClosed();
            innerDriver.quit();
        }
        
    }

main().then(() => console.log('done')).catch(err => console.error(err));


