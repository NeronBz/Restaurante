import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private storageKey = 'users';
  private currentUserKey = 'currentUser';

  constructor() {}

  register(username: string, password: string): boolean {
    const users = this.getUsersFromStorage();
    const userExists = users.some((u) => u.username === username);

    if (userExists) {
      return false;
    } else {
      users.push({ username, password });
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
      sessionStorage.setItem(this.currentUserKey, JSON.stringify({ username }));
      return true;
    }
    return false;
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
