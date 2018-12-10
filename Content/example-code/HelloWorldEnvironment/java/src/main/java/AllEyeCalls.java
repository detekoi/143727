import com.applitools.eyes.*;
import com.applitools.eyes.debug.DebugScreenshotsProvider;
import com.applitools.eyes.exceptions.TestFailedException;
import com.applitools.eyes.fluent.ICheckSettings;
import com.applitools.eyes.positioning.PositionProvider;
import com.applitools.eyes.selenium.Eyes;
import com.applitools.eyes.selenium.StitchMode;
import com.applitools.eyes.selenium.positioning.ImageRotation;
import com.applitools.eyes.triggers.MouseAction;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.awt.image.BufferedImage;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

public class AllEyeCalls {

    private Eyes preTestSetup () {

        //simplest way - no server URL
        Eyes eyes1 = new Eyes();

        URI serverURL = null;

        URI defaultURI = Eyes.getDefaultServerUrl(); // %%%% include api-method-getDefaultServerUrl

        try {
            serverURL = new URI("https://eyesapi.applitools.com");
        } catch (URISyntaxException e) {
            System.out.println("URI Exception ");
            return null;
        }

        Eyes eyes3 = new Eyes();                // %%%% include api-method-Eyes
        eyes3.setServerUrl(serverURL);          // %%%% include api-method-setServerUrl


        return eyes1;
    }

    private void basicSetup(WebDriver webDriver, Eyes eyes){

        String apiKey = System.getenv("APPLITOOLS_API_KEY");
        eyes.setApiKey(apiKey);                                     // %%%% include api-method-setApiKey
        String str = eyes.getApiKey();                              // %%%% include api-method-getApiKey
        //returns null if the key is not set

        /**
         * Sets the proxy settings to be used by the rest client.
         * @param proxySettings The proxy settings to be used by the rest client.
         *                      If {@code null} then no proxy is set.
         */
        /*
        String uri = "";
        String username = "user";
        String password = "";
        ProxySettings proxySettings = new ProxySettings( uri,  username,  password);
        eyes.setProxy(proxySettings);
        ProxySettings myProxy = eyes.getProxy();
*/

        eyes.setIsDisabled(false);                          // %%%% include api-method-
        boolean isDisabled = eyes.getIsDisabled();          // %%%% include api-method-

        String appName = "";
        eyes.setAppName(appName);                           // %%%% include api-method-
        String a = eyes.getAppName();                       // %%%% include api-method-

        eyes.setHostApp("Host Application Name");           // %%%% include api-method-
        String hostApp = eyes.getHostApp();                 // %%%% include api-method-

        String branchName = "MyBranch";
        eyes.setBranchName(branchName);                     // %%%% include api-method-
        String my_branchName =  eyes.getBranchName();       // %%%% include api-method-

        eyes.setHostOS("Host OS Name");                     // %%%% include api-method-
        String hostOS = eyes.getHostOS();                   // %%%% include api-method-

        eyes.setEnvName("Environment Name");                // %%%% include api-method-
        String envName = eyes.getEnvName();                 // %%%% include api-method-

        RectangleSize viewportSize = new RectangleSize(800,400);
        eyes.setExplicitViewportSize(viewportSize);         // %%%% include api-method-
        //no get command

        WebDriver innerDriver = new ChromeDriver();
        Eyes.setViewportSize(innerDriver, viewportSize);    // %%%% include api-method-

        BatchInfo batch = new BatchInfo("batch name");
        eyes.setBatch(batch);                                   // %%%% include api-method-
        BatchInfo myBatch = eyes.getBatch();                    // %%%% include api-method-
    }

