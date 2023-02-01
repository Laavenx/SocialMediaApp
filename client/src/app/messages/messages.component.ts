import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { Message } from '../_interfaces/message';
import { Pagination } from '../_interfaces/pagination';
import { User } from '../_interfaces/user';
import { AccountService } from '../_services/account.service';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  userQueryString?: string;
  user?: User;

  constructor(private route: ActivatedRoute, public messageService: MessageService,
    private accountService: AccountService, private router: Router) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if (user) this.user = user;
      }
    });
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.userQueryString = params.user;
      });
    
    if (this.user && this.userQueryString) {
      this.messageService.createHubConnection(this.user, this.userQueryString);
    } else {
      this.messageService.stopHubConnection();
    }
  }

  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }
}
