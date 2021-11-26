import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { TaskService } from './services/task.service';
import { TasksListComponent } from './pages/tasks-list/tasks-list.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    TasksListComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    HomeComponent,
  ],
  providers: [
    TaskService,
  ]
})
export class MainModule { }
