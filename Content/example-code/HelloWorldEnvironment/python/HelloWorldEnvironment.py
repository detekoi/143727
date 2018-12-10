#version 1.0.3
#%%%% start all
import os
from selenium import webdriver
from applitools.eyes import Eyes

class HelloWorldEnvironment:
    # Initialize the eyes SDK and set your private API key.
    # %%%% start eyes-setup
    uri = "https://eyesapi.applitools.com"
    # %%%% start eyes-exception
    eyes = Eyes(uri)
    #%%%% stop eyes-exception
    api_key = os.environ.get('APPLITOOLS_API_KEY')
    eyes.api_key = api_key
    # %%%% stop eyes-setup
    # Open a Chrome browser.
    # %%%% start eyes-open
    innerDriver = webdriver.Chrome() 
    eyes.baseline_name
    # Start the test and set the browser's viewport size
    # %%%% start eyes-exception
    viewport_size = {'width': 1024, 'height': 768}
    driver = eyes.open(driver=innerDriver, app_name='Hello World App', test_name='Hello World Test',
                viewport_size = viewport_size)
     #         %%%% stop eyes-open
    try:
        # %%%% stop all
        # insert your checkpoints here.... 
        # %%%% start all
        # %%%% stop eyes-exception
        # Navigate the browser to the "hello world!" web-site.
        website = "https://applitools.com/helloworld"
        driver.get(website)

        # Visual checkpoint #1.
         # %%%% start eyes-check
        eyes.check_window('Before mouse click')
        # %%%% stop eyes-check

        # Click the 'Click me!' button.
        driver.find_element_by_css_selector('button').click()

        # Visual checkpoint #2.
        eyes.check_window('After mouse click')

        # End the test.
        # %%%% start eyes-close
        # %%%% start eyes-exception
        throwtTestCompleteException = False
        result = eyes.close(throwtTestCompleteException)
        # %%%% stop eyes-exception
        url = result.url
        if result.is_new :
            print( "New Baseline Created: URL=", url)
        elif result.is_passed  :
            print( "All steps passed:     URL=", url)
        else :
            print( "Test Failed:          URL=", url)
    # %%%% stop eyes-close
    # %%%% start eyes-exception
    finally:
        # If the test was aborted before eyes.close was called, ends the test as aborted.
        eyes.abort_if_not_closed()
        # %%%% stop eyes-exception
    # Close the browser.
    driver.quit()
    # %%%% stop all
