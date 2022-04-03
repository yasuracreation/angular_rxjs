import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { Course } from "../model/course";
import { Lesson } from "../model/lesson";

@Injectable({
  providedIn:'root'
})
export class CoursesService{
  constructor(private http:HttpClient){
  }
  loadCourseById(courseId:number){
    return this.http.get<Course>(`/api/courses/${courseId}`).pipe(shareReplay())
  }
  loadAllLessonsByCourseId(courseId:number){
    return this.http.get<Lesson[]>('/api/lessons',{
      params:{courseId:courseId.toString(), pageSize: "10000"}
    }).pipe(
      map(res=>res["payload"]),
      shareReplay())
  }
  saveCourses(courseId:string,changes:Partial<Course>):Observable<any>{
    return this.http.put(`/api/courses/${courseId}`,changes).pipe(shareReplay())
  }
  searchCourses(search:string):Observable<Lesson[]>{
    return this.http.get<Lesson[]>('/api/lessons',{
      params:{filter:search, pageSize: "100"}
    }).pipe(
      map(res=>res["payload"]),
      shareReplay())
  }

}
