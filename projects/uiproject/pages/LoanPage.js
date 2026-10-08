const { BasePage } = require('./BasePage');

class LoanPage extends BasePage {
  constructor(page) {
    super(page);

    this.loanHeader = page.locator('div[data-testid="apply-loan-page"]');

    this.amountInput = page.locator('input[name="amount"]');
    this.downPaymentInput = page.locator('input[name="downPayment"]');
    this.fromAccountSelect = page.locator('select[name="fromAccountId"]');
    this.applyButton = page.getByRole('button', { name: /apply/i });
  }

  async openFromDashboard() {
    await this.page.locator('[data-testid="sidebar-link-apply-loan"]').click();
  }

  async waitForLoaded() {
    await this.page.waitForLoadState('networkidle');
    await this.loanHeader.waitFor({ state: 'visible' });
  }

}

module.exports = { LoanPage };
