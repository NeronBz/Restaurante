import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userLogin: string = environment.baseUrl + 'login';
  private userRegister: string = environment.baseUrl + 'register';
  private userLogout: string = environment.baseUrl + 'logout';

  private storageKey = 'users';
  private currentUserKey = 'currentUser';

  constructor(private http: HttpClient) {}

  register(
    username: string,
    email: string,
    password: string,
    password2: string
  ): Observable<boolean> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {
      name: username,
      email: email,
      password: password,
      password2: password2,
    };

    return this.http
      .post<any>(this.userRegister, body, { headers: headers })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          console.error('Register error:', error);
          return of(false);
        })
      );
  }

  login(email: string, password: string): Observable<boolean> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {
      email: email,
      password: password,
    };

    return this.http.post<any>(this.userLogin, body, { headers: headers }).pipe(
      map((response) => {
        console.log(response);

        if (response) {
          console.log('Success');

          this.setCurrentUser(response.user);
          return true;
        }
        return false;
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return of(false);
      })
    );
  }

  // updateUser(updatedUser: User): void {
  //   const users = this.getUsersFromStorage();
  //   const index = users.findIndex((u) => u.username === updatedUser.username);
  //   if (index !== -1) {
  //     users[index] = updatedUser;
  //     this.saveUsersToStorage(users);
  //     sessionStorage.setItem(this.currentUserKey, JSON.stringify(updatedUser));
  //   }
  // }

  // deleteUser(username: string): void {
  //   const users = this.getUsersFromStorage();
  //   const updatedUsers = users.filter((u) => u.username !== username);
  //   this.saveUsersToStorage(updatedUsers);
  // }

  private saveUsersToStorage(users: User[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  logout(): Observable<any> {
    sessionStorage.removeItem(this.currentUserKey);
    return this.http.post<any>(this.userLogout, null);
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem(this.currentUserKey);
  }

  private setCurrentUser(user: User): void {
    sessionStorage.setItem(this.currentUserKey, JSON.stringify(user));
  }

  // getUser(userId: string): User {

  // }

  getCurrentUser(): User | null {
    const currentUserJson = sessionStorage.getItem(this.currentUserKey);
    return currentUserJson ? JSON.parse(currentUserJson) : null;
  }
}
