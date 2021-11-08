// src/items/items.service.ts

/**
 * Data Model Interfaces
 */
import { Post } from './post.interface';
import { Posts } from './posts.interface';
import { User } from '../users/user.interface';

/**
 * In-Memory Store
 */

let user: User = {
    id: 1,
    name: "Seller O Seller",
    location: "Pasay City",
    contactNumber: "0912-345-6789",
    email: "example@email.com",
    website: "www.example.com",
    reputation: 10
};

let posts: Posts = {
    1: {
        id: 1,
        name: "IACV",
        images: "test image",
        description: "always broken",
        author: user
    },
    2: {
        id: 1,
        name: "Spoon Side Mirrors",
        images: "test image",
        description: "cool af",
        author: user
    },
    3: {
        id: 1,
        name: "Spoon N1 Muffler",
        images: "test image",
        description: "loud af",
        author: user
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