import { Locator, Page, expect } from "@playwright/test";

export class AdminPage {
  //thuộc tính
  readonly page: Page;
  readonly adminPageTitle: Locator;
  readonly searchButton: Locator;
  //   readonly addButton: Locator;
  readonly employeeNameInput: Locator;
  readonly resultTable: Locator;

  constructor(page: Page) {
    this.page = page;
    //title của trang admin
    this.adminPageTitle = page.locator("h6").first();
    //button search
    this.searchButton = page.getByRole("button", { name: "Search" });
    // this.addButton = page.getByRole("button", { name: "Add" });
    //tìm kiếm theo employeeName
    this.employeeNameInput = page.getByPlaceholder("Type for hints...");
    //kết quả của tìm kiếm
    this.resultTable = page.getByRole("table");
  }

  //phương thức
  //kiểm tra xem có đang ở đúng trang admin hay không
  //isVisible: sẽ không có cơ chế wait -> nó sẽ check ngay lập tức tại thời điểm gọi hàm
  //assert trong playwright: kiểm tra kết quả mong đợi khi chạy test, lúc nào cũng sẽ có cơ chế wait -> nó sẽ check sau khi có kết quả trả về -> expect(locator).phương_thức()
  async isAtAdminPage() {
    await expect(this.adminPageTitle).toBeVisible();
  }

  //nhập employeename vào input và search
  async searchEmployeeName(name: string) {
    await this.employeeNameInput.fill(name);
    await this.searchButton.click();
  }

  //kiểm tra kết quả tìm kiếm
  async isSearchResultDisplayed(name: string): Promise<boolean> {
    return await this.resultTable.getByText(name).isVisible();
  }
}
