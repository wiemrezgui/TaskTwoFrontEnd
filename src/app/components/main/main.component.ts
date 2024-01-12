import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Course } from 'src/app/models/course.model';
import { TaskTwoService } from 'src/app/service/task-two.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
courses:Course[]=[]
constructor(private route:Router,private taskservice:TaskTwoService){}
ngOnInit(){
  this.getAllCourses()
}
Edit(id:any){
  this.route.navigate(['/editCourse/'+id])
  }
  getAllCourses() {
    this.taskservice.getAllCourses().subscribe(
      (response: Course[]) => {
        this.courses = response;        
      }
    );
  }
  
  deleteCourse(id:any): void {
    this.taskservice.deleteCourse(Number(id)).subscribe(
      (response: void) => {
        this.getAllCourses();
      }

    );
  }
}
