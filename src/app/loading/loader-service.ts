import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { concatMap, finalize, tap } from "rxjs/operators";

@Injectable()
export class LoaderService{
    private loadingSubject = new BehaviorSubject<boolean>(false);
    loading$: Observable<boolean> = this.loadingSubject.asObservable();
    showLoaderUntilComplite<T>(obs$:Observable<T>):Observable<T>{
      return of(null)
      .pipe(
        tap(()=>this.loadingOn()),
        concatMap(()=>obs$),
        finalize(()=>this.loadingEnd())
      )
    }
    loadingOn(){
        this.loadingSubject.next(true);
    }
    loadingEnd(){
      this.loadingSubject.next(false);
    }
}
