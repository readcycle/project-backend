const app = require("../app");
const request = require("supertest");

const title = "Harry Potter";
const author = "JK Rowling";
const GenreId = 1;

describe("Book Endpoint Test", () => {
  test("GET /books => return array of books", async () => {
    const response = await request(app).get("/books");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test("GET /books/:id => return book with specified id", async () => {
    const response = await request(app).get("/books/1");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("title", expect.any(String));
    expect(response.body).toHaveProperty("author", expect.any(String));
    expect(response.body).toHaveProperty("GenreId", expect.any(Number));
  });

  test("GET /books/:id => return 404 book not found", async () => {
    const response = await request(app).get("/books/999");

    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      expect.stringContaining("Book not found")
    );
  });

  test("POST /books => create new book", async () => {
    const response = await request(app).post(`/books`).send({
      title,
      author,
      GenreId,
    });

    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("title", expect.any(String));
    expect(response.body).toHaveProperty("author", expect.any(String));
    expect(response.body).toHaveProperty("GenreId", expect.any(Number));
  });
});
