const app = require("../app");
const request = require("supertest");
const { Book } = require("../models");

const title = "Harry Potter";
const author = "JK Rowling";
const GenreId = 1;

beforeAll(() => {
  jest.restoreAllMocks();
});

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

  test("GET /books => return 500 internal server error", async () => {
    jest.spyOn(Book, "findAll").mockRejectedValue({ message: "lalalala" });
    const response = await request(app).get("/books");

    expect(response.status).toBe(500);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      expect.stringContaining("Internal server error")
    );
  });

  test("POST /books => return 400", async () => {
    jest.spyOn(Book, "findAll").mockRejectedValue({ message: "lalalala" });
    const response = await request(app).post("/books");

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      expect.stringContaining("Title is required")
    );
  });
});
