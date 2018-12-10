#version 1.0.1
#%%%% start all
require 'eyes_selenium'
require 'selenium-webdriver'

# Initialize the eyes SDK and set your private API key.
# %%%% start eyes-setup
uri = "https://eyesapi.applitools.com"
# %%%% start eyes-exception
eyes = Applitools::Selenium::Eyes.new(uri)
#%%%% stop eyes-exception
api_key = ENV['APPLITOOLS_API_KEY']
eyes.api_key = api_key
# %%%% stop eyes-setup
# Open a Chrome Browser.
# %%%% start eyes-open
inner_driver = Selenium::WebDriver.for :chrome

  # Start the test and set the browser's viewport size to 800x600.
  # %%%% start eyes-exception
viewport_size = {width:1024, height:786}
driver = eyes.open( driver: inner_driver, app_name: 'Hello World App', test_name: 'Hello World Test',
           viewport_size: viewport_size)
   #         %%%% stop eyes-open
begin
    # %%%% stop all
    # insert your checkpoints here.... 
    # %%%% start all
    # %%%% stop eyes-exception
    # Navigate the browser to the "hello world!" web-site.
    website = 'https://applitools.com/helloworld'
    driver.get website

    # Visual checkpoint #1.
    # %%%% start eyes-check
    eyes.check_window 'Before mouse click'
    # %%%% stop eyes-check

    # Click the "Click me!".
    driver.find_element(:tag_name => 'button').click

    # Visual checkpoint #2.
    eyes.check_window 'After mouse click'
    # %%%% start eyes-close
    # %%%% start eyes-exception
    throwtTestCompleteException = false;
    result = eyes.close(throwtTestCompleteException)
    # %%%% stop eyes-exception
    url = result.url;
    if result.is_new
        puts "New Baseline Created: URL=#{url}"
    elsif result.is_passed 
        puts "All steps passed:     URL=#{url}"
    else 
        puts "Test Failed:          URL=#{url}"
    end
    # %%%% stop eyes-close
    # %%%% start eyes-exception
ensure
  # If the test was aborted before eyes.close was called, ends the test as aborted.
  eyes.abort_if_not_closed
end
# %%%% stop eyes-exception
inner_driver.quit # Close the browser.
# %%%% stop all