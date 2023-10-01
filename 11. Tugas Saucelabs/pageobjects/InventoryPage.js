const { remote } = require("webdriverio")
const Page = require("./Page")

class InventoryPage extends Page {
	// initialization
	constructor (driver) {
		super(driver)
	}

	// element locators
	get headerEl() { return this.driver.$('//android.view.ViewGroup[@content-desc="container header"]/android.widget.TextView') }
	get sortButtonEl() { return this.driver.$('~sort button') }
	get nameAsc() { return this.driver.$('~nameAsc') }
	get nameDesc() { return this.driver.$('~nameDesc') }
	get priceAsc() { return this.driver.$('~priceAsc') }
	get priceDesc() { return this.driver.$('~priceDesc') }
	get cartButtonEl() { return this.driver.$('~cart badge') }
	get menuButtonEl() { return this.driver.$('~open menu') }
	get catalogButtonEl() { return this.driver.$('~open menu') }
	get logoutButtonEl() { return this.driver.$('id=android:id/button1') }
	get itemName1El() { return this.driver
		.$('(//android.widget.TextView[@content-desc="store item text"])[1]') }
	get itemName2El() { return this.driver
		.$('(//android.widget.TextView[@content-desc="store item text"])[2]') }
	get itemName3El() { return this.driver
		.$('(//android.widget.TextView[@content-desc="store item text"])[3]') }
	get itemPrice1El() { return this.driver
		.$('(//android.widget.TextView[@content-desc="store item price"])[1]') }
	get itemPrice2El() { return this.driver
		.$('(//android.widget.TextView[@content-desc="store item price"])[2]') }
	
	async sortingProcess(sort){
		let itemOption
		await this.sortButtonEl.click()
		switch (sort){
			case "nameAsc":
				itemOption = await this.nameAsc
				await itemOption.waitForExist()
				await itemOption.click()
				break
			case "nameDesc":
				itemOption = await this.nameDesc
				await itemOption.waitForExist()
				await itemOption.click()
				break
			case "priceAsc":
				itemOption = await this.priceAsc
				await itemOption.waitForExist()
				await itemOption.click()
				break
			case "priceDesc":
				itemOption = await this.priceDesc
				await itemOption.waitForExist()
				await itemOption.click()
				break
		}
	}

	async toDetailItem(){
		await this.itemName1El.click()
	}
	async toCart(){
		await this.cartButtonEl.click()
	}
	async backToCatalog(){
		await this.menuButtonEl.click()
		await this.driver.pause(500)
		await this.menuButtonEl.click()
	}
	async logout(){
		await this.menuButtonEl.click()
		await this.driver.pause(500)
		await this.itemName3El.click()
		await this.driver.pause(500)
		await this.logoutButtonEl.click()
	}
	async getProductsText(){
		return await this.headerEl.getText()
	}
}

module.exports = InventoryPage