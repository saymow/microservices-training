import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import jwt from "jsonwebtoken";

process.env.JWT_KEY = "jwt-key";
process.env.MONGO_URI = "MONGO_URI";

import { app } from "../app";

declare global {
  var auth: () => string[];
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

global.auth = () => {
  const payload = {
    id: "valid_id",
    email: "valid_email@mail.com",
  };
  const sessionJSON = JSON.stringify({
    jwt: jwt.sign(payload, process.env.JWT_KEY!),
  });
  const base64 = Buffer.from(sessionJSON).toString("base64");

  return [`session=${base64}`];
};
