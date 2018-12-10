package com.applitools.ekb;

import com.applitools.eyes.MatchLevel;
import com.applitools.eyes.RectangleSize;
import com.applitools.eyes.Region;
import com.applitools.eyes.selenium.Eyes;
import com.applitools.eyes.selenium.fluent.Target;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.ArrayList;
import java.util.List;

//version 1.1
//%%%% start all
public class fluentexample {
    public static void main(String[] args) {

        Eyes eyes = new Eyes();
        WebDriver innerDriver = new ChromeDriver();
        RectangleSize viewportSize = new RectangleSize(/*width*/ 800, /*height*/ 600 );
        String appname = "EKB examples";
        String testname ="Acme Fluent v3";

        WebDriver driver = eyes.open(innerDriver, appname, testname,viewportSize);
        try {
            //%%%% start login-page
            String loginPage = "https://afternoon-savannah-68940.herokuapp.com/#";
            //%%%% stop login-page
            String mainPage = "file:///C:/Users/User/Documents/eyes-knowledgebase-source/FlareProjects/Content/example-code/fluentexample/Account%20-%20ACME.html";
            //%%%% start login-page
            driver.get(loginPage);
            eyes.check("initial login page", Target.window());
            //%%%% stop login-page

            //%%%% start usernamepassword
            WebElement username = driver.findElement(By.id("username"));
            username.click(); username.sendKeys("adamC");
            WebElement password = driver.findElement(By.id("password"));
            username.click(); password.sendKeys("MySecret123?");
            //%%%% stop usernamepassword
            /*
            eyes.check(Target.region(username));
            eyes.check(Target.region(password));

            eyes.check(
                    Target.region(username),
                    Target.region(password)
            );
            */
            //%%%% start usernamepassword
            eyes.check(                                                /*1*/
                    Target.region(username)                            /*2*/
                            .ignoreCaret(true)                         /*3*/
                            .matchLevel(MatchLevel.LAYOUT)             /*4*/
                            .withName("user name")                     /*5*/
            );
            eyes.check(
                    Target.region(password)                            /*6*/
                            .ignoreCaret()                             /*7*/
                            .strict()                                  /*8*/
                            .ignore(new Region(30,15, 150, 30))        /*9*/
                            .withName("password")                      /*10*/
                    );
            //%%%% stop usernamepassword
            /*TBD using local page at the moment
            driver.findElement(By.tagName("button")).click();  //TBD give the button an ID
            */
            //TBD navigating to local page till the official app has what I need
            driver.get(mainPage);

            /*
            dynamicAreas.add(driver.findElement(By.className("welcome")));
            dynamicAreas.add(driver.findElement(By.className("snapshot-topic")));
            dynamicAreas.add(driver.findElement(By.className("balance"))); //TBD spelt wrong in original
            */
            //%%%% start main-page-checkall


            List <WebElement> dynamicAreas = driver.findElements(By.cssSelector("[data-volatile]")); /*1*/
            WebElement [] dynamicAreaArray = new WebElement[dynamicAreas.size()];
            dynamicAreaArray = dynamicAreas.toArray(dynamicAreaArray);

            int timoutMs = 15000;
            eyes.check("main window without table",
                    Target.window()                               /*2*/
                            .fully()                              /*3*/
                            .layout(By.cssSelector("[data-volatile]"))
                           //.layout(dynamicAreaArray)             /*4*/
                            .ignore(By.id("nav-bottom"))          /*5*/
                            .floating(By.cssSelector("[data-test=display-per-page"), /*6*/
                                    0,0,150,150)
                            .ignore(By.cssSelector("orders-list-desktop > tbody"))
                            .timeout(timoutMs)                   /*7*/
                            .matchLevel(MatchLevel.STRICT)       /*8*/
            );

            List <WebElement>  td = driver.findElements(By.tagName("td")); /*1*/
            WebElement []      tdElement =  new WebElement[td.size()];
            eyes.check("scrolled table",
                    Target.region(By.cssSelector("#orders-list-desktop  tbody"))                               /*3*/
                            .fully()                              /*4*/
                            //.layout(By.tagName("td"))                     // %%%% exclude
                            .layout(td.toArray(tdElement))        /*6*/
                            .matchLevel(MatchLevel.STRICT)       /*10*/
            );
            //%%%% stop main-page-checkall
/*
            eyes.check("table only",
                    Target.region()
                            .fully()
                            .ignore(By.id("nav-bottom"),By.id("nav-top"))
                            .floating(By.cssSelector("[data-test=displayPerPage"), 0,0,100,100)
                            .layout(dynamicAreaArray)
                            .layout(By.id("orders-list-desktop"))
                            .matchLevel(MatchLevel.STRICT)
                        );*/
                             /* Doesn't work at the moment, since the layout region is cut by the viewport */

            eyes.close(false);
        } finally {
            eyes.abortIfNotClosed();
        }
        innerDriver.quit();
    }

}
// %%%% stop all
