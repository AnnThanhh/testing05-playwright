import { AdminPage } from "../pages/AdminPage";
import { DashboardPage } from "../pages/Dashboard";
import { LoginPage } from "./../pages/LoginPage";
import { test, expect } from "@playwright/test";

test.describe("Test function admin", () => {
  let loginPage: LoginPage;
  let dashBoardPage: DashboardPage;
  let adminPage: AdminPage;

  //set up beforeEach
  test.beforeEach(async ({ page }) => {
    //1. khởi tạo các page
    loginPage = new LoginPage(page);
    dashBoardPage = new DashboardPage(page);
    adminPage = new AdminPage(page);

    //2. login thành công
    await loginPage.goToPage();
    await loginPage.login("Admin", "admin123");

    //3. đi vào trang admin
    await dashBoardPage.clickAdminMenu();
  });

  //test case 1: xác nhận xem có đúng trang admin hay không
  //tobeTruthy: kiểm tra xem giá trị trả về có phải là true hay không
  //tobeFalsy: kiểm tra xem giá trị trả về có phải là false hay không
  test("isAtAdminPage", async () => {
    await adminPage.isAtAdminPage();
    expect(adminPage.isAtAdminPage()).toBeTruthy();
    //expect(await adminPage.isAtAdminPage()).toBeTruthy();
  });

  //test case 2: tìm kiếm employeeName
  test("search employee name", async () => {
    await adminPage.searchEmployeeName("manda");
    await adminPage.isSearchResultDisplayed("manda");
    expect(adminPage.isSearchResultDisplayed("manda")).toBeTruthy();
    //expect(await adminPage.isSearchResultDisplayed("manda")).toBeTruthy();
  });
});
