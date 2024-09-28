import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VKAuthApiService {
  base = 'http://localhost:4200/';
  // @ts-ignore
  // vksdk = window['VKIDSDK'];
  constructor(private http: HttpClient) {}

  vkAuth() {}
}
