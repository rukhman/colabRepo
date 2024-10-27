import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MailOauthService {
  constructor(private http: HttpClient) {}
  clientId = 'c0eed6960b644ddfa9e3323b498387ae';
  redirectUrl = 'https://shrimpy.netlify.app/redirect-auth';

  getAccessToken(): any {
    return this.http.get<any>(
      `https://connect.mail.ru/oauth/authorize?client_id=${this.clientId}&response_type=token&redirect_uri=${this.redirectUrl}`
    );
  }
}

//https://connect.mail.ru//oauth/authorize?response_type=code&client_id=42843c95725c4b99bf904d1b247b1519&redirect_uri=https://shrimpy.netlify.app/redirect-auth/
