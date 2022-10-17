import {HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../models';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  public user: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.http.get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
      .subscribe(user => {
        user.avatarUrl = `https://i.pravatar.cc/350?u=${user.id}`;
        this.user = user;
      });
  }

}
