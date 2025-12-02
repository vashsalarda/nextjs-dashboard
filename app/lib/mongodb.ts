"use server";

import { MongoClient } from "mongodb";

declare global {
  var _mongoClient: Promise<MongoClient> | undefined;
}

const uri = process.env.MONGODB_URI!;
const db_name = process.env.MONGODB_DB ?? "mydatabase";

const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!global._mongoClient) {
  client = new MongoClient(uri, options);
  global._mongoClient = client.connect();
}
clientPromise = global._mongoClient!;

export async function db() {
  const client = await clientPromise;
  return client.db(db_name);
}
