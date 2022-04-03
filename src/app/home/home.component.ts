import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Course, sortCoursesBySeqNo} from '../model/course';
import {interval, noop, Observable, of, throwError, timer} from 'rxjs';
import {catchError, delay, delayWhen, filter, finalize, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CourseDialogComponent} from '../course-dialog/course-dialog.component';
import { CoursesService } from '../services/courses-service';
import { LoaderService } from '../loading/loader-service';
import { MessagesService } from '../messages/message-service';
import { CourseStore } from '../services/course.store';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;


  constructor( private courseStore:CourseStore ) {

  }

  ngOnInit() {
    this.reloadCourses()
  }
  reloadCourses(){
    this.beginnerCourses$ = this.courseStore.filterByCategory("BEGINNER");
    this.advancedCourses$ =this.courseStore.filterByCategory("ADVANCED");
  }



}




