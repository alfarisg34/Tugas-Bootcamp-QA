const { expect } = require('chai')
const setupDriver = require('../utils/setupDriver')
const DetailPage = require('../pageobjects/DetailPage')
const InventoryPage = require('../pageobjects/InventoryPage')
const CartPage = require('../pageobjects/CartPage')

describe('Cart Page Test', function () {
	/** @type {WebdriverIO.Browser} */ let driver
    /** @type {InventoryPage} */ let inventoryPage
    /** @type {DetailPage} */ let detailPage
    /** @type {CartPage} */ let cartPage

	before(async function () {
		driver = await setupDriver()
        inventoryPage = new InventoryPage(driver)
        detailPage = new DetailPage(driver)
        cartPage = new CartPage(driver)
	})

	beforeEach(async function(){
		
	})

	it('Coba ke halaman cart tanpa item', async function () {
		await inventoryPage.toCart()
        const massage = await cartPage.getOhNo()

		expect(massage).to.equal("Oh no! Your cart is empty. Fill it up with swag to complete your purchase.")
        await inventoryPage.backToCatalog()
	})
    it('Coba ke halaman cart setelah tambah item', async function () {
		await inventoryPage.toDetailItem()
        await driver.pause(500)
        await detailPage.addCartProcess("red")
        await driver.pause(500)
        await inventoryPage.toCart()
        await driver.pause(500)
        const massage = await (await cartPage.totalPriceEl).getText()

		expect(massage).to.include("$")
	})
    it('Coba tambah jumlah barang', async function () {
		const count1 = await cartPage.getCounterText()
		await cartPage.plusButtonEl.click()
		await driver.pause(500)
		const count2 = await cartPage.getCounterText()

		expect(count1).to.satisfy(num => num < count2)
	})
	it('Coba kurang jumlah barang', async function () {
		const count1 = await cartPage.getCounterText()
		await cartPage.minusButtonEl.click()
		await driver.pause(500)
		const count2 = await cartPage.getCounterText()

		expect(count1).to.satisfy(num => num > count2)
	})
    it('Coba tombol remove item', async function () {
        await cartPage.removeItemButtonEl.click()
        await driver.pause(500)
        const massage = await cartPage.getOhNo()

		expect(massage).to.equal("Oh no! Your cart is empty. Fill it up with swag to complete your purchase.")
	})
	

	afterEach(async function(){
		// await inventoryPage.backToCatalog()
	})

	after(async function () {
		await driver.pause(2000)
		await driver.deleteSession()
	})
})