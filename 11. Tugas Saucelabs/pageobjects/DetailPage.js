const { remote } = require("webdriverio")
const Page = require("./Page")

class DetailPage extends Page {
	// initialization
	constructor (driver) {
		super(driver)
	}

	// element locators
	get blackButtonEl() { return this.driver.$('//android.view.ViewGroup[@content-desc="black circle"]/android.view.ViewGroup') }
	get blueButtonEl() { return this.driver.$('//android.view.ViewGroup[@content-desc="blue circle"]/android.view.ViewGroup') }
	get grayButtonEl() { return this.driver.$('//android.view.ViewGroup[@content-desc="gray circle"]/android.view.ViewGroup') }
	get redButtonEl() { return this.driver.$('//android.view.ViewGroup[@content-desc="red circle"]/android.view.ViewGroup') }
	get minusButtonEl() { return this.driver.$('//android.view.ViewGroup[@content-desc="counter minus button"]/android.widget.ImageView') }
	get plusButtonEl() { return this.driver.$('//android.view.ViewGroup[@content-desc="counter plus button"]/android.widget.ImageView') }
	get addToCartButtonEl() { return this.driver.$('~Add To Cart button') }
	get countEl() { return this.driver.$('//android.view.ViewGroup[@content-desc="counter amount"]/android.widget.TextView') }
	get numberOnCartEl() { return this.driver.$('//android.view.ViewGroup[@content-desc="cart badge"]/android.widget.TextView') }
	get fourStarRatingButtonEl() { return this.driver.$('//android.view.ViewGroup[@content-desc="review star 4"]/android.widget.TextView') }
	get closeModalButtonEl() { return this.driver.$('~Close Modal button') }
	get thankYouMassage() { return this.driver.$('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.TextView') }
	get productHighlightEl() { return this.driver.$('//android.widget.ScrollView[@content-desc="product screen"]/android.view.ViewGroup/android.widget.TextView[2]') }
	
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
			case "gray":
				await this.grayButtonEl.click()
				await this.addToCartButtonEl.click()
				break
			case "red":
				await this.redButtonEl.click()
				await this.addToCartButtonEl.click()
				break
		}
	}

	async getCounterText(){
		return await this.countEl.getText()
	}
	async getNumberOnCart(){
		return await this.numberOnCartEl.getText()
	}
	async getMassage(){
		return await this.thankYouMassage.getText()
	}
	async getProductHighlight(){
		return await this.productHighlightEl.getText()
	}
}

module.exports = DetailPage