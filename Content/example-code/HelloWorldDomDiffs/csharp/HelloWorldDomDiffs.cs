//version 1.0.2
// %%%% start all
namespace Demos
{
    using System;
    using System.Drawing;
    using Applitools.Selenium;
    using OpenQA.Selenium;
    using OpenQA.Selenium.Chrome;

    public class HelloWorldSimple
    {
        public static void Main(string[] args)
        {     
            var eyes = new Eyes(new Uri("https://testeyesapi.applitools.com"));                                                      // Note 1
            eyes.ApiKey = Environment.GetEnvironmentVariable("APPLITOOLS_TESTAPI_KEY");  // Note 2
            eyes.ApiKey 
                        = "qYQ6SVJh105wOsguQnXFzkuRHEndcUnYsIKvLqUxEVTho110";
            var innerDriver = new ChromeDriver();                                       // Note 3                                
            var viewportSize = new Size(1024, 768);
            var driver = eyes.Open(innerDriver, 
                    "Demos", "Domain Diff 16", viewportSize);               // Note 4
            eyes.SendDom = true;
            try
            {
                /*string website = "https://applitools.com/helloworld";*/

                string diff = "?diff3";
                string website = "C:/Users/User/Documents/eyes-knowledgebase-source/FlareProjects/Content/example-code/HelloWorldDomDiffs/helloworlddomdiffs.html";
                website += diff;
                driver.Url = website;                                                   // Note 5
                eyes.CheckWindow("initial screen");                                     // Note 6
                Applitools.TestResults result = eyes.Close(false);                      // Note 7
            }   catch (Exception ex)
            {
                var i = 1;
            }
            finally
            {
                // If the test was aborted before eyes.Close was called, ends the test as aborted.
                eyes.AbortIfNotClosed();                                                // Note 8
            }
            innerDriver.Quit();                                                         // Note 9
        }
    }
}
// %%%% stop all