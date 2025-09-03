import { Locator, Page } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;
  readonly userDropdown: Locator;
  readonly logoutButton: Locator;
  readonly dashBoardTitle: Locator;
  readonly adminMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userDropdown = page.locator(".oxd-userdropdown-tab");
    this.logoutButton = page.getByRole("menuitem", { name: "Logout" });
    this.dashBoardTitle = page.locator("h6");
    this.adminMenu = page.getByRole("link", { name: "Admin" });
  }

  //kiểm tra xem có đang ở trang dashboard hay không
  async isAtDashboard() {
    return await this.dashBoardTitle.isVisible();
  }

  //logout khỏi hệ thống
  async logout() {
    await this.userDropdown.click();
    await this.logoutButton.click();
  }

  //click vào menu admin
  async clickAdminMenu() {
    await this.adminMenu.click();
  }
}
