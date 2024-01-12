import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskTwoService {

  private url = "http://localhost:8086/api/task";
  constructor(private http: HttpClient) { }
  addCourse(CourseRequest: FormData) {
    return this.http.post<Course>(this.url + "/create", CourseRequest);
  }
  getAllCourses() {
    return this.http.get<any>(this.url);
  }
  getCourseById(id:Number){
return this.http.get<any>(this.url+`/${id}`)
  }
  public updateCourse(CourseRequest: Course): Observable<Course> {
    return this.http.put<Course>(this.url + "/update", CourseRequest);
  }
  public deleteCourse(id: Number): Observable<void> {
    return this.http.delete<void>(this.url + `/delete/${id}`);
  }
}
