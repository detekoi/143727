//version 1.0.1
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
            // Initialize the eyes SDK and set your private API key.     
            var serverURL = new Uri("https://eyesapi.applitools.com");
            // %%%% start set-baseline-env
            var eyes = new Eyes(serverURL);
            // %%%% stop set-baseline-env
           
            
            eyes.ApiKey = Environment.GetEnvironmentVariable("APPLITOOLS_API_KEY");

            // Open a Chrome browser.
            var innerDriver = new ChromeDriver();
            var viewportSize = new Size(1024, 768);
            // Start the test and set the browser's viewport size
            eyes.SetAppEnvironment("Windows 10" ,"Firefox");
            // %%%% start set-baseline-env
            eyes.BaselineEnvName = "desktop browser";
            //now call open
            // %%%% stop set-baseline-env
            // %%%% start set-matchlevel
            eyes.MatchLevel = Applitools.MatchLevel.Layout;
            // %%%% stop set-matchlevel
            var driver = eyes.Open(innerDriver, "cross environment", "test 1", viewportSize);
            // %%%% stop set-baseline-env
            try
            {		
                // Navigate the browser to the "hello world!" web-site.
                string website = "https://applitools.com/helloworld";
                driver.Url = website;

                // Visual checkpoint #1
                eyes.CheckWindow("Before mouse click");

                // Click the "Click me!" button.
                driver.FindElement(By.TagName("button")).Click();

                // Visual checkpoint #2.
                eyes.CheckWindow("After mouse click");

                // End the test
                var throwtTestCompleteException = false;
                Applitools.TestResults result = eyes.Close(throwtTestCompleteException); 
                string url = result.Url;
                if (result.IsNew)
                {
                    Console.WriteLine("New Baseline Created: URL=" + url);
                }
                else if (result.IsPassed)
                {
                    Console.WriteLine("All steps passed:     URL=" + url);
                }
                else
                {
                    Console.WriteLine("Test Failed:          URL=" + url);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            finally
            {
                // If the test was aborted before eyes.Close was called, ends the test as aborted.
                eyes.AbortIfNotClosed();
            }
            // Close the browser.
            innerDriver.Quit();
        }
    }
}