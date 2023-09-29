const { expect } = require('chai')
const setupDriver = require('../utils/setupDriver')
const InventoryPage = require('../pageobjects/InventoryPage')

describe('Inventory Page Test', function () {
	/** @type {WebdriverIO.Browser} */ let driver
    /** @type {InventoryPage} */ let inventoryPage

	before(async function () {
		driver = await setupDriver()
        inventoryPage = new InventoryPage(driver)
	})

	it('Sort by price ascending', async function () {
        await inventoryPage.sortingProcess("priceAsc")

		const price1 = await driver.$('(//android.widget.TextView[@content-desc="store item price"])[1]').getText()
		const price2 = await driver.$('(//android.widget.TextView[@content-desc="store item price"])[2]').getText()

		expect(price1).to.satisfy(num => num < price2)
	})
	it('Sort by price descending', async function () {
        await inventoryPage.sortingProcess("priceDesc")

		const price1 = await driver.$('(//android.widget.TextView[@content-desc="store item price"])[1]').getText()
		const price2 = await driver.$('(//android.widget.TextView[@content-desc="store item price"])[2]').getText()

		expect(price1).to.satisfy(num => num > price2)
	})
    
	it('Sort by name ascending', async function () {
		await inventoryPage.sortingProcess("nameAsc")

		const name1 = await driver.$('(//android.widget.TextView[@content-desc="store item text"])[1]').getText()
		const name2 = await driver.$('(//android.widget.TextView[@content-desc="store item text"])[2]').getText()

		expect(name1).to.satisfy(x => x < name2)
	})
	it('Sort by name descending', async function () {
		await inventoryPage.sortingProcess("nameDesc")

		const name1 = await driver.$('(//android.widget.TextView[@content-desc="store item text"])[1]').getText()
		const name2 = await driver.$('(//android.widget.TextView[@content-desc="store item text"])[2]').getText()

		expect(name1).to.satisfy(x => x > name2)
	})

	after(async function () {
		await driver.pause(2000)
		await driver.deleteSession()
	})
})