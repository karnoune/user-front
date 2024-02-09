import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";

@Injectable()
export class UserService {

  private usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8085/';
  }

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl + "user-service/api/users/");
  }

  public save(user: User) {
    return this.http.post<any>(this.usersUrl + "user-service/api/users/", user);
  }

  public update(user: User) {
    return this.http.put<User>(this.usersUrl + "user-service/api/users/"+user.id, user);
  }

  public deleteUser(id: number): Observable<any> {
    return this.http.delete<number>(this.usersUrl+ "user-service/api/users/"+id);
  }

  public checkEmailUser(email: string): Observable<any> {
    return this.http.post<string>(this.usersUrl + "user-service/api/users/check-email", email);
  }
}
