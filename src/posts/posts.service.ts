// src/items/items.service.ts

/**
 * Data Model Interfaces
 */
import { Post } from './post.interface';
import { Posts } from './posts.interface';

/**
 * In-Memory Store
 */

let posts: Posts = {
    1: {
        id: 1,
        name: "IACV",
        description: "always broken",
        author: "John Doe"
   },
   2: {
       id: 1,
       name: "Spoon Side Mirrors",
       description: "cool af",
       author: "John Doe"
   },
   3: {
       id: 1,
       name: "Spoon N1 Muffler",
       description: "loud af",
       author: "John Doe"
   }
 };

/**
 * Service Methods
 */

 export const findAll = async (): Promise<Post[]> => Object.values(posts);

 export const find = async (id: number): Promise<Post> => posts[id];

 export const create = async (newPost: Post): Promise<Post> => {
    var id =  new Date().valueOf();
    newPost.id = id;
     
    posts[id] = {
        ...newPost,
    };

    return posts[id];
};

export const update = async (id: number, postUpdate: Post): Promise<Post | null> => {
    const item = await find(id);

    if (!item) {
        return null;
    }
  
    postUpdate.id = id
    posts[id] = { ...postUpdate };

    return posts[id];
};

export const remove = async (id: number): Promise<null | void> => {
    const item = await find(id);

    if (!item) {
      return null;
    }

    delete posts[id];
};