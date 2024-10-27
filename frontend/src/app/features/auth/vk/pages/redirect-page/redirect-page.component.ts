import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { initVKConfig } from '../../services/vk.config';
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
    console.log(123);
  }
}
