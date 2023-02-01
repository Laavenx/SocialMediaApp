import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { take } from 'rxjs';
import { AccountService } from 'src/app/_services/account.service';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.scss']
})
export class MemberMessagesComponent implements OnInit {
  @ViewChild('messageForm') messageForm?: NgForm
  @Input() uuid?: string;
  messageContent = '';
  userKnownAs: string;

  constructor(private accountService: AccountService, public messageService: MessageService) { }

  ngOnInit(): void {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        this.userKnownAs = user.knownAs
      }
    });
  }

  sendMessage() {
    if (!this.uuid) return;
    this.messageService.sendMessage(this.uuid, this.messageContent).then(() => {
      this.messageForm?.reset();
    });
  }

}
