import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Lesson } from '../model/lesson';

@Component({
  selector: 'lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent  {
  @Input()lesson:Lesson;
  constructor(private sanitizer:DomSanitizer){}
  transformUrl(url){
   return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
