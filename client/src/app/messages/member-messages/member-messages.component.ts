import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { Member } from 'src/app/_interfaces/member';
import { User } from 'src/app/_interfaces/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.scss']
})
export class MemberMessagesComponent implements OnInit {
  @ViewChild('sendMessageInput') sendMessageInput: ElementRef;
  @ViewChild('messageForm') messageForm?: NgForm;
  @ViewChildren('messages') messageList: QueryList<any>;
  @ViewChild('messages') messageListTest: ElementRef;
  @Input() uuid?: string;
  member: Member | undefined;
  messageContent = '';
  currentUser: User | undefined;
  SpanLength: number;
  previousMessages: number;
  nextMessages: HTMLElement;
  previousMessageCount: number = 0;

  constructor(private accountService: AccountService, public messageService: MessageService,
    private route: ActivatedRoute, private membersService: MembersService) {}

  ngOnInit(): void {
    this.loadMember();
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        this.currentUser = user;
      }
    });
  }

  ngAfterViewChecked() {
    if (this.messageListTest) {
      let messageCount = this.messageListTest.nativeElement.childElementCount;
      console.log(messageCount, this.previousMessageCount);
      if (messageCount > this.previousMessageCount) {
        this.messageListTest.nativeElement.lastElementChild.scrollIntoView();
        this.previousMessageCount = messageCount;
      }
    }
  }

  sendMessage() {
    if (!this.uuid) return;
    this.messageService.sendMessage(this.uuid, this.messageContent).then(() => {
      this.messageForm?.reset();
    });
  }

  sendMessageChange(event: Event) {
    let target = event.target as HTMLElement;
    this.SpanLength = target.innerHTML.length;
    if (target.innerText.length > 1024) {
      return;
    } else {
      this.messageForm.controls['messageContent'].setValue(target.innerText);
    }
  }

  loadMember() {
    this.route.queryParams
      .subscribe(params => {
        this.membersService.getMember(params.user).subscribe({
          next: (member) => {
            this.member = member;
          }
        })
      });
  }

  resetSpan() {
    this.sendMessageInput.nativeElement.innerHTML = "";
  }
}
