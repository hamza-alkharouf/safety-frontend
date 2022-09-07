import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class CoinService {

  constructor(private http: HttpClient) {
  }

  coins(page: number,pageSize: number,search:string) {
    console.log('zzzzzzzzzz',search);
    if(search){
      console.log(`${environment.api}/coins?page=${page}&page-size=${pageSize}&search=${search}`);
      return this.http.get(`${environment.api}/coins?page=${page}&page-size=${pageSize}&search=${search}`);
    }else{
      console.log(`${environment.api}/coins?page=${page}&page-size=${pageSize}`);
      return this.http.get(`${environment.api}/coins?page=${page}&page-size=${pageSize}`);
    }

  }

}
