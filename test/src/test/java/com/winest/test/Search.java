package com.winest.test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import java.time.Duration;
import java.util.List;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.WebElement;

public class Search {

    private WebDriver mDriver;
    private WebDriverWait mWait;
    private String WINE_NAME = "Rainstorm 2013 Pinot Gris (Willamette Valley)";
    private String INVALID_WINE_NAME = "Invalid Wine Name";

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

        // Initialize WebDriverWait with 1 minute of duration
        mWait = new WebDriverWait(mDriver, Duration.ofMinutes(1));

        // Maximize window
        mDriver.manage().window().maximize();

        String CORRECT_EMAIL = "arthurrodrigosilvestre18@gmail.com";
        String CORRECT_PASS = "29012001";

        // Find credential input fields
        WebElement emailField = mDriver.findElement(By.name("email"));
        WebElement passwordField = mDriver.findElement(By.name("password"));

        // Insert wrong credentials
        emailField.sendKeys(CORRECT_EMAIL);
        passwordField.sendKeys(CORRECT_PASS);

        // Tap login
        WebElement loginBtn = mDriver.findElement(By.cssSelector(".login-btn"));
        loginBtn.click();
        Thread.sleep(5000);

        // Navigate to Search screen
        WebElement searchScreenIcon = mDriver.findElement(By.id("search"));
        searchScreenIcon.click();
    }

    @After
    public void tearDown() throws Exception {
        // Close Driver
        mDriver.quit();
    }

    @Test
    public void searchValidWine() throws Exception {

        // Search wine
        WebElement searchField = mDriver.findElement(By.id("search-field"));
        searchField.sendKeys(WINE_NAME);
        Thread.sleep(1000);

        // Verify the searched wine is displayed
        WebElement wineName = mDriver.findElement(By.id("wine-name"));
        assertEquals(WINE_NAME, wineName.getText());
    }

    @Test
    public void searchInvalidWine() throws Exception {

        // Search wine
        WebElement searchField = mDriver.findElement(By.id("search-field"));
        searchField.sendKeys(INVALID_WINE_NAME);
        Thread.sleep(1000);

        // Verify no wine is found
        List<WebElement> wines = mDriver.findElements(By.cssSelector(".card"));
        assertTrue(wines.size() == 0);
    }

    @Test
    public void getAISuggestion() throws Exception {

        // Tap AI Suggestion button
        WebElement aiBtn = mDriver.findElement(By.cssSelector(".ai-btn"));
        aiBtn.click();
        
        // Wait for AI Suggestion dialog
        assertTrue(mWait.until(ExpectedConditions.visibilityOfElementLocated(By.id("ai-dialog"))).isDisplayed());
    }
}
