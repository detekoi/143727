import com.applitools.eyes.MatchLevel;
import com.applitools.eyes.RectangleSize;
import com.applitools.eyes.selenium.fluent.Target;
import com.applitools.eyes.selenium.Eyes;
import com.applitools.eyes.selenium.fluent.SeleniumCheckSettings;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class testFluent {
    public static void main(String[] args) {

        Eyes eyes = new Eyes();
        WebDriver innerDriver = new ChromeDriver();
        RectangleSize viewportSize = new RectangleSize(/*width*/ 1024, /*height*/ 768 );
        String appname = "examples";
        String testname ="fluentTest v6";

        WebDriver driver = eyes.open(innerDriver, appname, testname,viewportSize);
        try {
            String website = "file:///C:/Users/User/Documents/eyes-knowledgebase-source/FlareProjects/Content/example-code/fluentexample/fluentexample.html";
            driver.get(website);

            eyes.check(Target.window()
                    .layout(By.id("start-time"))
                    .ignore(By.tagName("iframe"))
                    .ignore(By.className("testArea"))
                    .withName("check window "));

            eyes.check(Target.frame(By.id("frame2")).withName("Check full frame").fully());

            int time = 10000;
            WebElement element = driver.findElement(By.id("countdown"));
            /*
            element.clear();
            element.sendKeys(Integer.toString(time)+"\n");
            eyes.check(Target.region(element).exact().withName("likely to fail"));
            */
            element.clear();
            element.sendKeys(Integer.toString(time)+"\n");
            eyes.check(Target.region(element)
                    .exact()
                    .ignoreCaret()
                    .timeout(time)
                    .withName("Check delay"));

            driver.findElement(By.id("button")).click();
            eyes.check(Target.region(By.id("testFloat"))
                    .layout(By.id("random"))
                    .floating(By.id("image"),0,0,10,10)
                    .matchLevel(MatchLevel.STRICT).ignoreCaret()
                    .withName("Check Floating"));

            /*
            for (int i=0 ; i < 4; i++) {
                driver.findElement(By.id("button")).click();
                eyes.check(Target.region(By.id("elapsed-time")).layout(By.className("elapsed")));
            }
            */

            eyes.close(false);
        } finally {
            eyes.abortIfNotClosed();
        }
        innerDriver.quit();
    }

}
