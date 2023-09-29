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

describe('Check out barang dari awal sampai akhir Test', function () {
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

	it('Coba pindah ke halaman detail barang', async function () {
		await inventoryPage.toDetailItem()
	})

	it('Coba tambah barang ke cart', async function () {
		await detailPage.addCartProcess("red")
	})

	it('Coba pindah ke halaman cart', async function () {
        await driver.pause(2000)
		await inventoryPage.toCart()
	})
	it('Coba proceed to checkout', async function () {
        await driver.pause(2000)
		await cartPage.clickProceedButton()
	})
	it('Coba login', async function () {
        await driver.pause(2000)
		await loginPage.loginProcess()
	})
	it('Coba isi data checkout', async function () {
        await driver.pause(2000)
		await checkoutPage.fillCheckoutForm()
	})
	it('Coba isi data payment', async function () {
        await driver.pause(2000)
		await paymentPage.fillPaymentForm()
	})
	it('Coba place order', async function () {
        await driver.pause(2000)
		await confirmPage.placeOrderButtonEl.click()
	})
    
	after(async function () {
		await driver.pause(2000)
		await driver.deleteSession()
	})
})