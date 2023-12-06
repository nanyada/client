import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}

  currentUser$: Observable<User | null> = of(null)

  constructor(private toastr: ToastrService, private router: Router, public accountService: AccountService) { }
  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$
  }

  getCurrentUser() {
    this.accountService.currentUser$.subscribe({
      next: user => console.log(user),
      error: err => this.toastr.error(err)
    })
  }

  login(): void {
    this.accountService.login(this.model).subscribe({
      next: response => {
        this.router.navigateByUrl('/members')
      },
      error: err => console.log(err)
    })
  }
  logout() {
    this.accountService.logout()
    this.router.navigateByUrl('/')
  }
}

