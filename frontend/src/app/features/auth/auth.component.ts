import { Component } from '@angular/core';
import { BackComponent } from '../../components/back/back.component';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { SvgIconComponent } from 'angular-svg-icon';
import { MatButtonModule } from '@angular/material/button';
// @ts-ignore
const VKID = window.VKIDSDK;

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
        // initVKConfig();
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
      handler: () => {},
    },
  ];
}
