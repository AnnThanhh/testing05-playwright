import { test, expect } from "@playwright/test";
const API_URL = "https://restful-booker.herokuapp.com";
test.describe.serial("Test API demo", () => {
  let token: string;
  let bookingId: string;
  //test case 1: Auth - CreateToken
  //request: là 1 object để gửi request tới server, object sẽ chứa các thông tin cần gửi về server
  test("Auth - CreateToken", async ({ request }) => {
    //1. gửi request tới server
    //template string: là 1 cách để nối các string với nhau để tạo ra string mới
    const response = await request.post(`${API_URL}/auth`, {
      data: {
        username: "admin",
        password: "password123",
      },
    });

    //2. kiểm tra kết quả
    expect(response.status()).toBe(200);

    //3. chuyển đổi dữ liệu response thành json
    const data = await response.json();

    //4. lấy token từ responseg
    expect(data.token).toBeTruthy();
    token = data.token;
  });

  //test case2: All Booking - GetBookingIds
  test("All Booking - GetBookingIds", async ({ request }) => {
    const response = await request.get(`${API_URL}/booking`);

    expect(response.status()).toBe(200);
  });

  //test case 3: Booking - CreateBooking
  test("Booking - CreateBooking", async ({ request }) => {
    const response = await request.post(`${API_URL}/booking`, {
      headers: {
        contentType: "application/json",
        accept: "application/json",
      },
      data: {
        firstname: "Jim",
        lastname: "Brown",
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
          checkin: "2018-01-01",
          checkout: "2019-01-01",
        },
        additionalneeds: "Breakfast",
      },
    });

    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.booking.firstname).toBe("Jim");
    bookingId = data.bookingid;
  });

  //test case 4: Booking - UpdateBooking
  test("Booking - UpdateBooking", async ({ request }) => {

    const response = await request.put(`${API_URL}/booking/${bookingId}`, {
      headers: {
        ContentType: "application/json",
        Accept: "application/json",
        Cookie: `token=${token}`,
        Authorisation: `Basic ${token}`,
      },
      data: {
        firstname: "AT",
        lastname: "Brown",
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
          checkin: "2018-01-01",
          checkout: "2019-01-01",
        },
        additionalneeds: "Breakfast",
      },
    });

    expect(response.status()).toBe(200);
  });
});
