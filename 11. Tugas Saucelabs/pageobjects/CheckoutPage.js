const { remote } = require("webdriverio")
const Page = require("./Page")

class CheckoutPage extends Page {
	// initialization
	constructor (driver) {
		super(driver)
	}

	// element locators
	get checkoutHeaderEl() { return this.driver.$('~//android.view.ViewGroup[@content-desc="container header"]/android.widget.TextView') }
	get fullNameEl() { return this.driver.$('~Full Name* input field') }
	get addressLine1El() { return this.driver.$('~Address Line 1* input field') }
	get addressLine2El() { return this.driver.$('~Address Line 2 input field') }
	get cityEl() { return this.driver.$('~City* input field') }
	get stateEl() { return this.driver.$('~State/Region input field') }
	get zipEl() { return this.driver.$('~Zip Code* input field') }
	get countryEl() { return this.driver.$('~Country* input field') }
	get toPaymentButtonEl() { return this.driver.$('~To Payment button') }
	
	// page actions
	// async openPage () {
	// 	await this.loginNavbarButton.click()
	// }
	async fillCheckoutForm(){
		await this.fullNameEl.setValue('Rebecca Winter')
		await this.addressLine1El.setValue('Mandorley 112')
		await this.addressLine2El.setValue('Entrance 1')
		await this.cityEl.setValue('Truro')
		await this.stateEl.setValue('Cornwall')
		await this.driver.pause(500)
		await this.driver.touchPerform([
			{ action: "press", options: { x: 329, y: 869 } },
			{ action: "wait", options: { ms: 500 } },
			{ action: "moveTo", options: { x: 344, y: 204 } },
			{ action: "release" },
		]);
		await this.driver.pause(500)
		await this.zipEl.setValue('89750')
		await this.countryEl.setValue('UK')
		await this.toPaymentButtonEl.click()
	}
}

module.exports = CheckoutPage