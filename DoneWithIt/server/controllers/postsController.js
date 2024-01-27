import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Controller functions

export async function createPost(req, res) {
  try {
    const { imageURL } = req.body;

    if (typeof imageURL !== "string") {
      return res.status(400).send("Invalid Image URL");
    }

    const newPost = await prisma.post.create({
      data: {
        imageURL,
      },
    });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getAllPosts(req, res) {
  try {
    const posts = await prisma.post.findMany();
    res.json(posts);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
