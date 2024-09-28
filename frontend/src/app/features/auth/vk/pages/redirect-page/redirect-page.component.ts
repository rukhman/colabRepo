import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// @ts-ignore
const VKID = window.VKIDSDK;
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
    console.log(this.route.snapshot.queryParams['code']);
    console.log(this.route.snapshot.queryParams['device_id']);
    // initVKConfig();
    VKID.Auth.exchangeCode(
      this.route.snapshot.queryParams['code'],
      this.route.snapshot.queryParams['device_id']
    );
  }
}
