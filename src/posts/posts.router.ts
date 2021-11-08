/**
 * Required External Modules and Interfaces
 */
 import express, { Request, Response } from "express";
 import * as PostService from "./posts.service";
 import { Post } from "./post.interface";

/**
 * Router Definition
 */
 export const postRouter = express.Router();

/**
 * Controller Definitions
 */

// GET posts

postRouter.get("/", async (req: Request, res: Response) => {
    try {
      const posts: Post[] = await PostService.findAll();
  
      res.status(200).send(posts);
    } catch (e) {
      res.status(500).send(e);
    }
  });
  
  // GET posts/:id
  
  postRouter.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
  
    try {
      const post: Post = await PostService.find(id);
  
      if (post) {
        return res.status(200).send(post);
      }
  
      res.status(404).send("post not found");
    } catch (e) {
      res.status(500).send(e);
    }
  });
  
  // POST posts
  
  postRouter.post("/", async (req: Request, res: Response) => {
    try {
      const post: Post = req.body;
  
      const newpost = await PostService.create(post);
  
      res.status(201).json(newpost);
    } catch (e) {
      res.status(500).send(e);
    }
  });
  
  // PUT posts/:id
  
  postRouter.put("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
  
    try {
      const postUpdate: Post = req.body;
  
      const existingpost: Post = await PostService.find(id);
  
      if (existingpost) {
        const updatedpost = await PostService.update(id, postUpdate);
        return res.status(200).json(updatedpost);
      }
  
      const newpost = await PostService.create(postUpdate);
  
      res.status(201).json(newpost);
    } catch (e) {
      res.status(500).send(e);
    }
  });
  
  // DELETE posts/:id
  
  postRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
      const id: number = parseInt(req.params.id, 10);
      await PostService.remove(id);
  
      res.sendStatus(204);
    } catch (e) {
      res.status(500).send(e);
    }
  });