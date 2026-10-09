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

  accountSummaryValue(card) {
    return card.locator('p').nth(1);
  }

  async isAccountSummaryValueDisplayedWithoutOverlap(value) {
    return value.evaluate(element => {
      const card = element.closest('[data-testid="stat-card"]');
      if (!card) {
        return false;
      }

      const valueRect = element.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const fitsCard =
        element.scrollWidth <= element.clientWidth &&
        element.scrollHeight <= element.clientHeight &&
        valueRect.left >= cardRect.left &&
        valueRect.right <= cardRect.right &&
        valueRect.top >= cardRect.top &&
        valueRect.bottom <= cardRect.bottom;

      const otherTextElements = Array.from(card.querySelectorAll('*')).filter(
        candidate =>
          candidate !== element &&
          !candidate.contains(element) &&
          !element.contains(candidate) &&
          Array.from(candidate.childNodes).some(
            node => node.nodeType === 3 && node.textContent.trim()
          )
      );
      const doesNotOverlapText = otherTextElements.every(candidate => {
        const otherRect = candidate.getBoundingClientRect();
        if (otherRect.width === 0 || otherRect.height === 0) {
          return true;
        }

        return (
          valueRect.right <= otherRect.left ||
          valueRect.left >= otherRect.right ||
          valueRect.bottom <= otherRect.top ||
          valueRect.top >= otherRect.bottom
        );
      });

      return fitsCard && doesNotOverlapText;
    });
  }
}

module.exports = { DashboardPage };