    private void setupReferenceBaseline(Eyes eyes) {
        //name will probably change - nothing to do with parent....

        String parentBranchName = "BaselineBranch";
        eyes.setParentBranchName(parentBranchName);                 // %%%% include api-method-
        String my_parentBranchName = eyes.getParentBranchName();    // %%%% include api-method-

        eyes.setBaselineEnvName("Baseline Environment Name");       // %%%% include api-method-
        String baselineENvName = eyes.getBaselineEnvName();         // %%%% include api-method-

    }
    private WebDriver openEyes(Eyes eyes, WebDriver innerDriver, String appName, String testName) {

        WebDriver driver;
        int viewport_width = 800;
        int viewport_height = 786;
        RectangleSize viewportSize = new RectangleSize(viewport_width, viewport_height);
        driver = eyes.open(innerDriver, appName, testName, viewportSize);   // %%%% include api-method-
        Boolean b = eyes.getIsOpen();                                       // %%%% include api-method-
        eyes.close(false);                                          // %%%% include api-method-

        Eyes.setViewportSize(driver,viewportSize);                          // %%%% include api-method-
        driver = eyes.open(innerDriver, appName, testName);                 // %%%% include api-method-
        RectangleSize v = eyes.getViewportSize();                           // %%%% include api-method-
        RectangleSize v2 = eyes.getViewportSize(driver); //whats the difference to the prev TBD ? // %%%% include api-method-
        eyes.close(false);                                          // %%%% include api-method-
        return driver;
    }

    private void basic (Eyes eyes) {
        /* Forces a full page screenshot (by scrolling and stitching) if the
            browser only ﻿supports viewport screenshots).
            */
        Boolean shouldForce = true;
        eyes.setForceFullPageScreenshot(shouldForce);                       // %%%% include api-method-
        shouldForce = eyes.getForceFullPageScreenshot();                    // %%%% include api-method-

        /**
         * Set the type of stitching used for full page screenshots. When the
         * page includes fixed position header/sidebar, use {@link StitchMode#CSS}.
         * Default is {@link StitchMode#SCROLL}.
         * @param mode The stitch mode to set.
         */
        StitchMode stitchMode = StitchMode.SCROLL; // or StitchMode.CSS
        eyes.setStitchMode(stitchMode);                                     // %%%% include api-method-
        stitchMode = eyes.getStitchMode();                                  // %%%% include api-method-

        /*
            Sets the time to wait just before taking a screenshot (e.g., to allow
            positioning to stabilize when performing a full page stitching).
            */
        int waitBeforeScreenshots_Msec = 500; // value <= 0 will force default to be used
        eyes.setWaitBeforeScreenshots(waitBeforeScreenshots_Msec);          // %%%% include api-method-
        waitBeforeScreenshots_Msec = eyes.getWaitBeforeScreenshots();       // %%%% include api-method-

        /**
         * Turns on/off the automatic scrolling to a region being checked by
         * {@code checkRegion}.
         * @param shouldScroll Whether to automatically scroll to a region being validated.
         */
        boolean shouldScroll = true;
        eyes.setScrollToRegion(shouldScroll);                               // %%%% include api-method-
        shouldScroll = eyes.getScrollToRegion();                            // %%%% include api-method-

        /**
         * Hide the scrollbars when taking screenshots.
         * @param shouldHide Whether to hide the scrollbars or not. Default false
         */
        boolean shouldHide = false;
        eyes.setHideScrollbars(shouldHide);                                 // %%%% include api-method-
        shouldHide = eyes.getHideScrollbars();                              // %%%% include api-method-

        /**
         * @param rotation The image rotation data.
         *  TBD what does positive mean ? what values can this take ? is it really standard across all drivers ?
         */
        ImageRotation rotation_deg = new ImageRotation(0); //number of degrees to rotate.
        eyes.setRotation(rotation_deg);                                     // %%%% include api-method-
        ImageRotation rotation = eyes.getRotation();

        /**
         * @return The device pixel ratio, or {@link #UNKNOWN_DEVICE_PIXEL_RATIO}
         * if the DPR is not known yet or if it wasn't possible to extract it.
         */
        double pixelRation = eyes.getDevicePixelRatio();                     // %%%% include api-method-

        eyes.setScaleRatio(1.1);                                             // %%%% include api-method-
        double s = eyes.getScaleRatio();                                     // %%%% include api-method-
        FailureReports failureReports = FailureReports.ON_CLOSE; // FailureReports.IMMEDIATE
        eyes.setFailureReports(failureReports);                              // %%%% include api-method-
        FailureReports my_failureReports = eyes.getFailureReports();          // %%%% include api-method-
    }

