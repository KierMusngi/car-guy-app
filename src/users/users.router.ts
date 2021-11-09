/**
 * Required External Modules and Interfaces
 */
 import express, { Request, Response } from 'express';
 import * as UserService from './users.service';
 import { User } from './user.interface';

/**
 * Router Definition
 */
 export const userRouter = express.Router();

/**
 * Controller Definitions
 */

// GET posts

userRouter.get("/", async (req: Request, res: Response) => {
    try {
      const posts: User[] = await UserService.findAll();
  
      res.status(200).send(posts);
    } catch (e) {
      res.status(500).send(e);
    }
  });
  
  // GET posts/:id
  
  userRouter.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
  
    try {
      const post: User = await UserService.find(id);
  
      if (post) {
        return res.status(200).send(post);
      }
  
      res.status(404).send("post not found");
    } catch (e) {
      res.status(500).send(e);
    }
  });
  
  // POST posts
  
  userRouter.post("/", async (req: Request, res: Response) => {
    try {
      const post: User = req.body;
  
      const newpost = await UserService.create(post);
  
      res.status(201).json(newpost);
    } catch (e) {
      res.status(500).send(e);
    }
  });
  
  // PUT posts/:id
  
  userRouter.put("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
  
    try {
      const postUpdate: User = req.body;
  
      const existingpost: User = await UserService.find(id);
  
      if (existingpost) {
        const updatedpost = await UserService.update(id, postUpdate);
        return res.status(200).json(updatedpost);
      }
  
      const newpost = await UserService.create(postUpdate);
  
      res.status(201).json(newpost);
    } catch (e) {
      res.status(500).send(e);
    }
  });
  
  // DELETE posts/:id
  
  userRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
      const id: number = parseInt(req.params.id, 10);
      await UserService.remove(id);
  
      res.sendStatus(204);
    } catch (e) {
      res.status(500).send(e);
    }
  });