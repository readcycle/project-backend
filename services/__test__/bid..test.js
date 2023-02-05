const request = require("supertest");
const app = require("../app");

describe("Check Bids Routes", () => {
  describe("Route : GET /bids", () => {
    it("Should able to get all listed bids in database", async () => {
      const response = await request(app).get("/bids");
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Success get all bids");
    });
  });
  describe("Route : GET /bids/:id", () => {
    it("Should able to get a listed bids with certain id", async () => {
      const response = await request(app).get("/bids/1");
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Success get bid with id : 1");
    });
  });
  describe("Route : POST /bids", () => {
    it("Should able to add a bid properly", async () => {
      const response = await request(app).post("/bids");
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Success add a new bid");
    });
  });
  describe("Route : PUT /bids/:id", () => {
    it("Should able to edit bid information", async () => {
      const response = await request(app).put("/bids/1");
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Success edit bid with id : 1");
    });
  });
  describe("Route : DELETE /bids/:id", () => {
    it("Should able to delete a certain bid", async () => {
      const response = await request(app).delete("/bids/1");
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBe("Success delete bid with id : 1");
    });
  });
});
