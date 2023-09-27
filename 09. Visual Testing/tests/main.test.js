const { existsSync, writeFileSync, readFileSync } = require('fs')
const setupDriver = require('../utils/setupDriver')
const chai = require('chai')
const { chaiImage } = require('chai-image')

chai.use(chaiImage)
const { expect } = chai

async function visualTesting (PAGE_NAME, PAGE_URL) {

	const driver = await setupDriver()
	await driver.get(PAGE_URL)

	const baseScreenshotPath = `screenshots/base/${PAGE_NAME}.jpg`
	const actualScreenshotPath = `screenshots/actual/${PAGE_NAME}.jpg`
	const isBaseScreenshotExist = existsSync(baseScreenshotPath)

	const pageScreenshot = await driver.takeScreenshot()
	const pageScreenshotBuffer = Buffer.from(pageScreenshot, 'base64')

	if (isBaseScreenshotExist) {
		const baseScreenshotBuffer = readFileSync(baseScreenshotPath)

		writeFileSync(actualScreenshotPath, pageScreenshotBuffer)
		expect(pageScreenshotBuffer).to.matchImage(baseScreenshotBuffer)
	} else {
		writeFileSync(baseScreenshotPath, pageScreenshotBuffer)
	}

	await driver.close()
}

describe('Visual Testing' , function(){
	it('Visual Testing Halaman Flashsale Tokopedia' , async function(){
		await visualTesting('flashsale', 'https://www.tokopedia.com/help/article/syarat-dan-ketentuan-flash-sale-kejar-diskon-spesial-99')
		await visualTesting('flashsale', 'https://www.tokopedia.com/help/article/syarat-dan-ketentuan-flash-sale-kejar-diskon-spesial-99')
	})
	it('Visual Testing Halaman Pusat Bantuan Shopee' , async function(){
		await visualTesting('portal', 'https://help.shopee.co.id/portal')
		await visualTesting('portal', 'https://help.shopee.co.id/portal')
	})
	it('Visual Testing Halaman Github' , async function(){
		await visualTesting('github', 'https://github.com/alfarisg34')
		await visualTesting('github', 'https://github.com/alfarisg34')
	})
	it('Visual Testing Halaman Stackoverflow' , async function(){
		await visualTesting('stackoverflow', 'https://stackoverflow.co/company/contact/')
		await visualTesting('stackoverflow', 'https://stackoverflow.co/company/contact/')
	})
	it('Visual Testing Halaman Hackerrrank' , async function(){
		await visualTesting('Hackerrrank', 'https://www.hackerrank.com/products/contact-us/')
		await visualTesting('Hackerrrank', 'https://www.hackerrank.com/products/contact-us/')
	})
})