    private void others(Eyes eyes) {
        String agentId = "my agent"; //TBD
        eyes.setAgentId(agentId); //EyesBase                                 // %%%% include api-method-
        String a = eyes.getAgentId(); //EyesBase                             // %%%% include api-method-
    }

    private void customization1(Eyes eyes) {
        eyes.clearProperties();                                  // %%%% include api-method-
        eyes.addProperty("key","value");             // %%%% include api-method-
    }

    private void customization2(Eyes eyes) {
        class myCutProvider implements CutProvider {

            public BufferedImage cut(BufferedImage image) {
                return null;
            }

            public CutProvider scale(double scaleRatio) {
                return null;
            }
        }
        ;
        eyes.setImageCut(new myCutProvider());               // %%%% include api-method-
    }

    private void matchTuning(Eyes eyes) {

        ImageMatchSettings imageMatchSettings = new ImageMatchSettings();    // %%%% include api-method-

        /*** setFloatingRegions ***/
        int top = 0;
        int left = 0;
        int width = 10;
        int height = 10;

        int maxUpOffset = 1;
        int maxDownOffset = 2;
        int maxLeftOffset = 3;
        int maxRightOffset = 4;
        FloatingMatchSettings [] floatingMatchSettings = new FloatingMatchSettings[1];
        floatingMatchSettings[0] = new FloatingMatchSettings(left, top, width, height, maxUpOffset, maxDownOffset, maxLeftOffset, maxRightOffset);
        imageMatchSettings.setFloatingRegions(floatingMatchSettings);
        FloatingMatchSettings my_floatingMatchSettings = imageMatchSettings.getFloatingRegions()[0];

        /*** setIgnoreRegions ***/
        Region [] ignoreRegionList = new Region[4];
        ignoreRegionList[0] = new Region(left, top, width, height);
        ignoreRegionList[0] = new Region(left, top, width, height, CoordinatesType.SCREENSHOT_AS_IS);
        ignoreRegionList[1] = new Region(left, top, width, height, CoordinatesType.CONTEXT_AS_IS);
        ignoreRegionList[2] = new Region(left, top, width, height, CoordinatesType.CONTEXT_RELATIVE);
        imageMatchSettings.setIgnoreRegions(ignoreRegionList);
        //TBD plenty of more methods....

        /*** setIgnoreCaret ***/
        imageMatchSettings.setIgnoreCaret(false);


        /*** exactMatchSettings ***/
        ExactMatchSettings exactMatchSettings = new ExactMatchSettings();

        int t1 = exactMatchSettings.getMinDiffIntensity();
        int t2 = exactMatchSettings.getMinDiffHeight();
        int t3 = exactMatchSettings.getMinDiffWidth();
        float f1 = exactMatchSettings.getMatchThreshold();
        exactMatchSettings.setMinDiffIntensity( 4);
        exactMatchSettings.setMinDiffHeight(3);
        exactMatchSettings.setMinDiffWidth(2);
        exactMatchSettings.setMatchThreshold(1.0f);
        String str = exactMatchSettings.toString();
        imageMatchSettings.setExact(exactMatchSettings);
        ExactMatchSettings my_exact =  imageMatchSettings.getExact();

        /*** matchLevel ***/
        imageMatchSettings.setMatchLevel(MatchLevel.EXACT);
        imageMatchSettings.setMatchLevel(MatchLevel.CONTENT);
        imageMatchSettings.setMatchLevel(MatchLevel.LAYOUT);
        imageMatchSettings.setMatchLevel(MatchLevel.LAYOUT2);
        imageMatchSettings.setMatchLevel(MatchLevel.NONE);

        imageMatchSettings.getIgnoreCaret();
        imageMatchSettings.getIgnoreRegions();
        imageMatchSettings.getMatchLevel();

        eyes.setDefaultMatchSettings(imageMatchSettings);

        ImageMatchSettings my_ImageMatchSettings = eyes.getDefaultMatchSettings();
        MatchLevel m = my_ImageMatchSettings.getMatchLevel();
        Region [] r = my_ImageMatchSettings.getIgnoreRegions();
        Boolean b = my_ImageMatchSettings.getIgnoreCaret();
        FloatingMatchSettings [] f = my_ImageMatchSettings.getFloatingRegions();
        ExactMatchSettings e = my_ImageMatchSettings.getExact();
        String str2 = my_ImageMatchSettings.toString();


        eyes.setMatchLevel(MatchLevel.STRICT);
        MatchLevel ml = eyes.getDefaultMatchSettings().getMatchLevel();

        eyes.setIgnoreCaret(true);
        Boolean b1 = eyes.getIgnoreCaret();

        int overlap_pxl= 3;
        eyes.setStitchOverlap(overlap_pxl);


        // Sets the maximum time (in ms) a match operation tries to perform a match.
        int matchTimeoutMsec = 500;
        eyes.setMatchTimeout(matchTimeoutMsec);
        int my_matchTimeoutMsec = eyes.getMatchTimeout();

        eyes.setSaveFailedTests(false);
        boolean saveFailedTests = eyes.getSaveFailedTests();
    }


