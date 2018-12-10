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
            var eyes = new Eyes();                                                      // Note 1
            eyes.ApiKey = Environment.GetEnvironmentVariable("MY_APPLITOOLS_API_KEY");  // Note 2
            var innerDriver = new ChromeDriver();                                       // Note 3                                
            var viewportSize = new Size(1024, 768);
            var driver = eyes.Open(innerDriver, 
                    "My Application Name", "My Test Name", viewportSize);               // Note 4
            try
            {
                string website = "https://applitools.com/helloworld";
                driver.Url = website;                                                   // Note 5
                eyes.CheckWindow("initial screen");                                     // Note 6
                Applitools.TestResults result = eyes.Close(false);                      // Note 7
            }
            catch (Exception ex)
            {
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