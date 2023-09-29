const { remote } = require("webdriverio")
const Page = require("./Page")

class ConfirmPage extends Page {
	// initialization
	constructor (driver) {
		super(driver)
	}

	// element locators
	get placeOrderButtonEl() { return this.driver.$('~Place Order button') }
	
	// page actions
	// async openPage () {
	// 	await this.loginNavbarButton.click()
	// }
	async addCartProcess(color){
		switch (color){
			case "black":
				await this.blackButtonEl.click()
				await this.addToCartButtonEl.click()
				break
			case "blue":
				await this.blueButtonEl.click()
				await this.addToCartButtonEl.click()
				break
			case "grey":
				await this.greyButtonEl.click()
				await this.addToCartButtonEl.click()
				break
			case "red":
				await this.redButtonEl.click()
				await this.addToCartButtonEl.click()
				break
		}
	}
}

module.exports = ConfirmPage