    private void checking(Eyes eyes) {
        int matchTimeout_MSec = 1000; //The amount of time to retry matching
        String checkTag = "descriptive checkpoint name"; //An optional tag to be associated with the checkpoint
        eyes.checkWindow();
        eyes.checkWindow(checkTag);
        eyes.checkWindow(matchTimeout_MSec, checkTag);

        Region region = null; //TBD to set this
        String tag = "Tag Name"; //TBD how is this different from appName and testName
        /**
         * Takes a snapshot of the application under test and matches a specific region within it with the expected output.
         * @param region       A non empty region representing the screen region to check.
         * @param matchTimeout The amount of time to retry matching. (Milliseconds)
         * @param tag          An optional tag to be associated with the snapshot.
         * @throws TestFailedException Thrown if a mismatch is detected and immediate failure reports are enabled.
         */
        eyes.checkRegion(region, matchTimeout_MSec, tag);
        eyes.checkRegion(region);

        /**
         * If {@code stitchContent} is {@code false} then behaves the same as
         * {@link #checkRegion(org.openqa.selenium.WebElement)}, otherwise
         * behaves the same as {@link #checkElement(WebElement)}.
         */
        WebElement webElement = null; //TBD what is this and how to set
        boolean stitchContent = true;
        eyes.checkRegion(webElement, stitchContent);
        eyes.checkRegion(webElement);
        eyes.checkRegion(webElement, tag);
        eyes.checkRegion(webElement, tag, stitchContent);
        eyes.checkRegion(webElement, matchTimeout_MSec, tag);
        eyes.checkRegion(webElement, matchTimeout_MSec, tag, stitchContent);

        By selector = null; //TBD how to set
        eyes.checkRegion(selector);
        eyes.checkRegion(selector, stitchContent);
        eyes.checkRegion(selector, tag);
        eyes.checkRegion(selector, tag, stitchContent);
        eyes.checkRegion(selector, matchTimeout_MSec, tag);
        eyes.checkRegion(selector, matchTimeout_MSec, tag, stitchContent);

        int frameIndex = 0; //wht is this
        eyes.checkRegionInFrame(frameIndex, selector);
        eyes.checkRegionInFrame(frameIndex, selector, stitchContent);
        eyes.checkRegionInFrame(frameIndex, selector, tag);
        eyes.checkRegionInFrame(frameIndex, selector, tag, stitchContent);
        eyes.checkRegionInFrame(frameIndex, selector, matchTimeout_MSec, tag);
        eyes.checkRegionInFrame(frameIndex, selector, matchTimeout_MSec, tag, stitchContent);

        String frameNameOrId = "TBD";
        eyes.checkRegionInFrame(frameNameOrId, selector);
        eyes.checkRegionInFrame(frameNameOrId, selector, stitchContent);
        eyes.checkRegionInFrame(frameNameOrId, selector, tag);
        eyes.checkRegionInFrame(frameNameOrId, selector, tag, stitchContent);
        eyes.checkRegionInFrame(frameNameOrId, selector, matchTimeout_MSec, tag);
        eyes.checkRegionInFrame(frameNameOrId, selector, matchTimeout_MSec, tag, stitchContent);

        WebElement frameReference = null; //TBD
        eyes.checkRegionInFrame(frameReference, selector);
        eyes.checkRegionInFrame(frameReference, selector, stitchContent);
        eyes.checkRegionInFrame(frameReference, selector, tag);
        eyes.checkRegionInFrame(frameReference, selector, tag, stitchContent);
        eyes.checkRegionInFrame(frameReference, selector, matchTimeout_MSec, tag);
        eyes.checkRegionInFrame(frameReference, selector, matchTimeout_MSec, tag, stitchContent);

        eyes.checkFrame(frameNameOrId);
        eyes.checkFrame(frameNameOrId, tag);
        eyes.checkFrame(frameNameOrId, matchTimeout_MSec, tag);

        eyes.checkFrame(frameIndex);
        eyes.checkFrame(frameIndex, tag);
        eyes.checkFrame(frameIndex, matchTimeout_MSec, tag);

        eyes.checkFrame(frameReference);
        eyes.checkFrame(frameReference, tag);
        eyes.checkFrame(frameReference, matchTimeout_MSec, tag);

        String[] framesPath = null; //TBD
        eyes.checkFrame(framesPath);
        eyes.checkFrame(framesPath, tag);
        eyes.checkFrame(framesPath, matchTimeout_MSec, tag);

        /**
         * Switches into the given frame, takes a snapshot of the application under
         * test and matches a region specified by the given selector.
         * @param framePath     The path to the frame to check. This is a list of
         *                      frame names/IDs (where each frame is nested in the previous frame).
         * @param selector      A Selector specifying the region to check.
         * @param matchTimeout  The amount of time to retry matching (milliseconds).
         * @param tag           An optional tag to be associated with the snapshot.
         * @param stitchContent Whether or not to stitch the internal content of the
         *                      region (i.e., perform {@link #checkElement(By, int, String)} on the region.
         */

        eyes.checkRegionInFrame(framesPath, selector, matchTimeout_MSec, tag, stitchContent);
        eyes.checkRegionInFrame(framesPath, selector, matchTimeout_MSec, tag);
        eyes.checkRegionInFrame(framesPath, selector, tag);
        eyes.checkRegionInFrame(framesPath, selector);
        eyes.checkRegionInFrame(framesPath, selector, matchTimeout_MSec, tag, stitchContent);
        eyes.checkRegionInFrame(framesPath, selector, matchTimeout_MSec, tag, stitchContent);
        eyes.checkRegionInFrame(framesPath, selector, matchTimeout_MSec, tag, stitchContent);

        String name = "TBD"; //TBD what is this ?
        eyes.checkElement(webElement);
        eyes.checkElement(webElement, tag);
        eyes.checkElement(webElement, matchTimeout_MSec, tag);

        eyes.checkElement(selector);
        eyes.checkElement(selector, tag);
        eyes.checkElement(selector, matchTimeout_MSec, tag);
    }

