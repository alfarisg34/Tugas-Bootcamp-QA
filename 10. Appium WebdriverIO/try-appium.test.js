const { expect } = require('chai')
const { remote } = require('webdriverio')

const options = {
    hostname:'0.0.0.0',
    port: 4723,
    logLevel:'debug',
    capabilities:{
        'platformName': 'Android',
		'appium:automationName': 'UIAutomator2',
		'appium:deviceName': 'emulator-5554',
		'appium:app': 'D:/Kerja/PT. Pro Sigmaka Mandiri/QA/Coding/tugas/10. Appium WebdriverIO/apk/dummy.apk',
		'appium:appActivity': '.MainActivity'
    }
}

async function run (email, password) {
    const driver = await remote (options)
    await driver.$('~Login').click()
    await driver.$('~input-email').setValue(email)
    await driver.$('~input-password').setValue(password)
    await driver.$('~button-LOGIN').click()
    const alertTitle = await driver.$('~android:id/alertTitle').getText()
    console.log(alertTitle)
    const errorMassageEmail = await driver.$('//android.widget.ScrollView[@content-desc="Login-screen"]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[4]/android.widget.TextView[1]').getText()
    const errorMassagePassword = await driver.$('//android.widget.ScrollView[@content-desc="Login-screen"]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[4]/android.widget.TextView[2]').getText()
    console.log(errorMassageEmail)
    console.log(errorMassagePassword)
    // await driver.$('~Forms').click()
    // await driver.pause(3000)
    // await driver.touchPerform([
	// 	{ action: 'press', options: { x: 317, y: 643 } },
	// 	{ action: 'wait', options: { ms: 500 } },
	// 	{ action: 'moveTo', options: { x: 317, y: 127 } },
	// 	{ action: 'release' },
	// ])
    await driver.pause(3000)
    await driver.deleteSession()
}

describe('Testing WebdriverIO Apps',function(){
    it('Login dengan input benar', async function(){
        await run ('alfari@test.com' , 'alfarisg34')
        const alertTitle = await driver.$('~android:id/alertTitle').getText()
        console.log(alertTitle)
        // expect(alertTitle).to.be.equal('Success')
    })
    it('Login dengan input salah', async function(){
        await run ('' , '')
        const errorMassageEmail = await driver.$('//android.widget.ScrollView[@content-desc="Login-screen"]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[4]/android.widget.TextView[1]').getText()
        const errorMassagePassword = await driver.$('//android.widget.ScrollView[@content-desc="Login-screen"]/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[4]/android.widget.TextView[2]').getText()
        console.log(errorMassageEmail)
        console.log(errorMassagePassword)
        // expect(errorMassageEmail).to.be.equal('Please enter a valid email address')
        // expect(errorMassagePassword).to.be.equal('Please enter at least 8 characters')
    })
})
// run()