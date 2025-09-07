import { BASE_URL } from './../utils/utils';
import { test, expect } from "@playwright/test";

// const BASE_URL =
//   "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";

// //test.describe: tạo ra 1 group các test
// test.describe("Test function login", () => {
//   //chứa các test case ở đây
//   //test case 1: login thành công
//   test("Login thành công với Admin", async ({ page }) => {
//     //1. đi tới trang login
//     await page.goto(BASE_URL); //bỏ url trang web vô

//     //2. nhập username; .fill: nhập dữ liệu vào ô input
//     await page.getByPlaceholder("Username").fill("Admin");

//     //3. nhập password
//     await page.getByPlaceholder("Password").fill("admin123");

//     //4. click vào button login
//     await page.getByRole("button", { name: "Login" }).click();

//     //5. verify login thành công
//     await expect(page.locator("h6")).toHaveText("Dashboard");
//   });

//   //test case 2: login thất bại
//   test("Login thất bại với mật khẩu sai", async ({ page }) => {
//     //1. đi tới trang login
//     await page.goto(BASE_URL);
//     //2. nhập username đúng
//     await page.getByPlaceholder("Username").fill("Admin");

//     //3. nhập password sai
//     await page.getByPlaceholder("Password").fill("admin1234");

//     //4. click vào button login
//     await page.getByRole("button", { name: "Login" }).click();

//     //5. verify thất bại
//     await expect(page.locator(".oxd-alert-content-text")).toHaveText(
//       "Invalid credentials"
//     );
//   });

//   //test case 3: login thất bại với trường hợp username và password trống
//   test("Login với trường hợp username và password trống", async ({ page }) => {
//     await page.goto(BASE_URL);

//     await page.getByRole("button", { name: "Login" }).click();

//     //xác định xem require đã hiển thị ra chưa
//     //nth: lấy phần tử thứ n dựa vào index
//     await expect(page.getByText("Required").first()).toBeVisible();
//     await expect(page.getByText("Required").nth(1)).toBeVisible();
//   });

//   //test case 4: login thành công -> sau đó đăng xuất khỏi hệ thống
//   test("title", async ({page})=>{
//     //1. login thành công
//     page.goto(BASE_URL);
//     await page.getByPlaceholder("Username").fill("Admin");
//     await page.getByPlaceholder("Password").fill("admin123");
//     await page.getByRole("button", { name: "Login" }).click();
//     await expect(page.locator("h6")).toHaveText("Dashboard");

//     //2. click vào locator của avatar
//     // cách 1: await page.locator(".oxd-userdropdown-tab").click();
//     await page.getByAltText("profile picture").first().click(); //cách 2
//     //3. click vào locator của "Logout"
//     await page.getByRole("menuitem", {name: "Logout"}).click()

//     //4 verify logout thành công -> kiểm tra xem nút login đã hiển thị ra chưa
//     await expect(page.getByRole("button", {name: "Login"})).toBeVisible();
//   })
// });
import { LoginPage } from "../pages/LoginPage";
test.describe("Test function login", () => {
  //khai báo biến loginPage (global)
  let loginPage: LoginPage;

  //beforeEach: chạy trước mỗi test case
  test.beforeEach(async ({ page }) => {
    // 1. khởi tạo LoginPage
    loginPage = new LoginPage(page);

    //2. đi tới trang login
    await loginPage.goToPage();
  });

  //test case 1: login thành công
  test("Login thành công", async ({ page }) => {
    //3. nhập username và password
    await loginPage.login(); // -> login thành công
    // await loginPage.login("Admin", "admin12345") -> login thất bại

    //4. verify login thành công
    await expect(page.locator("h6")).toHaveText("Dashboard");
  });

  //test case 2: login thất bại với mật khẩu sai
  test("Login thất bại với mật khẩu sai", async () => {
    //3. nhập username và password
    await loginPage.login("Admin", "admin1234");

    //4. verify thất bại
    //await: chờ có kết quả trả về trước rồi mới thực hiện tiếp
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain("Invalid credentials");
  });
  //test case 3: login thất bại với trường hợp username và password trống
});
