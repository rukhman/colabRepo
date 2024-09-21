import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-redirect-page',
  standalone: true,
  imports: [],
  templateUrl: './redirect-page.component.html',
  styleUrl: './redirect-page.component.scss',
})
export class RedirectPageComponent implements OnInit {
  ngOnInit(): void {
    console.log(123);
  }
}
