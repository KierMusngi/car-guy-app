// src/users/users.service.ts

/**
 * Data Model Interfaces
 */
 import { User } from './user.interface';
 
 /**
  * In-Memory Store
  */
 
let users: Array<User> = [
    {
        id: 1,
        name: "John Doe",
        location: "Pasay City",
        contactNumber: "0912-345-6789",
        email: "example@email.com",
        website: "www.example.com",
        reputation: 10
    },
    {
        id: 2,
        name: "Jane Doe",
        location: "Paranaque City",
        contactNumber: "0912-345-6789",
        email: "example@email.com",
        website: "www.example.com",
        reputation: 7
    },
    {
        id: 3,
        name: "Albert Jose",
        location: "Laguna City",
        contactNumber: "0912-345-6789",
        email: "example@email.com",
        website: "www.example.com",
        reputation: 4
    },
    {
        id: 4,
        name: "Kier Mus",
        location: "Calamba City",
        contactNumber: "0912-345-6789",
        email: "example@email.com",
        website: "www.example.com",
        reputation: 0
    }
];

/**
 * Service Methods
 */

export const findAll = async (): Promise<User[]> => Object.values(users);

export const find = async (id: number): Promise<User> => users[id];

export const create = async (newUser: User): Promise<User> => {
    var id =  new Date().valueOf();
    newUser.id = id;

    users[id] = {
        ...newUser,
    };
    return users[id];
};

export const update = async (id: number, userUpdate: User): Promise<User | null> => {
    const item = await find(id);

    if (!item) {
        return null;
    }
  
    userUpdate.id = id
    users[id] = { ...userUpdate };

    return users[id];
};

export const remove = async (id: number): Promise<null | void> => {
    const item = await find(id);

    if (!item) {
      return null;
    }

    delete users[id];
};