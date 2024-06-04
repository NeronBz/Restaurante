import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { environmentAuth } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // private login: string = environmentAuth.login;
  // private logout: string = environmentAuth.logout;
  // private register: string = environmentAuth.register;

  private storageKey = 'users';
  private currentUserKey = 'currentUser';

  constructor() {}

  register(username: string, name: string, password: string): boolean {
    const users = this.getUsersFromStorage();
    const userExists = users.some((u) => u.username === username);

    if (userExists) {
      return false;
    } else {
      users.push({
        username,
        password,
        name,
      });
      this.saveUsersToStorage(users);
      return true;
    }
  }

  login(username: string, password: string): boolean {
    const users = this.getUsersFromStorage();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      sessionStorage.setItem(this.currentUserKey, JSON.stringify(user));
      return true;
    }
    return false;
  }

  updateUser(updatedUser: User): void {
    const users = this.getUsersFromStorage();
    const index = users.findIndex((u) => u.username === updatedUser.username);
    if (index !== -1) {
      users[index] = updatedUser;
      this.saveUsersToStorage(users);
      sessionStorage.setItem(this.currentUserKey, JSON.stringify(updatedUser));
    }
  }

  deleteUser(username: string): void {
    const users = this.getUsersFromStorage();
    const updatedUsers = users.filter((u) => u.username !== username);
    this.saveUsersToStorage(updatedUsers);
  }

  private getUsersFromStorage(): User[] {
    const usersJson = localStorage.getItem(this.storageKey);
    return usersJson ? JSON.parse(usersJson) : [];
  }

  private saveUsersToStorage(users: User[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  logout(): void {
    sessionStorage.removeItem(this.currentUserKey);
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem(this.currentUserKey);
  }

  getCurrentUser(): User | null {
    const currentUserJson = sessionStorage.getItem(this.currentUserKey);
    return currentUserJson ? JSON.parse(currentUserJson) : null;
  }
}
