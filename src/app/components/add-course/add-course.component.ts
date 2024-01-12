import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/models/course.model';
import { FileHandle } from 'src/app/models/file-handle.model';
import { TaskTwoService } from 'src/app/service/task-two.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent {
  courses: Course[] = []
  //new
  course:Course={
    id:"",
    name:"",
    price:0,
    courseImages:[]
  }
  constructor(private taskservice: TaskTwoService, private httpClient: HttpClient, private sanitizer:DomSanitizer,private activatedroute:ActivatedRoute) { }
 ngOnInit():void{
  this.course=this.activatedroute.snapshot.data['course']
 }
  public onFileChanged(event: any) {
    //this.selectedFile = event.target.files[0];
   if (event.target.files){
    const file=event.target.files[0];
    const fileHandle:FileHandle={
      file:file,
      url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
    }
    this.course.courseImages.push(fileHandle)
   }
    
  }
  getAllCourses() {
    this.taskservice.getAllCourses().subscribe(
      (response: Course[]) => {
        this.courses = response;
      }
    );
  }
  addCourse(addForm: NgForm): void {
    const productFormData=this.prepareFormData(this.course)
    this.taskservice.addCourse(productFormData).subscribe(
      (response: Course) => {
        console.log(response);
        this.getAllCourses();
      }
    );

  }
  prepareFormData(course:Course):FormData{
    const formData=new FormData();
    formData.append(
      'course', new Blob([JSON.stringify(course)],{type:'application/json'})
    );
   for (let i = 0; i < course.courseImages.length; i++) {
     formData.append('imageFile',course.courseImages[i].file,
     course.courseImages[i].file.name
     );
   }
   return formData
  }
}
