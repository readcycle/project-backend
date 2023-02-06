const request = require("supertest");
const app = require("../app");

describe.skip("Arrive in landing page", () => {
  describe("Root endpoint", () => {
    it("Should able to recieve root endpoint", async () => {
      const response = await request(app).get("/");
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("ok");
    });
  });
});

describe.skip("Check Books Routes", () => {
  describe("Route : /books", () => {
    it("Should able to get all listed books in database", async () => {
      const response = await request(app).get("/books");
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Success get all books");
    });
  });
  describe("Route : /books/:bookId", () => {
    it("Should able to get a listed book with certain id", async () => {
      const response = await request(app).get("/books/1");
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Success get book with id : 1");
    });
  });
});
