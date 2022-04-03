import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { map, shareReplay, tap } from "rxjs/operators";
import { User } from "../model/user";

@Injectable({
  providedIn : "root"
})
export class AuthStore{

  private subject = new BehaviorSubject<User>(null);

  AUTH_DATA="auth_data";
  user$: Observable<User> = this.subject.asObservable();
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  constructor(private http:HttpClient){
    this.isLoggedIn$ = this.user$.pipe(map(user=> !!user));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggIn => !loggIn));
    const user = localStorage.getItem(this.AUTH_DATA);
    if(user){
      this.subject.next(JSON.parse(user));
    }
  }
  login(email:string , password:string):Observable<User>{
      return this.http.post<User>("/api/login", {email,password})
      .pipe(
        tap((user)=>{
          this.subject.next(user);
          localStorage.setItem(this.AUTH_DATA,JSON.stringify(user));
        }),
        shareReplay()
        )
  }
  logout(){
    this.subject.next(null);
    localStorage.removeItem(this.AUTH_DATA);

  }
}