    private void triggers(Eyes eyes) {
        MouseAction action = MouseAction.Click; //Click, RightClick, DoubleClick, Move, Down, Up
        int left = 10;
        int top = 12;
        int width = 200;
        int height = 50;
        CoordinatesType coord_typr = CoordinatesType.SCREENSHOT_AS_IS;//CONTEXT_AS_IS, CONTEXT_RELATIVE
        Region control = new Region(left,top,width,height,coord_typr);
        int loc_x = 10;
        int loc_y = 12;
        Location cursor = new Location(loc_x,loc_y);
        /**
         * Adds a mouse trigger.
         * @param action  Mouse action.
         * @param control The control on which the trigger is activated (context relative coordinates).
         * @param cursor  The cursor's position relative to the control.
         */
        eyes.addMouseTrigger( action,  control,  cursor);
        WebElement element = null;
        eyes. addMouseTrigger(action, element);

        eyes.addTextTrigger(control, "text trigger");
        eyes.addTextTrigger(element, "text trigger");


    }

    private void testing(Eyes eyes, WebDriver driver) {
        String appName = "Application Name";
        String testName = "Checkpoint Tag";
        int width = 1024; int height = 768;
        RectangleSize viewportSize = new RectangleSize(width, height);
        /**
         * Runs a test on the current window.
         * @param driver       The web driver that controls the browser hosting
         *                     the application under test.
         * @param appName      The name of the application under test. Default is taken from setAppName() TBD look at this
         * @param testName     The test name (will also be used as the tag name for the step).
         * @param viewportSize The required browser's viewport size
         *                     (i.e., the visible part of the document's body) or
         *                     {@code null} to use the current window's viewport.
         */
        eyes.testWindow(driver, appName, testName, viewportSize);
        eyes.testWindow(driver, appName, testName);
        eyes.testWindow(driver, testName, viewportSize);
        eyes.testWindow(driver, testName);

    }

