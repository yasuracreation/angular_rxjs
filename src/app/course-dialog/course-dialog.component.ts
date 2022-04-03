import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {Course} from "../model/course";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import * as moment from 'moment';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import { CoursesService } from '../services/courses-service';
import { LoaderService } from '../loading/loader-service';
import { MessagesService } from '../messages/message-service';
import { CourseStore } from '../services/course.store';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css'],
    providers:[LoaderService,MessagesService]
})
export class CourseDialogComponent implements AfterViewInit {

    form: FormGroup;

    course:Course;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) course:Course,private courseStore:CourseStore, private messageService:MessagesService) {

        this.course = course;

        this.form = fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [course.longDescription,Validators.required]
        });

    }

    ngAfterViewInit() {

    }

    save() {
      const changes = this.form.value;
      const saveCourses$ = this.courseStore.saveCourse(this.course.id,changes).pipe(
        catchError(err => {
          const message = "Could not save course";
          console.error(message,err)
          this.messageService.showErrors(message);
          return throwError(err)
        })
      ).subscribe()
      this.dialogRef.close(changes);
    }

    close() {
        this.dialogRef.close();
    }

}
