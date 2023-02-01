const request = require("supertest");
const app = require("../app");

describe("Check Users Routes", () => {
  describe("Route : /users", () => {
    it("Should able to get all listed books in database", async () => {
      const response = await request(app).get("/users");
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Success get all users");
    });
  });
  describe("Route : /users/:id", () => {
    it("Should able to get a listed book with certain id", async () => {
      const response = await request(app).get("/users/1");
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Success get user with id : 1");
    });
  });
});
