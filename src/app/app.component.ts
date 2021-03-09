import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as uuid from 'uuid';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'demoApp';
  users = [];
  headers = new HttpHeaders({
    Accept: '*/*'
  });
  userForm = this.formBuilder.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required]
  });
  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers() {
    this.http.get('https://j5fucbk7qg.execute-api.eu-west-2.amazonaws.com/get', {headers: this.headers}).subscribe(data => {
      this.users = JSON.parse(JSON.stringify(data));
    }, err => {
      console.log(err.message);
    });
  }

  onSubmit() {
    console.log(this.userForm.value);
    const body = {
      id: uuid.v4(),
      firstname: this.userForm.value.firstname,
      lastname: this.userForm.value.firstname
    };

    if (body.firstname && body.lastname) {
      this.http.post('https://j5fucbk7qg.execute-api.eu-west-2.amazonaws.com/post', body, {headers: this.headers}).subscribe(() => {
        this.getUsers();
        this.userForm.reset();
      }, err => {
        console.log(err.message);
      });
    }
  }

}
