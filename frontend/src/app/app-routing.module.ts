import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTaskComponent } from './modules/main/pages/create-task/create-task.component';

import { HomeComponent } from './modules/main/pages/home/home.component';
import { TasksListComponent } from './modules/main/pages/tasks-list/tasks-list.component';
import { UpdateTaskComponent } from './modules/main/pages/update-task/update-task.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'update-task/:id',
        component: UpdateTaskComponent
      },
      {
        path: 'create-task',
        component: CreateTaskComponent
      },
      {
        path: 'tasks-list',
        component: TasksListComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/tasks-list'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
