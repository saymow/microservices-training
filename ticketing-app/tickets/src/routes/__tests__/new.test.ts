import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

describe("Post api/tickets Route", () => {
  it("Should be defined", async () => {
    const response = await request(app).post("/api/tickets").send({});

    expect(response.statusCode).not.toBe(404);
  });

  it("Should should have authentication", async () => {
    await request(app).post("/api/tickets").send({}).expect(401);
    const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", global.auth())
      .send({});

    expect(response.status).not.toEqual(401);
  });

  it("Should returns an error on invalid input (title)", async () => {
    await request(app)
      .post("/api/tickets")
      .set("Cookie", global.auth())
      .send({
        title: "",
        price: 10,
      })
      .expect(400);

    await request(app)
      .post("/api/tickets")
      .set("Cookie", global.auth())
      .send({
        price: 10,
      })
      .expect(400);
  });

  it("Should returns an error on invalid input (price)", async () => {
    await request(app)
      .post("/api/tickets")
      .set("Cookie", global.auth())
      .send({
        title: "valid-title",
        price: -10,
      })
      .expect(400);

    await request(app)
      .post("/api/tickets")
      .set("Cookie", global.auth())
      .send({
        title: "valid-title",
      })
      .expect(400);
  });

  it("Should should create a ticket on success", async () => {
    let tickets = await Ticket.find({});

    expect(tickets.length).toEqual(0);

    await request(app)
      .post("/api/tickets")
      .set("Cookie", global.auth())
      .send({
        title: "valid-title",
        price: 20,
      })
      .expect(201);

    tickets = await Ticket.find({});

    expect(tickets.length).toEqual(1);
    expect(tickets[0].title).toEqual("valid-title");
    expect(tickets[0].price).toEqual(20);
  });
});
