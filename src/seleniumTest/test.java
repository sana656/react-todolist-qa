package seleniumTest;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.html5.LocalStorage;
import org.openqa.selenium.html5.WebStorage;

public class test {
    public static WebDriver driver;
    protected static final String URL = "http://localhost:3000";

    @Before
    public void before() {
        System.setProperty("webdriver.chrome.driver", "./chromedriver");
        driver = new ChromeDriver();
        ChromeOptions options = new ChromeOptions();
        driver.manage().window().maximize();
        driver.get(URL);
    }

    @Test
    public void ConnexionWithoutCredentials() {
        WebElement submitButton = driver.findElement(By.xpath("//input[@type='submit']"));
        Assert.assertFalse(submitButton.isEnabled());
    }

    @Test
    public void AddTask()     {
        Connexion();
        driver.findElement(By.xpath("//a[@href='/tasks']")).click();
        WebElement NameTask = driver.findElements(By.xpath("//input[@type='text']")).get(0);
        NameTask.sendKeys(task);
        WebElement description = driver.findElements(By.xpath("//input[@type='text']")).get(1);
        String descriptionTask = "task1description";
        description.sendKeys(descriptionTask);
        WebElement AddTask = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[2]/div[3]/button"));
        AddTask.click();
        LocalStorage local = ((WebStorage) driver).getLocalStorage();
        Assert.assertFalse(local.getItem("tasks").isEmpty());
        String localStorageTask = local.getItem("tasks");
    }

    @Test
    public void ModifyTask()     {
        Connexion();
        driver.findElement(By.xpath("//a[@href='/tasks']")).click();
        WebElement NameTask = driver.findElements(By.xpath("//input[@type='text']")).get(0);
        NameTask.sendKeys(task);
        WebElement description = driver.findElements(By.xpath("//input[@type='text']")).get(1);
        String descriptionTask = "task1description";
        description.sendKeys(descriptionTask);
        WebElement AddTask = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[2]/div[3]/button"));
        AddTask.click();
        LocalStorage local = ((WebStorage) driver).getLocalStorage();
        String localStorageTask = local.getItem("tasks");
        System.out.println(localStorageTask);
        driver.findElement(By.xpath("//div[@style='cursor: pointer;']")).click();
        String localStorageTask2 = local.getItem("tasks");
    }

    @Test
    public void DeleteTAsk()     {
        Connexion();
        driver.findElement(By.xpath("//a[@href='/tasks']")).click();
        WebElement NameTask = driver.findElements(By.xpath("//input[@type='text']")).get(0);
        NameTask.sendKeys(task);
        WebElement description = driver.findElements(By.xpath("//input[@type='text']")).get(1);
        String descriptionTask = "task1description";
        description.sendKeys(descriptionTask);
        WebElement AddTask = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[2]/div[3]/button"));
        AddTask.click();
        LocalStorage local = ((WebStorage) driver).getLocalStorage();
        String localStorageTask = local.getItem("tasks");
        int size = local.size();
        WebElement delete = driver.findElement(By.xpath("//a[@href='/tasks']"));
        delete.click();

    }

    @Test
    public void ConnexionWithIncorrectCredentials()     {
        WebElement email = driver.findElement(By.xpath("//input[@type='email']"));
        email.sendKeys("user@user.com");
        WebElement password = driver.findElement(By.xpath("//input[@type='password']"));
        password.sendKeys("user");
        WebElement login = driver.findElement(By.xpath("//input[@type='submit']"));
        login.click();
        WebElement msg= driver.findElement(By.xpath(("//*[@id=\"root\"]/div/div/div/div[1]")));
        String text=msg.getText();
        String expectedText = "Désolé, les identifiants sont incorrects.";
        Assert.assertEquals(text,expectedText);
    }


    @After
    public void after() {
        driver.quit();
    }
}



