import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Message} from '../services/data.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  @Input() message: Message;
  @Output() event = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {

    setTimeout(() => {
      this.event.emit('coucou');
    }, 1000);
  }

  isIos() {
    const win = window as any;
    return win && win.Ionic && win.Ionic.mode === 'ios';
  }
}
