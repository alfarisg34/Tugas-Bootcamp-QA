const {Builder , Browser, By, until} = require('selenium-webdriver')


async function main(){
    const driver = await new Builder()
        .forBrowser(Browser.CHROME)
        .build()

    await driver.get('https://www.saucedemo.com/v1/')
    //Login Form
    await driver.findElement(By.id('user-name')).sendKeys('standard_user')
    await driver.findElement(By.id('password')).sendKeys('secret_sauce')
    await driver.findElement(By.id('login-button')).click()
    //Item to Cart
    await driver.findElement(By.css('.btn_primary')).click()
    await driver.findElement(By.css('.btn_primary')).click()
    await driver.findElement(By.id('shopping_cart_container')).click()
    await driver.findElement(By.css('.checkout_button')).click()
    //Information form
    await driver.findElement(By.id('first-name')).sendKeys('user')
    await driver.findElement(By.id('last-name')).sendKeys('user')
    await driver.findElement(By.id('postal-code')).sendKeys('12345')
    await driver.findElement(By.css('.cart_button')).click()
    await driver.findElement(By.css('.cart_button')).click()
    //Logout
    await driver.findElement(By.css('.bm-burger-button')).click() 
    const logout = await driver.findElement(By.id('logout_sidebar_link'))
    await driver.wait(until.elementIsVisible(logout), 3000)
	await logout.click()
}
main()