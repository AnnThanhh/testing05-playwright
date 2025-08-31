// import { test, expect } from "@playwright/test";

// //test yêu cầu 2 tham số: 1: tên test, 2: function test (callback function)
// //bất đồng bộ -> xảy ra ở nodejs -> do nodejs hoạt động theo cơ chế bất đồng bộ -> code có thể chạy bất kỳ lúc nào -> async await

// //đại diện cho 1 test case
// //{}: bóc tách thuộc tính trong object 
// test("Demo Test", async ({page}) => {
//   // viết logic test ở đây
//   // ví dụ: đi vô trang web https://www.google.com, ngay lập tức đi tới những logic tiếp theo
//   // await..... -> đợi cho đến khi nào thực hiện xong thì mới chạy tiếp
//   // await... thực hiện logic tiếp theo -> chạy xong

//   //playwright locator
//   // css selector
//   // với phía selenium: ByID, ByName, ByClassName,.....
//   // với playwright: page.locator("css selector")
//   page.locator("#app"); //id
//   page.locator(".orangehrm-login-layout"); //class
//   page.locator("input[name='username']"); //attribute

//   //label selector: bắt input gắn với label, mô tả giống cách user thao tác
//   page.getByLabel("Username");
//   page.getByLabel("Password")

//   //role-based selector: là bắt theo thuộc tính role của element(button, link, textbox,...)
//   page.getByRole('button', {name: "Login"})

//   //alt-text selector: alt trong thẻ img 
//   page.getByAltText("company-branding");

//   //chained locator: bắt element con trong element cha => tránh chọn nhầm element
//   page.locator("#app").locator("#oxd-toaster_1");

// });