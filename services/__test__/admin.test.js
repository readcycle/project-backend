const request = require("supertest");
const app = require("../app");
const { Admin } = require("../models");

const admin1 = {
  email: "admin12@mail.com",
  password: "admin12",
};

// afterAll(async () => {
//   await Admin.destroy({ truncate: true, cascade: true, restartIdentity: true });
// });

describe.skip("API Admin", () => {
  describe("POST /admins/register", () => {
    test("Register success", async () => {
      const response = await request(app).post("/admins/register").send(admin1);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id", expect.any(Number));
      expect(response.body).toHaveProperty("email", expect.any(String));
    });

    test("Register failed because no email was included", async () => {
      const response = await request(app).post("/admins/register").send({
        password: admin1.password,
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Email is required");
    });

    test("Register failed because email is empty string", async () => {
      const response = await request(app).post("/admins/register").send({
        email: "",
        password: admin1.password,
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Email is required");
    });

    test("Register failed because invalid format email", async () => {
      const response = await request(app).post("/admins/register").send({
        email: "alpha@mailcom",
        password: admin1.password,
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Invalid format email");
    });

    test("Register failed because email already in use", async () => {
      const response = await request(app).post("/admins/register").send(admin1);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Email must be unique");
    });

    test("Register failed because no password was included", async () => {
      const response = await request(app).post("/admins/register").send({
        email: admin1.email,
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Password is required");
    });
  });

  describe("POST /admins/login", () => {
    test("Login success", async () => {
      const response = await request(app).post("/admins/login").send(admin1);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("access_token", expect.any(String));
      expect(response.body).toHaveProperty("email", expect.any(String));
    });

    test("Login failed because email not registered", async () => {
      const response = await request(app).post("/admins/login").send({
        email: "wrong@mail.com",
        password: admin1.password,
      });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty(
        "message",
        "Wrong email or password"
      );
    });

    test("Login failed because email is empty", async () => {
      const response = await request(app).post("/admins/login").send({
        email: "",
        password: admin1.password,
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Email is required");
    });

    test("Login failed because password is empty", async () => {
      const response = await request(app).post("/admins/login").send({
        email: "wrong@mail.com",
        password: "",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Password is required");
    });

    test("Login failed because password is not match", async () => {
      const response = await request(app).post("/admins/login").send({
        email: admin1.email,
        password: "wrong",
      });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty(
        "message",
        "Wrong email or password"
      );
    });
  });
});
