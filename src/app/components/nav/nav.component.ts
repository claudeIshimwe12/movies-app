import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit {
  currentRoute!: string;
  currentRoute$!: Observable<string>;
  showDialog = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url.slice(1, event.url.length);
      }
    });
  }

  ngOnInit() {
    this.route.url.subscribe((event) => {
      if (event[0]) {
        this.currentRoute = event[0].path;
      } else {
        this.currentRoute = '';
      }
    });
    this.currentRoute$ = this.route.url.pipe(map((d) => d[0].path));
  }
  onAvatarClick() {
    this.showDialog = !this.showDialog;
  }
  onLogOut() {
    this.showDialog = false;
    this.authService.logout();
  }
}
