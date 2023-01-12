import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { take } from 'rxjs';
import { Message } from 'src/app/_interfaces/message';
import { User } from 'src/app/_interfaces/user';
import { AccountService } from 'src/app/_services/account.service';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.scss']
})
export class MemberMessagesComponent implements OnInit {
  @ViewChild('messageForm') messageForm?: NgForm
  @Input() username?: string;
  //messages: Message[] = [];
  messageContent = '';

  constructor(public messageService: MessageService) {}

  ngOnInit(): void {
    this.messageService.messageThread$.subscribe({
      next: x => console.log(x)
    }
    )
  }

  // loadMessages() {
  //   this.messageService.getMessageThread(this.username).subscribe({
  //     next: messages => this.messages = messages
  //   })
  // }

  sendMessage() {
    if (!this.username) return;
    this.messageService.sendMessage(this.username, this.messageContent).then(() => {
      this.messageForm?.reset();
    })
  }

}
