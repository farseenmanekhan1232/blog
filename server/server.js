const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://farseen:123@cluster0.wogwacn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let blogCollection;

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    // Access the blog collection
    blogCollection = client.db("blog").collection("blogs");
    console.log("Connected to MongoDB and ready to use the blog collection");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

run().catch(console.dir);

app.get("/blogs", async (req, res) => {
  try {
    const blogs = await blogCollection.find().sort({ date: -1 }).toArray();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

app.post("/blogs", async (req, res) => {
  const { date, title, content } = req.body;
  try {
    const newBlog = { date, title, content };
    const result = await blogCollection.insertOne(newBlog);
    res.json(result.ops[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to post blog" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