    private void visualPerformanceTest(Eyes eyes, WebDriver driver) {
        String appName = "Application Name";
        String testName = "Checkpoint Tag";
        Eyes.WebDriverAction action = null; //TBD
        int deadline_sec = 1000;
        int timeout_sec = 1000;
        int width = 1024; int height = 768;
        RectangleSize viewportSize = new RectangleSize(width, height);
        /**
         * Run a visual performance test.
         * @param driver   The driver to use.
         * @param appName  The name of the application being tested.
         * @param testName The test name.
         * @param action   Actions to be performed in parallel to starting the test. //TBD what should this be set to ?
         * @param deadline The expected time until the application should have been loaded. (Seconds)
         *                 default RESPONSE_TIME_DEFAULT_DEADLINE (10)
         * @param timeout  The maximum time until the application should have been loaded. (Seconds)
         *                 default RESPONSE_TIME_DEFAULT_DEADLINE (10) + RESPONSE_TIME_DEFAULT_DIFF_FROM_DEADLINE (20)
         */

        eyes.testResponseTime(driver, appName, testName, action, deadline_sec, timeout_sec);
        eyes.testResponseTime(driver, appName, testName, action, deadline_sec);
        eyes.testResponseTime(driver, appName, testName, action);
        eyes.testResponseTime(driver, appName, testName,  deadline_sec);
        eyes.testResponseTime(driver, appName, testName);
        eyes.testResponseTime(driver, appName, testName, action, deadline_sec, timeout_sec, viewportSize);
        eyes.testResponseTime(driver, appName, testName, action, deadline_sec, viewportSize);
        eyes.testResponseTime(driver, appName, testName, action, viewportSize);
        eyes.testResponseTime(driver, appName, testName, deadline_sec, timeout_sec, viewportSize);
        eyes.testResponseTime(driver, appName, testName, deadline_sec, viewportSize);
        eyes.testResponseTime(driver, appName, testName, viewportSize);
    }

    private void Ichecking(Eyes eyes) {
        String name = "TBD what is thsi name";
        /*
        ICheckSettings checkSettings = null;
        eyes.check(name, checkSettings);
        */
    }

    class MyLogHandler implements LogHandler {
        public void open() {}
        public void onMessage(boolean verbose, String logString) {}
        public void close() {}
    }

    class MyDebugScreenshotsProvider extends DebugScreenshotsProvider {

        public void save(BufferedImage image, String suffix) {

        }
    }

    void debugging(Eyes eyes) {
        String pathToSave = "";
        eyes.setDebugScreenshotsPath(pathToSave);
        String s1 = eyes.getDebugScreenshotsPath();

        eyes.setDebugScreenshotsPrefix("prefix");
        String s2 = eyes.getDebugScreenshotsPrefix();

        eyes.setSaveDebugScreenshots(true);
        Boolean b = eyes.getSaveDebugScreenshots();

        eyes.setLogHandler(new MyLogHandler());
        MyLogHandler my_MyLogHandler = (MyLogHandler) eyes.getLogHandler();

        MyDebugScreenshotsProvider provider = new MyDebugScreenshotsProvider();
        provider.setPath("path");
        provider.setPrefix("prefix");
        provider.getPath();
        provider.getPrefix();
    }
}
