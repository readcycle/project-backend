const request = require("supertest");
const app = require("../app");

const data = require("../db.json").bids;
const { BookId, condition, description, UserId, PostId, imageUrl } = data[0];

describe("Bids Endpoint Test", () => {
  it("GET /bids => return array of bids", async () => {
    const response = await request(app).get("/bids");

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("GET /bids => return array of bids with UserId query", async () => {
    const response = await request(app).get("/bids?user=1");

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("GET /bids => return array of bids with PostId query", async () => {
    const response = await request(app).get("/bids?post=1");

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("GET /bids/:id => returns bids with specific id", async () => {
    const response = await request(app).get("/bids/1");

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("condition", expect.any(Number));
    expect(response.body).toHaveProperty("description", expect.any(String));
    expect(response.body).toHaveProperty("UserId", expect.any(Number));
    expect(response.body).toHaveProperty("PostId", expect.any(Number));
    expect(response.body).toHaveProperty("imageUrl", expect.any(String));
  });

  it("GET /bids/:id => returns 404 not found, because data not exist", async () => {
    const response = await request(app).get("/bids/999");

    expect(response.statusCode).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      expect.stringContaining("Bid not found")
    );
  });

  it("POST /bids => create new bid based on input", async () => {
    const response = await request(app)
      .post("/bids")
      .send({ BookId, condition, description, UserId, PostId, imageUrl });

    expect(response.statusCode).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("condition", data[0].condition);
    expect(response.body).toHaveProperty("description", data[0].description);
    expect(response.body).toHaveProperty("UserId", data[0].UserId);
    expect(response.body).toHaveProperty("PostId", data[0].PostId);
    expect(response.body).toHaveProperty("imageUrl", data[0].imageUrl);
  });

  it("POST /bids => return 400 should not create new bids", async () => {
    const response = await request(app)
      .post("/bids")
      .send({ BookId, condition, description: null, UserId, PostId, imageUrl });

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message");
  });
});
