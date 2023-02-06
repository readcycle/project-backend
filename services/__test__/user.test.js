const request = require("supertest");
const app = require("../app");

describe.skip("Check Users Routes", () => {
  describe("Route : GET /users", () => {
    it("Should able to get all listed books in database", async () => {
      const response = await request(app).get("/users");
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Success get all users");
    });
  });
  describe("Route : GET /users/:id", () => {
    it("Should able to get a listed book with certain id", async () => {
      const response = await request(app).get("/users/1");
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Success get user with id : 1");
    });
  });
  describe("Route : POST /users/register", () => {
    it("Should able to register properly", async () => {
      const response = await request(app).post("/users/register");
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("You successfully register");
    });
  });
  describe("Route : POST /users/login", () => {
    it("Should able to login properly", async () => {
      const response = await request(app)
        .post("/users/login")
        .send({ email: "email", password: "password" });
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("access_token");
      expect(response.body.access_token).toEqual(expect.any(String));
    });
    it("Should not able to login with empty email field", async () => {
      const response = await request(app)
        .post("/users/login")
        .send({ password: "password" });
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("email field cannot be empty");
    });
    it("Should not able to login with empty password field", async () => {
      const response = await request(app)
        .post("/users/login")
        .send({ email: "email" });
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("password field cannot be empty");
    });
  });
  describe("Route : PUT /users/:id", () => {
    it("Should able to edit user information", async () => {
      const response = await request(app).put("/users/1");
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe(
        "Success edit user profile with id : 1"
      );
    });
  });
  describe("Route : PATCH /users/:id", () => {
    it("Should able to update isBanned status of user", async () => {
      const response = await request(app).patch("/users/1");
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe(
        "Success update isBanned status of user with id : 1"
      );
    });
  });
});
