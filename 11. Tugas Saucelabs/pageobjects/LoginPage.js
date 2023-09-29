const { remote } = require("webdriverio")
const Page = require("./Page")

class LoginPage extends Page {
	// initialization
	constructor (driver) {
		super(driver)
	}

	// element locators
	get usernameEl() { return this.driver.$('~Username input field') }
	get passwordEl() { return this.driver.$('~Password input field') }
	get loginButtonEl() { return this.driver.$('~Login button') }
	
	// page actions
	async loginProcess () {
		await this.usernameEl.setValue('bob@example.com')
		await this.passwordEl.setValue('10203040')
		await this.loginButtonEl.click()
	}
}

module.exports = LoginPage