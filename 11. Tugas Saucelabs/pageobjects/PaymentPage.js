const { remote } = require("webdriverio")
const Page = require("./Page")

class PaymentPage extends Page {
	// initialization
	constructor (driver) {
		super(driver)
	}

	// element locators
	get fullnameEl() { return this.driver.$('~Full Name* input field') }
	get expireEl() { return this.driver.$('~Expiration Date* input field') }
	get securityEl() { return this.driver.$('~Security Code* input field') }
	get cardNumberEl() { return this.driver.$('~Card Number* input field') }
	get reviewOrderButtonEl() { return this.driver.$('~Review Order button') }
	
	// page actions
	// async openPage () {
	// 	await this.loginNavbarButton.click()
	// }
	async fillPaymentForm(){
		await this.fullnameEl.setValue('Rebecca Winter')
		await this.cardNumberEl.setValue('325812657568789')
		await this.expireEl.setValue('03/25')
		await this.securityEl.setValue('123')
		await this.reviewOrderButtonEl.click()
	}
}

module.exports = PaymentPage