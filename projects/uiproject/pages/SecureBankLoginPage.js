// Page object for the SecureBank login page.
class SecureBankLoginPage {
  constructor(page) {
    this.page = page;

    this.pageTitle = page.getByTestId('login-page-title');
    this.usernameInput = page.getByTestId('login-username-input');
    this.passwordInput = page.getByTestId('login-password-input');
    this.signInButton = page.getByTestId('login-submit-btn');
  }

  async open() {
    await this.page.goto('https://qaplayground.com/bank/login');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }
}

module.exports = { SecureBankLoginPage };
