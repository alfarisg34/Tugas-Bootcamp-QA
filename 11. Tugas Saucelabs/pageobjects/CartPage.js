const { remote } = require("webdriverio")
const Page = require("./Page")

class CartPage extends Page {
	// initialization
	constructor (driver) {
		super(driver)
	}

	// element locators
	get goShoopingButtonEl() { return this.driver.$('~Go Shopping button') }
	get proceedButtonEl() { return this.driver.$('~Proceed To Checkout button') }
	get proceedButtonText() { return this.driver.$('//android.view.ViewGroup[@content-desc="Proceed To Checkout button"]/android.widget.TextView') }
	get totalPriceEl() { return this.driver.$('~total price') }
	get totalItemEl() { return this.driver.$('~total number') }
	get noItemsHeaderEl() { return this.driver.$('//android.view.ViewGroup[@content-desc="container header"]/android.widget.TextView') }
	get myCartHeaderEl() { return this.driver.$('//android.view.ViewGroup[@content-desc="container header"]/android.widget.TextView') }
	get productRowEl() { return this.driver.$('~product row') }
	get removeItemButtonEl() { return this.driver.$('//android.view.ViewGroup[@content-desc="remove item"]/android.widget.TextView') }
	get plusButtonEl() { return this.driver.$('//android.view.ViewGroup[@content-desc="counter plus button"]/android.widget.ImageView') }
	get minusButtonEl() { return this.driver.$('//android.view.ViewGroup[@content-desc="counter minus button"]/android.widget.ImageView') }
	get counterEl() { return this.driver.$('//android.view.ViewGroup[@content-desc="counter amount"]/android.widget.TextView') }
	get massageOhNo() { return this.driver.$('//android.widget.ScrollView[@content-desc="cart screen"]/android.view.ViewGroup/android.widget.TextView') }
	
	// page actions
	async clickProceedButton () {
		await this.proceedButtonEl.click()
	}
	async getOhNo () {
		return await this.massageOhNo.getText()
	}
	async getProceedToCheckoutText () {
		return await this.proceedButtonText.getText()
	}
	async getCounterText(){
		return await this.counterEl.getText()
	}
}

module.exports = CartPage