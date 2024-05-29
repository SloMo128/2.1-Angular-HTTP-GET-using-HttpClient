import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { GitHubRepos } from './model/repository';
import { ApiGithHubServise } from './service/api.github.servise';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'angular-frontend';
  userName:string = 'SloMo128';
  baseUrl:string = 'https://api.github.com/';

  repos: GitHubRepos[]=[];
  errorMessage: any;
  errorMessage_msg:string = "L'utente Non esiste";
  loaded: boolean;
  no_data_found: boolean;
  no_data_found_msg: string = "Nessn dato trovato"
  constructor(private gitHubService: ApiGithHubServise) {}
  

  ngOnInit() {
    this.getRepos()
  }

  /*public getRepos() {
    this.repos=[];
    return this.http.get<GitHubRepos[]>( this.baseUrl + 'users/' + this.userName + '/repos')
      .subscribe({
        next: (response: GitHubRepos[]) => {
          if (response.length !== 0) {
            response.map((item: { id: any; name: any; html_url: any; description: any; }) => {
              this.repos.push({
                id: item.id,
                name: item.name,
                html_url: item.html_url,
                description: item.description
              });
            });
            this.loaded = true;
          }
        },
        error: (err): void => {
          this.errorMessage = {
            statusCode: err.status,
            message: err.error.message,
          };
          this.loaded = false;
        },
        complete: () => {
          console.log('Request completed.');
          this.loaded = true;
        },
      });
  }*/

  public getRepos(){
    this.repos=[];
    this.gitHubService.getRepos(this.userName)
    .subscribe({
      next: (response: GitHubRepos[]) => {
        if (response.length != 0) {
          response.map((item: { id: any; name: any; html_url: any; description: any; }) => {
            this.repos.push({
              id: item.id,
              name: item.name,
              html_url: item.html_url,
              description: item.description
            });
          });
          this.loaded = true;
          this.no_data_found = false;
        }
        else{
          this.loaded = false;
          this.no_data_found = true;
        }
          
      },
      error: (err): void => {
        this.errorMessage = {
          statusCode: err.status,
          message: err.error.message,
        };
        this.loaded = false;
      },
      complete: () => {
        console.log('Request completed.');
        //this.loaded = true;
      },
    });
  }

  cerca(contactForm:FormGroup) {
    this.getRepos()
  }
}