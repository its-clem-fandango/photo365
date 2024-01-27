import express from "express";
import { getAllPosts, createPost } from "./controllers/postsController.js";
const router = express.Router();

// Middleware functions have access to req and res objects and can perform tasks like modifying request/response data, +more
router.get("/", (req, res) => {
  res.send("Hello, World!");
});

router.post("/", createPost);
/* router.get("/date/:date", getPostsByDate);
 */ router.get("/posts", getAllPosts);
/* router.get("/scroll/:date", scrollLoad);
 */
export default router;
