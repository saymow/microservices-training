import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";

process.env.JWT_KEY = "jwt-key";
process.env.MONGO_URI = "MONGO_URI";

import { app } from "../app";

declare global {
  var auth: () => Promise<string[]>;
}

let mongo: any;
beforeAll(async () => {
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.auth = async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "valid-email@mail.com",
      password: "valid-password",
    })
    .expect(201);

  return response.get("Set-Cookie");
};
