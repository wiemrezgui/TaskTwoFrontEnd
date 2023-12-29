import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Course } from 'src/app/models/course.model';
import { TaskTwoService } from 'src/app/service/task-two.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent {
  course: any = {}
  courses: Course[] = []
  selectedFile !: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string = "";
  imageName: any;
  constructor(private taskservice: TaskTwoService, private httpClient: HttpClient) { }
  public onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
  }
  onUpload() {
    console.log(this.selectedFile);
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.httpClient.post('http://localhost:8080/image/upload', uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Image uploaded successfully';
        } else {
          this.message = 'Image not uploaded successfully';
        }
      }
      );
  }
  getImage() {
    this.httpClient.get('http://localhost:8080/image/get/' + this.imageName)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }
  getAllCourses() {
    this.taskservice.getAllCourses().subscribe(
      (response: Course[]) => {
        this.courses = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }
  addCourse(addForm: NgForm): void {
    const button = document.getElementById("addbtn");
    if (button) {
      button.click();
    }
    this.taskservice.CreateCourse(addForm.value).subscribe(
      (response: Course) => {
        console.log(response);
        this.getAllCourses();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    );

  }
}
