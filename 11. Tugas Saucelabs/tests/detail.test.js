const { expect } = require('chai')
const setupDriver = require('../utils/setupDriver')
const DetailPage = require('../pageobjects/DetailPage')
const InventoryPage = require('../pageobjects/InventoryPage')

describe('Detail Page Test', function () {
	/** @type {WebdriverIO.Browser} */ let driver
    /** @type {InventoryPage} */ let inventoryPage
    /** @type {DetailPage} */ let detailPage

	before(async function () {
		driver = await setupDriver()
        inventoryPage = new InventoryPage(driver)
        detailPage = new DetailPage(driver)
	})

	beforeEach(async function(){
		await inventoryPage.toDetailItem()
	})

	it('Coba ke halaman detail', async function () {
		await driver.pause(500)
		await driver.touchPerform([
			{ action: "press", options: { x: 329, y: 869 } },
			{ action: "wait", options: { ms: 500 } },
			{ action: "moveTo", options: { x: 344, y: 204 } },
			{ action: "release" },
		]);
		const massage = await detailPage.getProductHighlight()

		expect(massage).to.equal("Product Highlights")
	})
	it('Coba tambah jumlah barang', async function () {
		await driver.pause(500)
		await driver.touchPerform([
			{ action: "press", options: { x: 329, y: 869 } },
			{ action: "wait", options: { ms: 500 } },
			{ action: "moveTo", options: { x: 344, y: 204 } },
			{ action: "release" },
		]);
		const count1 = await detailPage.getCounterText()
		await detailPage.plusButtonEl.click()
		await driver.pause(500)
		const count2 = await detailPage.getCounterText()

		expect(count1).to.satisfy(num => num < count2)
	})
	it('Coba kurang jumlah barang', async function () {
		await driver.pause(500)
		await driver.touchPerform([
			{ action: "press", options: { x: 329, y: 869 } },
			{ action: "wait", options: { ms: 500 } },
			{ action: "moveTo", options: { x: 344, y: 204 } },
			{ action: "release" },
		]);
		const count1 = await detailPage.getCounterText()
		await detailPage.minusButtonEl.click()
		await driver.pause(500)
		const count2 = await detailPage.getCounterText()

		expect(count1).to.satisfy(num => num > count2)
	})
	it('Coba Add to Cart', async function () {
		await driver.pause(500)
		await driver.touchPerform([
			{ action: "press", options: { x: 329, y: 869 } },
			{ action: "wait", options: { ms: 500 } },
			{ action: "moveTo", options: { x: 344, y: 204 } },
			{ action: "release" },
		]);
		await detailPage.addCartProcess("red")
		await driver.pause(500)
		const totalItem = await detailPage.getNumberOnCart()
		expect(parseInt(totalItem)).to.equal(1)
	})
	it('Coba memberi rating produk', async function () {
		await driver.pause(500)
		await driver.touchPerform([
			{ action: "press", options: { x: 329, y: 869 } },
			{ action: "wait", options: { ms: 500 } },
			{ action: "moveTo", options: { x: 344, y: 204 } },
			{ action: "release" },
		]);
		await detailPage.fourStarRatingButtonEl.click()
		await driver.pause(1000)
		const massage = await detailPage.getMassage()
		expect(massage).to.equal("Thank you for submitting your review!")
		await detailPage.closeModalButtonEl.click()
		await driver.pause(500)
	})
	it('Coba ubah-ubah warna', async function () {
		await driver.pause(500)
		await driver.touchPerform([
			{ action: "press", options: { x: 329, y: 869 } },
			{ action: "wait", options: { ms: 500 } },
			{ action: "moveTo", options: { x: 344, y: 204 } },
			{ action: "release" },
		]);
		await detailPage.blueButtonEl.click()
		await driver.pause(1000)
		await detailPage.grayButtonEl.click()
		await driver.pause(1000)
		await detailPage.redButtonEl.click()
		await driver.pause(1000)
		await detailPage.blackButtonEl.click()
		await driver.pause(1000)
	})

	afterEach(async function(){
		await inventoryPage.backToCatalog()
	})

	after(async function () {
		await driver.pause(2000)
		await driver.deleteSession()
	})
})