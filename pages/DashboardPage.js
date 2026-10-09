// pages/DashboardPage.js
// Page object for the SecureBank dashboard shown after login.
class DashboardPage {
  constructor(page) {
    this.page = page;

    this.dashboardContainer = page.getByTestId('bank-dashboard-page');
    this.welcomeMessage = page.getByTestId('dashboard-welcome-message');
    this.userInfo = page.getByTestId('sidebar-user-info');
    this.statCards = page.getByTestId('dashboard-stat-cards');
    this.accountSummaryCards = this.statCards.getByTestId('stat-card');
    this.quickActions = page.getByTestId('quick-actions-section');
    this.recentTransactions = page.getByTestId('recent-transactions-section');
    this.logoutButton = page.getByTestId('topbar-logout-btn');

    // Only alerts that actually contain text (the page also has an empty alert region)
    this.errorMessage = page.getByRole('alert').filter({ hasText: /\S/ });
  }
}

module.exports = { DashboardPage };
