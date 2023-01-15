import {HttpClient} from '@angular/common/http';
import {Component, OnInit, ViewChild} from '@angular/core';
import {IonModal, ModalController} from '@ionic/angular';
import {Pizza} from '../models';
import {adminPage, DataService, Message} from '../services/data.service';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  public messages: Message[] = this.data.getMessages().slice(0, 4);
  public pizzas: Pizza[];
  public orderpizza: Pizza[];

  public total: number = 0;
  constructor(private data: DataService,
              private http: HttpClient) {
    this.orderpizza = [];
  }

  ngOnInit() {

    this.http.get<Pizza[]>('https://ynov.jcatania.io/daily-pizzas')
      .subscribe(pizzas => {
        this.pizzas = pizzas;
      });
  }

  add(i,j) {
    return i+j;
  }

  refresh(ev) {
    this.messages = this.messages.concat(this.data.getMessages().slice(4, 10));
    ev.detail.complete();
    this.ngOnInit();
  }

  onChildEvent(ev) {
    console.log(ev);
  }

  addpizza(selectedpizza: Pizza) {
    this.orderpizza.push(selectedpizza);
    console.log(this.orderpizza);
    this.total = Number(this.total) + Number(selectedpizza.prix);
  }

  delpizza(selectedpizza: Pizza) {
    for(let i = 0; i < this.orderpizza.length; i++) {
      if(this.orderpizza[i] === selectedpizza) {
        this.orderpizza.splice(i, 1);
      }
    }
    console.log(this.orderpizza);
    this.total = Number(this.total) - Number(selectedpizza.prix);
  }

  getorderpizza() {
    return this.orderpizza;
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  public name = '';
  public message = '';

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

}
