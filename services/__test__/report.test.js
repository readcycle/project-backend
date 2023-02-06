const request = require("supertest");
const app = require("../app");
const { Admin, User, Report } = require("../models");
const { tokenize } = require("../helper/jwtHandler");

let tokenAdmin;
let tokenUser1;
let reporterId;
let reportedId;
let reportId;

const adminSeed = {
  email: "admin@mail.com",
  password: "admin",
};

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
  const admin = await Admin.create(adminSeed);
  tokenAdmin = tokenize({ id: admin.id, email: admin.email });

  const user1 = await User.create(user1Seed);
  tokenUser1 = tokenize({ id: user1.id, email: user1.email });
  reporterId = user1.id;

  const user2 = await User.create(user2Seed);
  reportedId = user2.id;

  const report = await Report.create({
    title: "Racisme",
    content: "The posting contain racisme issues",
    reporterId,
    reportedId,
  });

  reportId = report.id;
});

afterAll(async () => {
  await Report.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await User.destroy({ truncate: true, cascade: true, restartIdentity: true });
  await Admin.destroy({ truncate: true, cascade: true, restartIdentity: true });
});

describe("API Report", () => {
  describe("GET /reports", () => {
    test.only("Get list reports success", async () => {
      const response = await request(app)
        .get("/reports")
        .set("access_token", tokenAdmin);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
    });

    test.only("Get list reports failed because no access_token was included", async () => {
      const response = await request(app).get("/reports");
      // .set("access_token", tokenAdmin)

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "Invalid token");
    });
  });

  describe("GET /reports/:id", () => {
    test.only("Get report by id success", async () => {
      const response = await request(app)
        .get(`/reports/${reportId}`)
        .set("access_token", tokenAdmin);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("id", expect.any(Number));
      expect(response.body).toHaveProperty("title", expect.any(String));
      expect(response.body).toHaveProperty("content", expect.any(String));
      expect(response.body).toHaveProperty("reporterId", expect.any(Number));
      expect(response.body).toHaveProperty("reportedId", expect.any(Number));
      expect(response.body).toHaveProperty("isSolved", expect.any(Boolean));
      expect(response.body).toHaveProperty("createdAt", expect.any(String));
      expect(response.body).toHaveProperty("updatedAt", expect.any(String));
      expect(response.body).toHaveProperty("isSolved", expect.any(Boolean));
      expect(response.body).toHaveProperty("Issuer", expect.any(Object));
      expect(response.body.Issuer).toHaveProperty(
        "fullname",
        expect.any(String)
      );
      expect(response.body).toHaveProperty("Victim", expect.any(Object));
      expect(response.body.Victim).toHaveProperty(
        "fullname",
        expect.any(String)
      );
    });

    test.only("Get report by id failed because no access_token was included", async () => {
      const response = await request(app).get(`/reports/${reportId}`);
      // .set("access_token", tokenAdmin)

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "Invalid token");
    });

    test.only("Get roport by id failed because invalid report id", async () => {
      let wrongId = 999999;
      const response = await request(app)
        .get(`/reports/${wrongId}`)
        .set("access_token", tokenAdmin);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Report not found");
    });
  });

  describe("POST /reports/:reportedId", () => {
    test.only("Add report success", async () => {
      const response = await request(app)
        .post(`/reports/${reportedId}`)
        .set("access_token", tokenUser1)
        .send({
          title: "Humiliation",
          content: "Please take down the posting from this user",
        });

      expect(response.status).toBe(201);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("id", expect.any(Number));
      expect(response.body).toHaveProperty("title", expect.any(String));
      expect(response.body).toHaveProperty("content", expect.any(String));
      expect(response.body).toHaveProperty("reporterId", expect.any(Number));
      expect(response.body).toHaveProperty("reportedId", expect.any(Number));
      expect(response.body).toHaveProperty("isSolved", expect.any(Boolean));
      expect(response.body).toHaveProperty("createdAt", expect.any(String));
      expect(response.body).toHaveProperty("updatedAt", expect.any(String));
      expect(response.body).toHaveProperty("isSolved", expect.any(Boolean));
    });

    test.only("Add report failed because no access_token was included", async () => {
      const response = await request(app)
        .post(`/reports/${reportedId}`)
        // .set("access_token", tokenUser1)
        .send({
          title: "Humiliation",
          content: "Please take down the posting from this user",
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "Invalid token");
    });

    test.only("Add report failed because reported user not found", async () => {
      let wrongReportedId = 9999;
      const response = await request(app)
        .post(`/reports/${wrongReportedId}`)
        .set("access_token", tokenUser1)
        .send({
          title: "Humiliation",
          content: "Please take down the posting from this user",
        });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });

  describe("UPDATE /reports/:id", () => {
    test.only("Update report success", async () => {
      const response = await request(app)
        .patch(`/reports/${reportId}`)
        .set("access_token", tokenAdmin);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });

    test.only("Update report failed because no access_token was included", async () => {
      const response = await request(app).patch(`/reports/${reportId}`);
      // .set("access_token", tokenAdmin)

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "Invalid token");
    });

    test.only("Update report failed because invalid report id", async () => {
      const wrongId = 9999;
      const response = await request(app)
        .patch(`/reports/${wrongId}`)
        .set("access_token", tokenAdmin);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Report not found");
    });
  });
});
