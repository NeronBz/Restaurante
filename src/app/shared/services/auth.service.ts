import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private storageKey = 'users';
  private currentUserKey = 'currentUser';

  constructor() {}

  register(username: string, password: string): boolean {
    const users = this.getUsersFromStorage();
    const user = users.find((u) => u.username === username);

    if (user) {
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
      sessionStorage.setItem('currentUser', JSON.stringify({ username }));
      return true;
    } else {
      return false;
    }
  }

  private getUsersFromStorage(): User[] {
    const usersJson = localStorage.getItem(this.storageKey);
    return usersJson ? JSON.parse(usersJson) : [];
  }

  private saveUsersToStorage(users: User[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  logout(): void {
    sessionStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem(this.currentUserKey);
  }

  getCurrentUser(): User | null {
    const currentUserJson = sessionStorage.getItem(this.currentUserKey);
    if (currentUserJson) {
      return JSON.parse(currentUserJson);
    }
    return null;
  }
}
