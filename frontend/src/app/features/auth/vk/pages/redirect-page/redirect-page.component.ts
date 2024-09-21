import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as VKID from '@vkid/sdk';

@Component({
  selector: 'app-redirect-page',
  standalone: true,
  imports: [],
  templateUrl: './redirect-page.component.html',
  styleUrl: './redirect-page.component.scss',
})
export class RedirectPageComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    console.log(this.route.snapshot.queryParams);
    VKID.Auth.userInfo(this.route.snapshot.queryParams['code']);
  }
}
