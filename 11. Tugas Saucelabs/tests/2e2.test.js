const { expect } = require('chai')
const setupDriver = require('../utils/setupDriver')
const DetailPage = require('../pageobjects/DetailPage')
const InventoryPage = require('../pageobjects/InventoryPage')
const CartPage = require('../pageobjects/CartPage')
const CheckoutCompletePage = require('../pageobjects/CheckoutCompletePage')
const CheckoutPage = require('../pageobjects/CheckoutPage')
const ConfirmPage = require('../pageobjects/ConfirmPage')
const LoginPage = require('../pageobjects/LoginPage')
const PaymentPage = require('../pageobjects/PaymentPage')

describe.only('Check out barang dari awal sampai akhir Test', function () {
	/** @type {WebdriverIO.Browser} */ let driver
    /** @type {InventoryPage} */ let inventoryPage
    /** @type {DetailPage} */ let detailPage
    /** @type {CartPage} */ let cartPage
    /** @type {CheckoutCompletePage} */ let checkoutCompletePage
    /** @type {CheckoutPage} */ let checkoutPage
    /** @type {ConfirmPage} */ let confirmPage
    /** @type {LoginPage} */ let loginPage
    /** @type {PaymentPage} */ let paymentPage

	before(async function () {
		driver = await setupDriver()
        inventoryPage = new InventoryPage(driver)
        detailPage = new DetailPage(driver)
        cartPage = new CartPage(driver)
        checkoutCompletePage = new CheckoutCompletePage(driver)
        checkoutPage = new CheckoutPage(driver)
        confirmPage = new ConfirmPage(driver)
        loginPage = new LoginPage(driver)
        paymentPage = new PaymentPage(driver)
	})

	it('Coba ke halaman utama aplikasi', async function () {
		const massage = await inventoryPage.getProductsText()
		expect(massage).to.equal("Products")
	})

	it('Coba pindah ke halaman detail barang', async function () {
		await inventoryPage.toDetailItem()
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

	it('Coba tambah barang ke cart', async function () {
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

	it('Coba pindah ke halaman cart', async function () {
        await driver.pause(2000)
		await inventoryPage.toCart()
		await driver.pause(500)
		const massage = await (await cartPage.totalPriceEl).getText()

		expect(massage).to.include("$")
	})
	it('Coba proceed to checkout', async function () {
        await driver.pause(2000)
		await cartPage.clickProceedButton()
		await driver.pause(500)

		const massage = await loginPage.getLoginHeaderText()
		expect(massage).to.equal("Login")
	})
	it('Coba login', async function () {
        await driver.pause(2000)
		await loginPage.loginProcess()
		await driver.pause(500)

		const massage = await checkoutPage.getFullNameText()
		expect(massage).to.equal("Rebecca Winter")
	})
	it('Coba isi data checkout', async function () {
        await driver.pause(2000)
		await checkoutPage.fillCheckoutForm()

		const massage = await paymentPage.getEnterAPaymentMethodText()
		expect(massage).to.equal("Enter a payment method")
	})
	it('Coba isi data payment', async function () {
        await driver.pause(2000)
		await paymentPage.fillPaymentForm()

		const massage = await confirmPage.getReviewYourOrderText()
		expect(massage).to.equal("Review your order")
	})
	it('Coba place order', async function () {
        await driver.pause(2000)
		await confirmPage.placeOrderButtonEl.click()

		const massage = await checkoutCompletePage.getCheckoutCompleteText()
		expect(massage).to.equal("Checkout Complete")
	})
	it('Coba Logout', async function () {
        await driver.pause(2000)
		await inventoryPage.backToCatalog()
		await driver.pause(500)
		await inventoryPage.logout()

		const massage = await loginPage.getAlertLogoutText()
		expect(massage).to.equal("You are successfully logged out.")
		await loginPage.clickOKButton()
	})
    
	after(async function () {
		await driver.pause(2000)
		await driver.deleteSession()
	})
})