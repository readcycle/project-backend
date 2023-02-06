const request = require("supertest");
const app = require("../app");
const { Admin, Genre } = require("../models");
const { tokenize } = require("../helper/jwtHandler");
let tokenAdmin;
let genreId;

beforeAll(() => {
  jest.restoreAllMocks();
});

beforeAll(async () => {
  // const admin = await Admin.create({
  //   email: "admin@mail.com",
  //   password: "admin",
  // });
  // tokenAdmin = tokenize({ id: admin.id, email: admin.email });
  const genre = await Genre.create({
    name: "New Genre",
  });
  genreId = genre.id;
});

// afterAll( async() => {
//     await Genre.destroy({ truncate: true, cascade: true, restartIdentity: true })
//     await Admin.destroy({ truncate: true, cascade: true, restartIdentity: true })
// })

describe.skip("API Genre", () => {
  describe("GET /genres", () => {
    test.only("Get list genres success", async () => {
      const response = await request(app).get("/genres");

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe("GET /genres/:id", () => {
    test.only("Get genre by id success", async () => {
      const response = await request(app).get(`/genres/${genreId}`);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("id", expect.any(Number));
      expect(response.body).toHaveProperty("name", expect.any(String));
      expect(response.body).toHaveProperty("createdAt", expect.any(String));
      expect(response.body).toHaveProperty("updatedAt", expect.any(String));
    });

    test.only("Get genre by id failed because invalid genreId", async () => {
      let wrongId = 9999;
      const response = await request(app).get(`/genres/999`);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Genre not found");
    });

    test.only("GET /genres => return 500 internal server error", async () => {
      jest.spyOn(Genre, "findAll").mockRejectedValue({ message: "lalalala" });
      const response = await request(app).get("/genres");

      expect(response.status).toBe(500);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty(
        "message",
        expect.stringContaining("Internal server error")
      );
    });
  });
});
