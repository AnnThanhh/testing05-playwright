import { test, expect } from "@playwright/test";
//test case 1: login thành công
test("Login thành công với Admin", async ({ page }) => {
  //1. đi tới trang login
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  ); //bỏ url trang web vô

  //2. nhập username; .fill: nhập dữ liệu vào ô input
  await page.getByPlaceholder("Username").fill("Admin");

  //3. nhập password
  await page.getByPlaceholder("Password").fill("admin123");

  //4. click vào button login
  await page.getByRole("button", { name: "Login" }).click();

  //5. verify login thành công
  await expect(page.locator("h6")).toHaveText("Dashboard");
});
