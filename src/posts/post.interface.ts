import { User } from '../users/user.interface';

export interface Post {
    id: number;
    name: string;
    images: string;
    description: string;
    author: User;
}