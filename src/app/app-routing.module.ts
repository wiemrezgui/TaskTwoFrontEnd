import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { AddCourseComponent } from './components/add-course/add-course.component';

const routes: Routes = [
  {path:"",component:AddCourseComponent},
  {path:"editCourse/:id",component:EditCourseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
