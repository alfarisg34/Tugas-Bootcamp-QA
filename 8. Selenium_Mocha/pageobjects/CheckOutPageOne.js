const { By } = require('selenium-webdriver')
const Page = require('./Page')

class CheckOutPageOne extends Page {
	// initialization
	constructor (driver) {
		super(driver)
	}

	// element locators
	firstNameEl = By.css('#first-name')
	lastNameEl = By.css('#last-name')
	ZipEl = By.css('#postal-code')
	continueButtonEl = By.css('.btn_primary')

	// page action
	async openPage () {
		await this.openUrl('/checkout-step-one.html')
	}
	/**
	 * fungsi ini digunakan untuk melakukan login
	 * @param {string} firstName
	 * @param {string} lastName
	 * @param {string} zipCode
	 */
	async checkOutProcess (firstName, lastName , zipCode) {
		await this.driver.findElement(this.firstNameEl).sendKeys(firstName)
		await this.driver.findElement(this.lastNameEl).sendKeys(lastName)
		await this.driver.findElement(this.ZipEl).sendKeys(zipCode)
		await this.driver.findElement(this.continueButtonEl).click()
	}
	// async getErrorMessage () {
	// 	return await this.driver.findElement(this.errorEl).getText()
	// }
}

module.exports = CheckOutPageOne