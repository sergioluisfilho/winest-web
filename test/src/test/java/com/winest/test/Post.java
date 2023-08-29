package com.winest.test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import java.time.Duration;
import java.time.Instant;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.WebElement;

public class Post {

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
    public void publishPost() throws Exception {

        String POST_CONTENT = Instant.now().toString();

        // Share a post
        WebElement postField = mDriver.findElement(By.id("post-draft"));
        postField.sendKeys(POST_CONTENT);
        Thread.sleep(1000);
        WebElement shareBtn = mDriver.findElement(By.id("share-post"));
        shareBtn.click();
        Thread.sleep(1000);

        // Find post
        WebElement postText = mDriver.findElement(By.id("post-text"));
        assertEquals(POST_CONTENT, postText.getText());
    }

    @Test
    public void likeAndDislikePost() throws Exception {

        // Like post
        WebElement unlikedIcon = mDriver.findElement(By.id("not-liked"));
        unlikedIcon.click();
        Thread.sleep(1000);

        // Find liked icon
        WebElement likedIcon = mDriver.findElement(By.id("liked"));
        assertTrue(likedIcon.isDisplayed());

        // Unlike post
        likedIcon.click();
        unlikedIcon = mDriver.findElement(By.id("not-liked"));
        assertTrue(unlikedIcon.isDisplayed());
    }

    @Test
    public void commentPost() throws Exception {

        String COMMENT_TEST = "This is a comment test";

        // Find comment button
        WebElement commentBtn = mDriver.findElement(By.id("comment"));
        commentBtn.click();
        Thread.sleep(1000);

        // Comment
        WebElement commentField = mDriver.findElement(By.id("comment-input-field"));
        commentField.sendKeys(COMMENT_TEST);
        WebElement submitComment = mDriver.findElement(By.id("submit-comment"));
        submitComment.click();
        Thread.sleep(2000);

        // Verify if comment is displayed
        WebElement comment = mDriver.findElement(By.id("comment-content"));
        assertTrue(comment.isDisplayed());
    }

}
