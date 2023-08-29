package com.winest.test;

import static org.junit.Assert.assertTrue;
import java.time.Duration;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.WebElement;

public class Login {

    private WebDriver mDriver;

    @Before
    public void setup() throws Exception {
        // Start Chrome Driver
        System.setProperty("webdriver.chrome.driver", "src\\test\\java\\com\\winest\\test\\chromedriver.exe");

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
    public void loginWithInvalidCredentials() throws Exception {

        String WRONG_EMAIL = "test@gmail.com";
        String WRONG_PASS = "12321321";

        // Find credential input fields
        WebElement emailField = mDriver.findElement(By.name("email"));
        WebElement passwordField = mDriver.findElement(By.name("password"));

        // Insert wrong credentials
        emailField.sendKeys(WRONG_EMAIL);
        passwordField.sendKeys(WRONG_PASS);

        // Tap login
        WebElement loginBtn = mDriver.findElement(By.cssSelector(".login-btn"));
        loginBtn.click();
        Thread.sleep(5000);

        // Verify if login page is still shown
        assertTrue(passwordField.isDisplayed());
    }

    @Test
    public void loginWithValidCredentials() throws Exception {

        String CORRECT_EMAIL = "arthurrodrigosilvestre18@gmail.com";
        String CORRECT_PASS = "29012001";

        // Find credential input fields
        WebElement emailField = mDriver.findElement(By.name("email"));
        WebElement passwordField = mDriver.findElement(By.name("password"));

        // Insert valid credentials
        emailField.sendKeys(CORRECT_EMAIL);
        passwordField.sendKeys(CORRECT_PASS);

        // Tap login
        WebElement loginBtn = mDriver.findElement(By.cssSelector(".login-btn"));
        loginBtn.click();
        Thread.sleep(5000);

        // Verify if home is displayed
        WebElement navBar = mDriver.findElement(By.cssSelector(".leftBar"));
        assertTrue(navBar.isDisplayed());

    }
}
