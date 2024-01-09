import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/models/course.model';
import { TaskTwoService } from 'src/app/service/task-two.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent {
  obj:any={}
  id: any
  data:any={}
  courses:Course[]=[]
  selectedFile !: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string="";
  imageName: any;
  constructor(private activatedrouter:ActivatedRoute,private taskservice:TaskTwoService,private httpClient:HttpClient) { }
  ngOnInit() {
    this.id=this.activatedrouter.snapshot.paramMap.get("id")
    if (this.id != null && this.id != undefined){
      this.getCourseById(this.id)
  }}
  public onFileChanged(event:any) {
    this.selectedFile = event.target.files[0];
  }
  onUpload() {
    console.log(this.selectedFile);
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
      this.httpClient.post('http://localhost:8083/image/upload', uploadImageData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'Image uploaded successfully';
        } else {
          this.message = 'Image not uploaded successfully';
        }
      }
      );}
      getImage() {
        this.httpClient.get('http://localhost:8083/image/get/' + this.imageName)
          .subscribe(
            res => {
              this.retrieveResonse = res;
              this.base64Data = this.retrieveResonse.picByte;
              this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
            }
          );
      }
  getCourseById(id:any){
  this.taskservice.getCourseById(id).subscribe(
    (reponse:Course) =>{
      this.obj=reponse
    }
  )  
  }
  getAllCourses() {
    this.taskservice.getAllCourses().subscribe(
      (response: Course[]) => {
        this.courses = response;
      }
    );
  }
  updateCourse(course:Course): void {
    const button = document.getElementById("editbtn");
    if (button) {
      button.click();
    }
    this.taskservice.updateCourse(course).subscribe(
      (response: Course) => {
        console.log(response);
        this.getAllCourses();
      }
    );

  }
}
