import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Controller functions

export async function createPost(req, res) {
  try {
    const { title, imageURL } = req.body;

    // Validation (you can enhance this as needed)
    if (typeof imageURL !== "string" || typeof title !== "string") {
      return res.status(400).send("Invalid data provided");
    }

    const newPost = await prisma.post.create({
      data: {
        title,
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
    console.log(posts);
    res.json(posts);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
