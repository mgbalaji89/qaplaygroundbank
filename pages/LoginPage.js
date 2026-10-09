// pages/LoginPage.js
// Page object for the SecureBank login page.
class LoginPage {
  constructor(page) {
    this.page = page;

    // Locators (all selectors live here, not in the test)
    this.pageTitle = page.getByTestId('login-page-title');
    this.usernameInput = page.getByTestId('login-username-input');
    this.passwordInput = page.getByTestId('login-password-input');
    this.signInButton = page.getByTestId('login-submit-btn');
  }

  // Open the login page
  async open() {
    await this.page.goto('https://qaplayground.com/bank/login');
  }

  // Type username and password, then click Sign In
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }
}

module.exports = { LoginPage };
