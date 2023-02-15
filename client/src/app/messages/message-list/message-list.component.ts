import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/_interfaces/message';
import { Pagination } from 'src/app/_interfaces/pagination';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {
  messages?: Message[];
  pagination?: Pagination;
  container = 'Outbox';
  pageNumber = 1;
  PageSize = 10;
  messagesExists: boolean = false;
  
  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this.messageService.getMessages(this.pageNumber, this.PageSize, this.container).subscribe({
      next: response => {
        this.messages = response.result;
        this.pagination = response.pagination;
        if(this.messages.length > 0) {
          this.messagesExists = true;
        }
      }
    })
  }

  deleteMessage(id: number) {
    this.messageService.deleteMessage(id).subscribe({
      next: () => this.messages?.splice(this.messages.findIndex(m => m.id === id), 1)
    })
  }

  pageChanged(event: any) {
    if (this.pageNumber !== event.page){
      this.pageNumber = event;
      this.loadMessages();
    }
  }
}
