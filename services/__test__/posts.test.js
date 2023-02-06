const app = require("../app");
const request = require("supertest");
const { Post } = require("../models");

const data = require("../db.json").posts;
const { BookId, condition, description, UserId, isClosed, imageUrl } = data[0];

beforeAll(() => {
  jest.restoreAllMocks();
});

describe("Post Endpoint Test", () => {
  test("GET /posts => return array of post", async () => {
    const response = await request(app).get("/posts");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
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
    expect(response.body).toHaveProperty("condition", expect.any(Number));
    expect(response.body).toHaveProperty("description", expect.any(String));
    expect(response.body).toHaveProperty("UserId", expect.any(Number));
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
      condition,
      description,
      UserId,
      BookId,
      isClosed,
      imageUrl,
    });
    post = response.body;

    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("condition", data[0].condition);
    expect(response.body).toHaveProperty("description", data[0].description);
    expect(response.body).toHaveProperty("UserId", data[0].UserId);
    expect(response.body).toHaveProperty("isClosed", data[0].isClosed);
    expect(response.body).toHaveProperty("imageUrl", data[0].imageUrl);
  });

  test("POST /posts => return 400 should not create due to empty condition", async () => {
    const response = await request(app).post("/posts").send({
      condition: null,
      description,
      UserId,
      BookId,
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
      condition,
      description: null,
      UserId,
      BookId,
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
      condition,
      description,
      UserId,
      BookId,
      isClosed,
      imageUrl: null,
    });

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      expect.stringContaining("Image is required")
    );
  });

  test("PATCH /posts/:id => return successful message", async () => {
    const response = await request(app).patch(`/posts/1`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      `Status of post with id 1 is changed successfully`
    );
  });

  test("PATCH /posts/:id => return 404 not found", async () => {
    const response = await request(app).patch("/posts/999");

    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      expect.stringContaining("Post not found")
    );
  });

  test("DELETE /posts/:id => return successful message", async () => {
    const response = await request(app).delete(`/posts/1`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      `Post with id 1 is deleted`
    );
  });

  test("DELETE /posts/:id => return 404 not found", async () => {
    const response = await request(app).delete("/posts/999");

    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      expect.stringContaining("Post not found")
    );
  });
});
