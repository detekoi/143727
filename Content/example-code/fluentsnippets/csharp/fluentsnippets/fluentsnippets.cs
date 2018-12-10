using Applitools.Selenium;
using Applitools.Selenium.Fluent;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;
using System.Drawing;


namespace Fluentsnippets
{
    class Fluentsnippets
    {
        static void Main(string[] args)
        {
            String website = "C:\\Users\\User\\Documents\\eyes-knowledgebase-source\\FlareProjects\\Content\\example-code\\fluentsnippets\\html\\fluentsnippets.html";
            Eyes eyes = new Eyes();
            IWebDriver innerDriver = new ChromeDriver();
            Size viewportSize = new Size(/*width*/ 1024, /*height*/ 800);
            String appname = "EKB examples";
            String testname = "snippets v1";

            IWebDriver driver = eyes.Open(innerDriver, appname, testname, viewportSize);
            try
            {
                driver.Url = website;
                Rectangle R1 = new Rectangle(10, 15, 20, 10);
                Rectangle R2 = new Rectangle(40, 20, 30, 15);
                Rectangle F3 = new Rectangle(80, 25, 40, 20);
                Rectangle F4 = new Rectangle(130, 30, 50, 25);
                int up = 10, left = 30, down = 20, right = 40;
//%%%% start ex1
                eyes.Check("Example 1a",                        // the name of the checkpoint (and step)
                    Target.Window()                             // check the entire window
                          .Fully()                              // use scrolling and stitching
                          .Strict()                             // use a STRICT match level
                          .Ignore(R1, R2)                       // ignore the regions defined by R1 and R2
                          .Floating(F3, up, down, left, right)  // handle the region F3 as a floating region
                          .Floating(F4, up, down, left, right)  // handle the region F4 as a floating region
                );
//%%%% stop ex1

//%%%% start ex2
                SeleniumCheckSettings t = Target.Window();
                t.Fully();
                t.Strict();
                t.Ignore(R1, R2);
                t.Floating(F3, up, down, left, right);
                t.Floating(F4, up, down, left, right);
                eyes.Check("Example 1b", t);
//%%%% stop ex2

//%%%% start ex3
                eyes.Check(
                     Target.Region(By.Id("mixed-area"))
                           .Layout()
                           .WithName("Example 2a")
                );
                /*TBD Should be a single target call*/
                eyes.Check( 
                     Target.Region(By.CssSelector("body table"))  // 2nd target
                           .Strict()
                           .WithName("Example 2b")
                );
//%%%% stop ex3

//%%%% start ex3a
                eyes.Check("Example 3a", Target.Window());

                // this is equivalent to
                eyes.CheckWindow("Example 3a - non Fluent");
//%%%% stop ex3a

//%%%% start ex4a
                eyes.Check("Example 3b",
                        Target.Region(By.Id("mixed-area")));

                // this is equivalent to
                eyes.CheckRegion(By.Id("mixed-area"),"Example 3b - non fluent");
            
                IWebElement element = driver.FindElement(By.Id("mixed-area"));
                eyes.Check("Example 3c",
                     Target.Region(element));

                eyes.Check("Example 3d", Target.Region(new Rectangle(30, 50, 300, 620)));
//%%%% stop ex4a
//%%%% start ex4b
                eyes.Check("Example 3e",
                     Target.Frame("frame-outer"));

                eyes.Check("Example 3f",
                     Target.Frame("frame-outer")
                           .Frame("frame-inner")
                );
                           
                eyes.Check("Example 3g",
                     Target.Frame("frame-outer")
                           .Frame("frame-inner")
                           .Region(By.Id("inner-text"))
                );
                
                
//%%%% stop ex4b
//%%%% start ex5
                eyes.Check("Example 5a",
                     Target.Window().Fully(true));

                eyes.Check("Example 5b",
                     Target.Region(By.Id("mixed-area")).Fully());

                // this is equivalent to
                eyes.CheckRegion(By.Id("mixed-area"), "Example 5b - non Fluent",true);
            
                eyes.Check("Example 5c",
                     Target.Frame("frame-outer")
                           .Frame("frame-inner")
                           .Region(By.Id("inner-text"))
                           .Fully()
                );
//%%%% stop ex5

//%%%% start ex6
                // pass a match level value
                eyes.Check("Example6a", 
                     Target.Region(By.Id("mixed-area")).MatchLevel(Applitools.MatchLevel.Layout));

                // or use one of the shortcut match level methods
                eyes.Check("Example6b", 
                     Target.Region(By.Id("mixed-area")).Layout());  // matchLevel(MatchLevel.LAYOUT))
                
                eyes.Check("Example6c", 
                     Target.Region(By.Id("mixed-area")).Strict());  // matchLevel(MatchLevel.STRICT))
                
                eyes.Check("Example6d", 
                     Target.Region(By.Id("mixed-area")).Content()); // matchLevel(MatchLevel.CONTENT))
//%%%% stop ex6                                                                                      

//%%%% start ex7
                eyes.Check("Example 7",
                     Target.Window().Timeout(new TimeSpan(0, 0, 10)));
//%%%% stop ex7

//%%%% start ex8
                Boolean doIgnore = true;
                eyes.Check("Example 8",
                     Target.Window()
                           .IgnoreCaret(doIgnore));
//%%%% stop ex8

//%%%% start ex9
                eyes.Check("Example 9a", Target.Window());

                eyes.Check(
                     Target.Window().WithName("Example 9b"));

                eyes.Check(
                     Target.Region(By.Id("greeting"))
                           .Layout()
                           .WithName("Example 9c")
                );
                /*tbd remove when multiple targbet allowed*/
                eyes.Check( 
                     Target.Frame(By.Id("frame-outer"))
                           .Fully()
                           .WithName("Example 9d")
                );
//%%%% stop ex9

//%%%% start ex10
                Rectangle ignoreArea = new Rectangle(10, 10, 50, 25);

                eyes.Check("Example 10a",
                     Target.Region(By.Id("greeting"))
                           .Ignore(By.Id("user-name"), 
                                   By.Id("last-login"), 
                                   By.Id("current-date"), 
                                   By.Id("current-time"))
                           .Ignore(ignoreArea)
                    );
                By[] bylist = {
                    By.Id("user-name"),
                    By.Id("last-login"),
                    By.Id("current-date"),
                    By.Id("current-time")
                };
                eyes.Check("Example 10b",
                     Target.Region(By.Id("greeting"))
                           .Ignore(bylist)
                           .Ignore(ignoreArea)
                    );
                eyes.Check("Example 10c",
                     Target.Region(By.Id("greeting"))
                           .Ignore(By.CssSelector("[volatile]"))
                           .Ignore(ignoreArea)
                );
                //%%%% stop ex10

                //%%%% start ex11
                int offset = 10;
                int upwards = 5, downwards = 12, toTheLeft = 20, toTheRight = 20;

                Rectangle region1 = new Rectangle(10, 20, 50, 15);
                Rectangle region2 = new Rectangle(10, 50, 100, 200);
                Rectangle region3 = new Rectangle(upwards, 50, 100, 200);
                Rectangle[] regionList = { region1, region2, region3 };

                eyes.Check("Example 11a",
                     Target.Window()
                           .Floating(region1, upwards, downwards, toTheLeft, toTheRight)
                           .Floating(region2, upwards, downwards, toTheLeft, toTheRight)
                           .Floating(region3, upwards, downwards, toTheLeft, toTheRight)
                    );
                eyes.Check("Example 11b",
                     Target.Window()
                           .Floating(offset, regionList)
                );
                eyes.Check("Example 11c",
                     Target.Window()
                           .Floating(offset, region1, region2, region3)
                );
                //%%%% stop ex11

                //%%%% start ex12
                IWebElement username = driver.FindElement(By.Id("userid"));
                username.SendKeys("JDoe");
                IWebElement password = driver.FindElement(By.Id("password"));
                password.SendKeys("myPassword!");
                eyes.Check("Example 12a",
                     Target.Region(By.Id("loginform"))
                           .Layout(username, password)
                           .Strict(By.Id("instructions"))
                           .MatchLevel(Applitools.MatchLevel.Content) /* define a strict match level for the entire target */
                );

//%%%% stop ex12
                eyes.Close(false);
            }
            finally
            {
                eyes.AbortIfNotClosed();
                innerDriver.Quit();
            }

        }
    }
}
