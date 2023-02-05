const request = require("supertest");
const app = require("../app");
const { funcHashValue } = require("../helper/bcryptHandler");
const { sequelize, Sequelize } = require("../models");

beforeAll(async () => {
  await sequelize.queryInterface.bulkInsert("Users", [
    {
      fullname: "perys siahaan",
      email: "peryssiahaan@gmail.com",
      password: funcHashValue("perys123"),
      phoneNumber: "081211213441",
      city: "Bandung",
      favoriteGenre: "Mystery",
      favoriteBook: "Lama",
      location: Sequelize.fn(
        "ST_GeomFromText",
        "POINT(107.5925576773082 -6.940669415817259)"
      ),
      isBanned: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      fullname: "yae miko",
      email: "yaemiko@gmail.com",
      password: funcHashValue("mikofoxy123"),
      phoneNumber: "081212213441",
      city: "Jakarta",
      favoriteGenre: "Romance",
      favoriteBook: "Lama",
      location: Sequelize.fn(
        "ST_GeomFromText",
        "POINT(106.84304125335981 -6.2418023072307625)"
      ),
      isBanned: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      fullname: "raiden mei",
      email: "raidenmei@gmail.com",
      password: funcHashValue("mei0098"),
      phoneNumber: "081212211241",
      city: "Jakarta",
      favoriteGenre: "Romance",
      favoriteBook: "Lama",
      location: Sequelize.fn(
        "ST_GeomFromText",
        "POINT(106.8404441475624 -6.238927738616384)"
      ),
      isBanned: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      fullname: "nilou",
      email: "nilou@gmail.com",
      password: funcHashValue("nilou112"),
      phoneNumber: "081212211431",
      city: "Jakarta",
      favoriteGenre: "History",
      favoriteBook: "Lama",
      location: Sequelize.fn(
        "ST_GeomFromText",
        "POINT(106.84357584501699 -6.239228771586251)"
      ),
      isBanned: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("Check Users Routes", () => {
  describe("Route : GET /users", () => {
    it("Should able to get all listed books in database", async () => {
      const response = await request(app).get("/users");
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
    it("Should not create user when empty fullname", async () => {
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
        email: "nilou@gmail.com",
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
        .send({ email: "yaemiko@gmail.com", password: "mikofoxy123" });
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
    it("Should not able to login with invalid credential", async () => {
      const response = await request(app)
        .post("/users/login")
        .send({ email: "yaemiko@gmail.com", password: "mikofoxy1234" });
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
