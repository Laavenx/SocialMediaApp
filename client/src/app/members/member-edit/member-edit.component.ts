import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Member } from 'src/app/_interfaces/member';
import { User } from 'src/app/_interfaces/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  @HostListener('window:beforeunload', ['$events']) unloadNotification($event:any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  member: Member | undefined;
  user: User | undefined;

  constructor(private accountService: AccountService, private membersService: MembersService,
    private toastr: ToastrService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => this.user = user
    })
   }

  ngOnInit(): void {
    this.loadMemeber();
  }

  loadMemeber() {
    if (!this.user) return;
    console.log(this.user.uuid)
    this.membersService.getMember(this.user.uuid).subscribe({
      next: member => this.member = member,
    })
  }

  updateMember() {
    this.membersService.updateMember(this.editForm?.value).subscribe({
      next: _ => {
        this.toastr.success('Profile updated successfully')
        this.editForm?.reset(this.member);
      }
    })
  }
}
