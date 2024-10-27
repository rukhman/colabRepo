import { Component } from '@angular/core';
import { BackComponent } from '../../components/back/back.component';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { SvgIconComponent } from 'angular-svg-icon';
import { MatButtonModule } from '@angular/material/button';
import * as VKID from '@vkid/sdk';
import { MailOauthService } from './mail/mail-oauth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-auth',
  standalone: true,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  imports: [
    BackComponent,
    RouterModule,
    MatListModule,
    SvgIconComponent,
    MatButtonModule,
  ],
})
export class AuthComponent {
  services = [
    {
      name: 'vk',
      fullName: 'ВКонтакте',
      path: 'assets/icons/vk.svg',
      handler: () => {
        VKID.Config.init({
          app: 52346268, // Идентификатор приложения.
          // redirectUrl: 'https://rukhman.github.io/colabRepo/redirect-auth', // Адрес для перехода после авторизации.
          redirectUrl: 'http://localhost:4200/redirect-auth/', // Адрес для перехода после авторизации.
          state: 'dj29fnsadjsd82', // Произвольная строка состояния приложения.
          codeVerifier: 'FGH767Gd65', // Верификатор в виде случайной строки. Обеспечивает защиту передаваемых данных.
          scope: 'email phone', // Список прав доступа, которые нужны приложению.
          mode: VKID.ConfigAuthMode.InNewTab, // По умолчанию авторизация открывается в новой вкладке.
          // mode: VKID.ConfigAuthMode.Redirect, // По умолчанию авторизация открывается в новой вкладке.
          __debug: true,
        });
        VKID.Auth.login();
      },
    },
    {
      name: 'ya',
      fullName: 'Яндекс',
      path: 'assets/icons/ya.svg',
      handler: () => {},
    },
    {
      name: 'mail',
      fullName: 'Майл.ру',
      path: 'assets/icons/mail.svg',
      handler: () => {
        this.mailOauthService.getAccessToken().subscribe(console.log);
      },
    },
  ];
  constructor(private mailOauthService: MailOauthService) {}
}
