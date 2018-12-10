// version 1.0.1
// %%%% start all
<?php

require_once 'vendor/autoload.php';

use Applitools\RectangleSize;
use Applitools\Selenium\Eyes;
use Facebook\WebDriver\Remote\RemoteWebDriver;
use Facebook\WebDriver\Remote\WebDriverCapabilityType;
use Facebook\WebDriver\WebDriverBy;

class HelloWorldSimple
{ 
    private   $website = 'https://applitools.com/helloworld';
    private   $innerDriver;
    private   $driver;

    public function demo()
    {

        // Initialize the eyes SDK and set your private API key.
        // %%%% start eyes-setup
        $serverURL = 'https://eyesapi.applitools.com';
        // %%%% include  eyes-exception
        $eyes = new Eyes($serverURL);               
        $apiKey = getenv ('APPLITOOLS_API_KEY');
        $eyes->setApiKey($apiKey);
        
        // %%%% stop eyes-setup

        // %%%% start eyes-open
        // Open a chrome browser.
        $capabilities = array(WebDriverCapabilityType::BROWSER_NAME => 'chrome');
        $this->innerDriver = RemoteWebDriver::create
        ('http://localhost:4444/wd/hub', $capabilities);

        $viewportSize =  new RectangleSize(1024, 768);
        
        // Start the test and set the browser's viewport size to 1024x768
        // %%%% start eyes-exception
        $this->driver = $eyes->open($this->innerDriver, 'Hello World App', 'Hello World Test', $viewportSize);
        // %%%% stop eyes-open
        try {
            // insert your checkpoints here....
            // %%%% stop eyes-exception
            $website = 'https://applitools.com/helloworld';
            $this->driver->get($this->website);

            // Visual checkpoint #1.
            // %%%% start eyes-check
            $eyes->checkWindow("Before mouse click");
            // %%%% stop eyes-check

            // Click the "Click me!" button
            $this->driver->findElement(WebDriverBy::tagName("button"))->click();

            // Visual checkpoint #2.
            $eyes->checkWindow("After mouse click");

            // End the test.
            // %%%% start eyes-close
            // %%%% start eyes-exception
            $throwTestCompleteException = 0; 
            $result = $eyes->close($throwTestCompleteException);
            // %%%% stop eyes-exception
            $url = $result->getUrl() ;
            if ($result->isNew()) {
                echo "New Baseline Created: URL=", $url ;
            } else if ($result->isPassed()) {
                echo "All steps passed:     URL=", $url ;
            } else {
                echo "Test Failed:          URL=", $url ;
            }   
            // %%%% stop eyes-close
            // %%%% start eyes-exception
        } finally {
            // If the test was aborted before eyes->close was called, ends the test as aborted.
            $eyes->abortIfNotClosed();
        }
        // %%%% stop eyes-exception
        // Close the browser.
        $this->innerDriver->quit();
    }
}

$test = new HelloWorldSimple();
$test->demo();
// %%%% stop all