import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";



@Injectable()
export class ApiGithHubServise{
    baseURL: string = 'https://api.github.com/';

    constructor(private http: HttpClient){};
    
    getRepos(userName: string){
        return this.http.get(this.baseURL + 'users/' + userName + '/repos')
    }
}