import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VKAuthApiService {
  base = 'http://localhost:4200/';
  constructor(private http: HttpClient) {}

  vkAuth() {}
}
