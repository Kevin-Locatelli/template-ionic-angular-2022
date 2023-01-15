import { Component } from '@angular/core';
import {Pizza} from "../models";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-admin',
  templateUrl: 'admin.page.html',
  styleUrls: ['admin.page.scss']
})
export class AdminPage {

  public pizzas: Pizza[];
  public pizzaz: Pizza;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Pizza[]>('https://ynov.jcatania.io/daily-pizzas')
      .subscribe(pizzas => {
        this.pizzas = pizzas;
      });
  }

  public setpizza(pizza: string) {
    for (let i = 0; i < this.pizzas.length; i++) {
      if(this.pizzas[i].nom === pizza) {
        this.pizzaz = this.pizzas[i];
      }

    }
    console.log(this.pizzaz);
  }

  addpizza(id: number, nom: string, ingredients: number[], description: string, photo: string, prix: number) {

    // eslint-disable-next-line @typescript-eslint/naming-convention,@typescript-eslint/no-shadow
    const Pizza = {id, nom, ingredients, description, photo, prix};
    const response = this.http.post('https://ynov.jcatania.io/daily-pizzas', Pizza).subscribe();
    console.log(response);
  }

  delpizza(id: number) {
    const response = this.http.delete('https://ynov.jcatania.io/daily-pizzas/' + id).subscribe();
    console.log(response);
  }

  modpizza(id: number, nom: string, ingredients: number[], description: string, photo: string, prix: number) {
    this.delpizza(id);
    this.addpizza(id, nom, ingredients, description, photo, prix);
  }
}

