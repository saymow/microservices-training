import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import jwt from "jsonwebtoken";

process.env.JWT_KEY = "jwt-key";
process.env.MONGO_URI = "MONGO_URI";
process.env.NATS_CLIENT_ID = "NATS_CLIENT_ID";
process.env.NATS_URL = "NATS_URL";
process.env.NATS_CLUSTER_ID = "NATS_CLUSTER_ID";

import { app } from "../app";

jest.mock("../nats-wrapper");

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
  jest.clearAllMocks();
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
    id: new mongoose.Types.ObjectId().toHexString(),
    email: "valid_email@mail.com",
  };
  const sessionJSON = JSON.stringify({
    jwt: jwt.sign(payload, process.env.JWT_KEY!),
  });
  const base64 = Buffer.from(sessionJSON).toString("base64");

  return [`session=${base64}`];
};
