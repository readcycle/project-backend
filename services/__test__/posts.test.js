const app = require("../app");
const request = require("supertest");
const { Post, sequelize } = require("../models");

const data = require("../db.json").posts;
const {
  title,
  author,
  condition,
  description,
  UserId,
  GenreId,
  isClosed,
  imageUrl,
} = data[0];

describe("Post Endpoint Test", () => {
  beforeAll(() => {
    return sequelize.queryInterface.bulkInsert("Posts", data);
  });

  test("GET /posts => return array of post", async () => {
    const response = await request(app).get("/posts");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test("GET /posts?search=test => return array of post with title that has 'test'", async () => {
    const response = await request(app).get("/posts?search=test");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test("GET /posts?genre=1 => return array of post with genre_id 1", async () => {
    const response = await request(app).get("/posts?genre=1");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test("GET /posts?user=1 => return array of post with user_id 1", async () => {
    const response = await request(app).get("/posts?user=1");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test("GET /posts/:id => return post with specified id", async () => {
    const response = await request(app).get("/posts/1");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("title", expect.any(String));
    expect(response.body).toHaveProperty("author", expect.any(String));
    expect(response.body).toHaveProperty("condition", expect.any(Number));
    expect(response.body).toHaveProperty("description", expect.any(String));
    expect(response.body).toHaveProperty("UserId", expect.any(Number));
    expect(response.body).toHaveProperty("GenreId", expect.any(Number));
    expect(response.body).toHaveProperty("isClosed", expect.any(Boolean));
    expect(response.body).toHaveProperty("imageUrl", expect.any(String));
  });

  test("GET /posts/:id => return 404 not found, because data not exist", async () => {
    const response = await request(app).get("/posts/999");

    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      expect.stringContaining("Post not found")
    );
  });

  test("POST /posts => create post based on input", async () => {
    const response = await request(app).post(`/posts`).send({
      title,
      author,
      condition,
      description,
      UserId,
      GenreId,
      isClosed,
      imageUrl,
    });

    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("title", data[0].title);
    expect(response.body).toHaveProperty("author", data[0].author);
    expect(response.body).toHaveProperty("condition", data[0].condition);
    expect(response.body).toHaveProperty("description", data[0].description);
    expect(response.body).toHaveProperty("UserId", data[0].UserId);
    expect(response.body).toHaveProperty("GenreId", data[0].GenreId);
    expect(response.body).toHaveProperty("isClosed", data[0].isClosed);
    expect(response.body).toHaveProperty("imageUrl", data[0].imageUrl);
  });

  test("POST /posts => return 400 should not create due to empty title", async () => {
    const response = await request(app).post("/posts").send({
      title: "",
      author,
      condition,
      description,
      UserId,
      GenreId,
      isClosed,
      imageUrl,
    });

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      expect.stringContaining("Title is required")
    );
  });

  test("POST /posts => return 400 should not create due to empty author", async () => {
    const response = await request(app).post("/posts").send({
      title,
      author: "",
      condition,
      description,
      UserId,
      GenreId,
      isClosed,
      imageUrl,
    });

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      expect.stringContaining("Author is required")
    );
  });

  test("POST /posts => return 400 should not create due to empty condition", async () => {
    const response = await request(app).post("/posts").send({
      title,
      author,
      condition: null,
      description,
      UserId,
      GenreId,
      isClosed,
      imageUrl,
    });

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      expect.stringContaining("Condition is required")
    );
  });

  test("POST /posts => return 400 should not create due to empty description", async () => {
    const response = await request(app).post("/posts").send({
      title,
      author,
      condition,
      description: "",
      UserId,
      GenreId,
      isClosed,
      imageUrl,
    });

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      expect.stringContaining("Description is required")
    );
  });

  test("POST /posts => return 400 should not create due to empty image", async () => {
    const response = await request(app).post("/posts").send({
      title,
      author,
      condition,
      description,
      UserId,
      GenreId,
      isClosed,
      imageUrl: "",
    });

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      expect.stringContaining("Image is required")
    );
  });

  test("PUT /posts/:id => return successful message", async () => {
    const response = await request(app).put("/posts/5").send({
      title,
      author,
      condition,
      description,
      UserId,
      GenreId,
      isClosed,
      imageUrl,
    });

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Edit Sucessfull for post with id 5"
    );
  });

  test("PUT /posts/:id => return 404 not found", async () => {
    const response = await request(app).put("/posts/99");

    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      expect.stringContaining("Post not found")
    );
  });

  test("PATCH /posts/Lid => return successful message", async () => {
    const response = await request(app).patch("/posts/1");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Status of post with id 1 is changed successfully"
    );
  });

  test("PATCH /posts/Lid => return 404 not found", async () => {
    const response = await request(app).put("/posts/99");

    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      expect.stringContaining("Post not found")
    );
  });

  test("DELETE /posts/:id => return successful message", async () => {
    const response = await request(app).delete("/posts/1");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Post with id 1 is deleted"
    );
  });

  test("DELETE /posts/:id => return 404 not found", async () => {
    const response = await request(app).delete("/posts/99");

    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      expect.stringContaining("Post not found")
    );
  });

  afterAll(() => {
    return sequelize.queryInterface.bulkDelete("Posts", null, {
      truncate: true,
      restartIdentity: true,
    });
  });
});
