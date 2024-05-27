import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { GitHubRepos } from './model/repository';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'angular-frontend';
  userName:string = 'SloMo128';
  baseUrl:string = 'https://api.github.com/';

  repos: GitHubRepos[];
  errorMessage:string = '';
  constructor(private http: HttpClient) {}
  

  ngOnInit() {
    this.getRepos()
  }

  public getRepos(){
    return this.http.get<GitHubRepos[]>(this.baseUrl + 'users/' + this.userName + '/repos')
    .subscribe({
      next: (response) => {     //Next callback
        this.repos=response;
      },   
      (error) => {        //Error callback
        this.repos=[];
        this.errorMessage=error;
      },      
      () => {             //Complete callback
        console.log('GitHubRepos Completed');
      },
    });
  }

  cerca(contactForm:FormGroup) {
    this.getRepos()
  }
  cancella(contactForm:FormGroup) {
  }
}