import { Component } from '@angular/core';
import { DataService, Message } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public messages: Message[] = this.data.getMessages().slice(0, 4);

  constructor(private data: DataService) {}

  refresh(ev) {
    this.messages = this.messages.concat(this.data.getMessages().slice(4, 10));
    ev.detail.complete();
  }
}
