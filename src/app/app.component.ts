import {Component, OnInit} from '@angular/core';
import { LoaderService } from './loading/loader-service';
import { MessagesService } from './messages/message-service';
import { AuthStore } from './services/auth.store';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit {

    constructor(public auth:AuthStore) {

    }

    ngOnInit() {


    }

  logout() {
    this.auth.logout()
  }

}
