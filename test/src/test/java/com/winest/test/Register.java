package com.winest.test;

import static org.junit.Assert.assertTrue;
import java.time.Duration;
import java.time.format.DateTimeFormatter;
import java.time.LocalDateTime;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.WebElement;

public class Register {

    private WebDriver mDriver;

    @Before
    public void setup() throws Exception {
        // Start Chrome Driver
        // System.setProperty("webdriver.chrome.driver",
        // "src\\test\\java\\com\\winest\\test\\chromedriver.exe");

        // Initializar WebDriver
        mDriver = new ChromeDriver();

        // Launch Web app
        mDriver.get("http://localhost:3001");

        // Wait 10s for page load
        mDriver.manage().timeouts().pageLoadTimeout(Duration.ofSeconds(10));

        // Maximize window
        mDriver.manage().window().maximize();
    }

    @After
    public void tearDown() throws Exception {
        // Close Driver
        mDriver.quit();
    }

    @Test
    public void register() throws Exception {

        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("HH:mm");
        LocalDateTime now = LocalDateTime.now();

        String NAME = "Test";
        String EMAIL = "test" + dtf.format(now) + "@gmail.com";
        String PASSWORD = "123";
        String BIRTHDAY_DATE = "29-01-2001";
        String PHONE = "1234567";

        // Navigato to Sign Up screen
        WebElement signUpBtn = mDriver.findElement(By.cssSelector(".signup-btn"));
        signUpBtn.click();
        Thread.sleep(1000);

        // Find data input fields
        WebElement name = mDriver.findElement(By.name("name"));
        WebElement email = mDriver.findElement(By.name("email"));
        WebElement password = mDriver.findElement(By.name("password"));
        WebElement birthdayDate = mDriver.findElement(By.name("birthdayDate"));
        WebElement phone = mDriver.findElement(By.name("phoneNumber"));

        // Insert data
        name.sendKeys(NAME);
        email.sendKeys(EMAIL);
        password.sendKeys(PASSWORD);
        birthdayDate.sendKeys(BIRTHDAY_DATE);
        phone.sendKeys(PHONE);

        // Tap Sign In
        WebElement signUp = mDriver.findElement(By.cssSelector(".register-btn"));
        signUp.click();
        Thread.sleep(4000);

        // Find login input fields
        WebElement emailField = mDriver.findElement(By.name("email"));
        WebElement passwordField = mDriver.findElement(By.name("password"));

        // Insert credentials
        emailField.sendKeys(EMAIL);
        passwordField.sendKeys(PASSWORD);

        // Tap login
        WebElement loginBtn = mDriver.findElement(By.cssSelector(".login-btn"));
        loginBtn.click();
        Thread.sleep(5000);

        // Verify if home page is still shown
        WebElement navBar = mDriver.findElement(By.className("leftBar"));
        assertTrue(navBar.isDisplayed());
    }

}
