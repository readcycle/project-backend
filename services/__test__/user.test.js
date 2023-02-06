const request = require("supertest");
const app = require("../app");
const { User } = require("../models");
const { tokenize } = require("../helper/jwtHandler");

const user1Seed = {
  fullname: "User Test 1",
  email: "userTest1@mail.com",
  password: "userTest1",
  phoneNumber: "888888",
  city: "Jakarta",
  favoriteGenre: "Philosophy",
  favoriteBook: "The Good Life",
};

const user2Seed = {
  fullname: "User Test 2",
  email: "userTest2@mail.com",
  password: "userTest2",
  phoneNumber: "888888",
  city: "Bandung",
  favoriteGenre: "Science",
  favoriteBook: "How Far The Light Reaches",
};

beforeAll(async () => {
  const user1 = await User.create(user1Seed);
  tokenUser1 = tokenize({ id: user1.id, email: user1.email });
  reporterId = user1.id;

  const user2 = await User.create(user2Seed);
  reportedId = user2.id;
});

// afterAll(async () => {
//   await User.destroy({ truncate: true, cascade: true, restartIdentity: true });
// });

describe("Check Users Routes", () => {
  describe("Route : GET /users", () => {
    it("Should able to get all listed users in database", async () => {
      const response = await request(app).get("/users");
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expect.any(Array));
      response.body.forEach((el) => {
        expect(el).toHaveProperty("id");
      });
    });

    it("Should able to get all nearest users in database", async () => {
      const response = await request(app).get(
        "/users?queryLoc=-6.241247906043303,106.84081593559185&distance=1000000"
      );
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expect.any(Array));
      response.body.forEach((el) => {
        expect(el).toHaveProperty("id");
      });
    });
  });

  describe("Route : GET /users/:id", () => {
    it("Should able to get a listed book with certain id", async () => {
      const response = await request(app).get("/users/1");
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("id");
      expect(response.body.id).toBe(1);
    });

    it("Should return not found when id is not in the database", async () => {
      const response = await request(app).get("/users/999999");
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual(expect.any(Object));
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Data not found");
    });
  });

  describe("Route : POST /users/register", () => {
    it("Should able to register properly", async () => {
      const response = await request(app).post("/users/register").send({
        fullname: "Jean G",
        email: "jeanny@gmail.com",
        password: "jean123",
        phoneNumber: "091233128821",
        city: "Jakarta",
        favoriteGenre: "Bussiness",
        favoriteBook: "Trade",
      });
      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual(expect.any(Object));
    });

    it("Should not create user when empty fullname", async () => {
      const response = await request(app).post("/users/register").send({
        email: "jeanny2@gmail.com",
        password: "jean123",
        phoneNumber: "091233128821",
        city: "Jakarta",
        favoriteGenre: "Bussiness",
        favoriteBook: "Trade",
      });
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Fullname cannot be null");
    });

    it("Should not create user when empty email", async () => {
      const response = await request(app).post("/users/register").send({
        fullname: "Jean G",
        password: "jean123",
        phoneNumber: "091233128821",
        city: "Jakarta",
        favoriteGenre: "Bussiness",
        favoriteBook: "Trade",
      });
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Email cannot be null");
    });

    it("Should not create user when empty password", async () => {
      const response = await request(app).post("/users/register").send({
        fullname: "Jean G",
        email: "jeanny3@gmail.com",
        phoneNumber: "091233128821",
        city: "Jakarta",
        favoriteGenre: "Bussiness",
        favoriteBook: "Trade",
      });
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Password cannot be null");
    });

    it("Should not create user when password's length is less than 5", async () => {
      const response = await request(app).post("/users/register").send({
        fullname: "Jean G",
        email: "jeanny4@gmail.com",
        password: "tes",
        phoneNumber: "091233128821",
        city: "Jakarta",
        favoriteGenre: "Bussiness",
        favoriteBook: "Trade",
      });
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe(
        "Password must have more than 4 characters"
      );
    });

    it("Should not create user when invalid email format", async () => {
      const response = await request(app).post("/users/register").send({
        fullname: "Jean G",
        email: "jeanny5",
        password: "testes123",
        phoneNumber: "091233128821",
        city: "Jakarta",
        favoriteGenre: "Bussiness",
        favoriteBook: "Trade",
      });
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Only Email Format");
    });

    it("Should not create user when email is used already", async () => {
      const response = await request(app).post("/users/register").send({
        fullname: "nilou",
        email: "userTest1@mail.com",
        password: "nilou1234",
        phoneNumber: "091233128821",
        city: "Jakarta",
        favoriteGenre: "Bussiness",
        favoriteBook: "Trade",
      });
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Email is taken already");
    });
  });

  describe("Route : POST /users/login", () => {
    it("Should able to login properly", async () => {
      const response = await request(app)
        .post("/users/login")
        .send({ email: "userTest1@mail.com", password: "userTest1" });
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

    it("Should not able to login with invalid password", async () => {
      const response = await request(app)
        .post("/users/login")
        .send({ email: "userTest1@mail.com", password: "userTest2" });
      expect(response.statusCode).toBe(401);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Wrong email or password");
    });

    it("Should not able to login with invalid email", async () => {
      const response = await request(app)
        .post("/users/login")
        .send({ email: "userTest10@mail.com", password: "userTest2" });
      expect(response.statusCode).toBe(401);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Wrong email or password");
    });
  });

  describe("Route : PUT /users/:id", () => {
    it("Should able to edit user information", async () => {
      const response = await request(app).put("/users/1").send({
        city: "Medan",
      });

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe(
        "Success edit user profile with id : 1"
      );
    });

    it("Should not able edit user with invalid id", async () => {
      const response = await request(app).put("/users/9999").send({
        city: "Medan",
      });
      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Data not found");
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

    it("Should not able update isBanned status of user with invalid id", async () => {
      const response = await request(app).patch("/users/9999");
      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Data not found");
    });
  });
});
