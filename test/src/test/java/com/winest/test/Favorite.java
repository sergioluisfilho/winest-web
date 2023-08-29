package com.winest.test;

import static org.junit.Assert.assertTrue;
import java.time.Duration;
import java.util.List;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.WebElement;

public class Favorite {

    private WebDriver mDriver;
    private String WINE_NAME = "Rainstorm 2013 Pinot Gris (Willamette Valley)";

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
    }

    @After
    public void tearDown() throws Exception {
        // Close Driver
        mDriver.quit();
    }

    @Test
    public void favoriteWine() throws Exception {

        // Navigate to Search screen
        WebElement searchScreenIcon = mDriver.findElement(By.id("search"));
        searchScreenIcon.click();

        // Search wine
        WebElement searchField = mDriver.findElement(By.id("search-field"));
        searchField.sendKeys(WINE_NAME);
        Thread.sleep(1000);

        // Favorite wine
        WebElement unfavoriteIcon = mDriver.findElement(By.id("unfavorite"));
        unfavoriteIcon.click();
        Thread.sleep(1000);

        // Navigate to Favorites
        WebElement favorites = mDriver.findElement(By.id("favorites"));
        favorites.click();
        Thread.sleep(2000);

        // Check if the favorite wine is displayed
        WebElement favoriteWine = mDriver
                .findElement(By.xpath("//*[text()='Rainstorm 2013 Pinot Gris (Willamette Valley)']"));
        assertTrue(favoriteWine.isDisplayed());

        // Unfavorite
        WebElement unfavoriteBtn = mDriver.findElement(By.id("unfavorite-icon"));
        unfavoriteBtn.click();
        Thread.sleep(2000);

        // Check if the wine has been removed from favorites
        List<WebElement> favoriteWines = mDriver.findElements(By.id("unfavorite-icon"));
        assertTrue(favoriteWines.size() == 0);
    }
}
