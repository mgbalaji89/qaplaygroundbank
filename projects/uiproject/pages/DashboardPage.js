const { BasePage } = require('./BasePage');

// Page object for the SecureBank dashboard (/bank/dashboard)
class DashboardPage extends BasePage {
    constructor(page) {
        super(page);
        // Locators use the app's data-testid attributes
        this.dashboardRoot = page.getByTestId('bank-dashboard-page');
        this.netWorthValue = page.getByTestId('stat-card-net-worth-value');
        // Sidebar links, used to move between Dashboard and Accounts
        this.dashboardLink = page.getByTestId('sidebar-link-dashboard');
        this.accountsLink = page.getByTestId('sidebar-link-accounts');
    }

    // Returns the Total Net Worth text as displayed, for example "$907.82"
    async getNetWorthText() {
        await this.netWorthValue.waitFor();
        return (await this.netWorthValue.innerText()).trim();
    }

    // Converts display text to a number: "-$342.18" becomes -342.18, "$1,250.00" becomes 1250
    static toNumber(text) {
        const negative = /-|\(/.test(text);
        const value = parseFloat(text.replace(/[^\d.]/g, ''));
        return negative ? -value : value;
    }

    // Builds the expected display text from a number, using the currency settings in bankData.json
    static formatCurrency(value, currency) {
        return new Intl.NumberFormat(currency.locale, {
            style: 'currency',
            currency: currency.code,
        }).format(value);
    }
}

module.exports = { DashboardPage };