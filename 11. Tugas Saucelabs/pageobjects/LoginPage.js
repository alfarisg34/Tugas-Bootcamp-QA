const { remote } = require("webdriverio")
const Page = require("./Page")

class LoginPage extends Page {
	// initialization
	constructor (driver) {
		super(driver)
	}

	// element locators
	get alertLogoutEl() { return this.driver.$('/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.TextView') }
	get okButtonEl() { return this.driver.$('/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.ScrollView/android.widget.LinearLayout/android.widget.Button') }
	get usernameEl() { return this.driver.$('~Username input field') }
	get passwordEl() { return this.driver.$('~Password input field') }
	get loginButtonEl() { return this.driver.$('~Login button') }
	get loginHeaderEl() { return this.driver.$('//android.view.ViewGroup[@content-desc="container header"]/android.widget.TextView') }
	
	// page actions
	async loginProcess () {
		await this.usernameEl.setValue('bob@example.com')
		await this.passwordEl.setValue('10203040')
		await this.loginButtonEl.click()
	}
	async getLoginHeaderText(){
		return await this.loginHeaderEl.getText()
	}
	async getAlertLogoutText(){
		return await this.alertLogoutEl.getText()
	}
	async clickOKButton(){
		await this.okButtonEl.click()
	}
}

module.exports = LoginPage