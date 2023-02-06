const request = require("supertest");
const app = require("../app");

describe("Check Users Routes", () => {
  describe("Route : GET /users", () => {
    it("Should able to get all listed books in database", async () => {
      const response = await request(app).get("/users");
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe("Route : GET /users/:id", () => {
    it("Should able to get a listed book with certain id", async () => {
      const response = await request(app).get("/users/1");
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("email", expect.any(String));
      expect(response.body).toHaveProperty("fullname", expect.any(String));
      expect(response.body).toHaveProperty("favoriteGenre", expect.any(String));
      expect(response.body).toHaveProperty("favoriteBook", expect.any(String));
      expect(response.body).toHaveProperty("city", expect.any(String));
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
      expect(response.body.message).toBe("Email is required");
    });

    it("Should not able to login with empty password field", async () => {
      const response = await request(app)
        .post("/users/login")
        .send({ email: "email" });

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Password is required");
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
