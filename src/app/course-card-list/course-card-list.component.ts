import { Component, Input, OnInit, Output ,EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { filter, tap } from 'rxjs/operators';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { Course } from '../model/course';

@Component({
  selector: 'course-card-list',
  templateUrl: './course-card-list.component.html',
  styleUrls: ['./course-card-list.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CourseCardListComponent implements OnInit {

  @Input() courses:Course[]
  @Output() private courseChanged = new EventEmitter();
  constructor(private dialog: MatDialog ) { }

  ngOnInit(): void {
  }
  editCourse(course: Course) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "400px";

    dialogConfig.data = course;

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);
    dialogRef.afterClosed().pipe(
      filter(val=>!!val),
      tap(()=>this.courseChanged.emit())
    ).subscribe()
  }
}
