// pages/LoginPage.js
const { BasePage } = require('./BasePage');

//Page object for the SecureBank login page
class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = page.getByTestId('login-username-input');
    this.passwordInput = page.getByTestId('login-password-input');
    this.loginButton = page.getByTestId('login-submit-btn');
    this.forgotLoginLink = page.getByTestId('forgot-password-link');
  }

  //Opens the login page;login is appended to baseURL from the config
  async goto() {
    await this.page.goto('login');
  }

  //Signs in; empty string is used if a value is missing
  async login(username, password) {
    await this.usernameInput.fill(username ?? '');
    await this.passwordInput.fill(password ?? '');
    await this.loginButton.click();
  }
}

module.exports = { LoginPage };