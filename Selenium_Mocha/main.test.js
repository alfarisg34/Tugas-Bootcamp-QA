const { WebDriver , until , By } = require('selenium-webdriver')
const { expect } = require('chai')
const setupDriver = require('./utils/setupDriver')
const LoginPage = require('./pageobjects/LoginPage')
const InventoryPage = require('./pageobjects/InventoryPage')
const CheckOutPageOne = require('./pageobjects/CheckOutPageOne')

describe('Testing web saucedemo', function () {
	describe('LoginPage' , function(){

		/** @type {WebDriver} */ let driver
		/** @type {LoginPage} */ let loginPage
		/** @type {InventoryPage} */ let inventoryPage
	
		before(async function () {
			driver = await setupDriver()
			loginPage = new LoginPage(driver)
			inventoryPage = new InventoryPage(driver)
		})
		
		it('Coba login dengan username dan password benar', async function () {
			await loginPage.openPage()
			await loginPage.loginProcess('standard_user', 'secret_sauce')
	
			const productTitle = await inventoryPage.getPageTitle()
			expect(productTitle).to.be.equal('Products')
		})
	
		it('Coba login dengan username kosong dan password kosong', async function () {
			await loginPage.openPage()
			await loginPage.loginProcess('', '')
	
			const errorMessage = await loginPage.getErrorMessage()
			expect(errorMessage).to.include('Username is required')
		})
		
		it('Coba login dengan username benar dan password salah', async function () {
			await loginPage.openPage()
			await loginPage.loginProcess('standard_user', '12345')
	
			const errorMessage = await loginPage.getErrorMessage()
			expect(errorMessage).to.include('Username and password do not match any use')
		})
		
		it('Coba login dengan username salah dan password benar', async function () {
			await loginPage.openPage()
			await loginPage.loginProcess('standard_user', '12345')
	
			const errorMessage = await loginPage.getErrorMessage()
			expect(errorMessage).to.include('Username and password do not match any use')
		})
		
		it('Coba login dengan username salah dan password salah', async function () {
			await loginPage.openPage()
			await loginPage.loginProcess('12345', '12345')
	
			const errorMessage = await loginPage.getErrorMessage()
			expect(errorMessage).to.include('Username and password do not match any use')
		})
		
		it('Coba login dengan Lockout User', async function () {
			await loginPage.openPage()
			await loginPage.loginProcess('locked_out_user', 'secret_sauce')
	
			const errorMessage = await loginPage.getErrorMessage()
			expect(errorMessage).to.include('Sorry, this user has been locked out')
		})
		
		it('Coba login dengan Problem User', async function () {
			await loginPage.openPage()
			await loginPage.loginProcess('problem_user', 'secret_sauce')
	
			// const pictureURL = await inventoryPage.getPicture()
			// expect(pictureURL).to.be.include('WithGarbageOnItToBreakTheUrl')
			const productTitle = await inventoryPage.getPageTitle()
			expect(productTitle).to.be.equal('Products')
		})

		it('Coba login dengan Performance Glitch User', async function () {
			await loginPage.openPage()
			await loginPage.loginProcess('performance_glitch_user', 'secret_sauce')
	
			// const productTitle = await inventoryPage.getPageTitle()
			// await driver.wait(until.elementIsVisible(productTitle), 10000)
			// expect(productTitle).to.be.equal('Products')
			const productTitle = await inventoryPage.getPageTitle()
			expect(productTitle).to.be.equal('Products')
		})

		// afterEach(async function () {
		// 	await driver.sleep(2000)
		// })
	
		after(async function () {
			await driver.close()
		})
	})
	describe('Inventory Page' , function(){

		/** @type {WebDriver} */ let driver
		/** @type {InventoryPage} */ let inventoryPage
	
		before(async function () {
			driver = await setupDriver()
			inventoryPage = new InventoryPage(driver)
		})
		
		it.skip('Coba menambahkan dua barang ke cart', async function () {
			await inventoryPage.openPage()
	
			await driver.findElement(By.css('.btn_primary')).click()
    		await driver.findElement(By.css('.btn_primary')).click()
			const count = await inventoryPage.getPageTitle()
			expect(count).to.be.equal(2)
		})

		// afterEach(async function () {
		// 	await driver.sleep(2000)
		// })
	
		after(async function () {
			await driver.close()
		})
	})
	describe('Checkout step one Page' , function(){

		/** @type {WebDriver} */ let driver
		/** @type {checkOutPageOne} */ let checkOutPageOne
	
		before(async function () {
			driver = await setupDriver()
			checkOutPageOne = new CheckOutPageOne(driver)
		})
		
		it('Coba isi form checkout', async function () {
			await checkOutPageOne.openPage()
			await checkOutPageOne.checkOutProcess('alfa','sidnan','1234')

			const checkOut = await driver.findElement(By.css('div[class="subheader"]')).getText()
			console.log(checkOut)
			expect(checkOut).to.be.equal("Checkout: Overview")
		})

		// afterEach(async function () {
		// 	await driver.sleep(2000)
		// })
	
		after(async function () {
			await driver.close()
		})
	})
})
