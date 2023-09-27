const { By, WebDriver } = require('selenium-webdriver')
const Page = require('./Page')

class InventoryPage extends Page {
	// initialization
	constructor(driver) {
		super(driver)
	}

	pageTitleEl = By.css('.product_label')
	pictureEl = By.css('.inventory_item_img')
	addToCartButton = By.css('.btn_primary')

	async openPage() {
		await this.openUrl('/inventory.html')
	}
	async getPageTitle () {
		return await this.driver.findElement(this.pageTitleEl).getText()
	}
	async getPicture () {
		return await this.driver.findElement(this.pictureEl).getAttribute('src')
	}
	async getAddToCartButton () {
		return await this.driver.findElement(this.addToCartButton)
	}
}

module.exports = InventoryPage