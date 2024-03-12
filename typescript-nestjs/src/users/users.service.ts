import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './interfaces/interface';

@Injectable()
export class UserService {
  public users: User[] = [];
  getUsers(): User[] {
    return this.users;
  }
  getUser(email: string) {
    const userData = this.users.find((user) => user.email === email);
    if (userData && Array.isArray(userData) && userData.length > 0) {
      return userData[0];
    } else {
      throw new NotFoundException('Could not find the user');
    }
  }
  addUser(user: User) {
    this.users.push(user);
    return user;
  }
  deleteUser(email: string) {
    const remainingUser = this.users.filter((user) => user.email !== email);
    this.users = remainingUser;
    return remainingUser || [];
  }
}
