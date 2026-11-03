const request = require("supertest");
const app = require("../src/app");

describe("Transaction API", () => {
  test("GET /health should return 200", async () => {
    const response = await request(app).get("/health");

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("UP");
  });

  test("POST /transactions should reject invalid data", async () => {
    const response = await request(app)
      .post("/transactions")
      .send({
        policyId: "",
        amount: -100
      });

    expect(response.statusCode).toBe(400);
  });
});