import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI || "";

if (!uri) {
  console.error("MONGODB_URI is not defined in the environment variables.");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

if (process.env.NODE_ENV === "development") {
  console.log("Connecting to MongoDB in development mode");
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    (global as any)._mongoClientPromise = client
      .connect()
      .then((client) => {
        console.log("Successfully connected to MongoDB in development mode");
        return client;
      })
      .catch((error) => {
        console.error(
          "Failed to connect to MongoDB in development mode:",
          error
        );
        throw error;
      });
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  console.log("Connecting to MongoDB in production mode");
  client = new MongoClient(uri, options);
  clientPromise = client
    .connect()
    .then((client) => {
      console.log("Successfully connected to MongoDB in production mode");
      return client;
    })
    .catch((error) => {
      console.error("Failed to connect to MongoDB in production mode:", error);
      throw error;
    });
}

export default clientPromise;
