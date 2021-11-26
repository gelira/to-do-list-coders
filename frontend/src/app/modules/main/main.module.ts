import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';

import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { TaskService } from './services/task.service';
import { TasksListComponent } from './pages/tasks-list/tasks-list.component';
import { TaskAbstractComponent } from './components/task-abstract/task-abstract.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    TasksListComponent,
    TaskAbstractComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatMenuModule,
  ],
  exports: [
    HomeComponent,
  ],
  providers: [
    TaskService,
  ]
})
export class MainModule { }
