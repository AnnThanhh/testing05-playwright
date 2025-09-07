import { Page, Locator } from "@playwright/test";
import { BASE_URL, USERNAME, PASSWORD } from "../utils/utils";

export class LoginPage {
  //thuộc tính LoginPage
  //readonly: chỉ đọc các giá trị của thuộc tính và không thể thay đổi giá trị của thuộc tính
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  //constructor
  constructor(page: Page) {
    this.page = page;
    this.username = page.getByPlaceholder("Username");
    this.password = page.getByPlaceholder("Password");
    this.loginButton = page.getByRole("button", { name: "Login" });
    //chấp nhận 1 trong 2 locator để xác định error message
    this.errorMessage =
      page.locator(".oxd-alert-content-text") || page.getByText("Required");
  }

  //phương thức LoginPage
  async goToPage() {
    await this.page.goto(BASE_URL || "");
  }
  //default parameter: là tham số mặc định của hàm, nếu mà người dùng k truyền dữ liệu vào tham số thì hàm sẽ sử dụng giá trị mặc định
  async login(username: string = USERNAME, password: string = PASSWORD) {
    //nhập username
    await this.username.fill(username);
    //nhập password
    await this.password.fill(password);
    //click vào button login
    await this.loginButton.click();
  }

  //lấy text từ thông báo lỗi
  //promise: việc xử lý async await sẽ trả về giá trị là promise -> dùng promise để quy định kiểu dữ liệu trả về
  async getErrorMessage(): Promise<string | null> {
    return await this.errorMessage.textContent();
  }
}
