import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_interfaces/member';
import { MembersService } from 'src/app/_services/members.service';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss'],
})
export class MemberCardComponent implements OnInit {
  @Input() member: Member | undefined;
  @Output() unFollow = new EventEmitter();

  constructor(private membersService: MembersService, private toastr: ToastrService,
    public presenceService: PresenceService, private router: Router) { }

  ngOnInit(): void {
  }

  addFollow(member: Member) {
    this.membersService.addFollow(member.id).subscribe({ 
      next: () => {
        if (!this.member.isLiked) {
          this.toastr.success('You followed ' + member.knownAs)
        } else {
          this.toastr.warning('You unfollowed ' + member.knownAs)
        }
        this.member.isLiked = !this.member.isLiked
        this.unFollow.emit();
      },
      error: (err) => this.toastr.error(err)
    })
  }

  sendMessage(member: Member) {
    this.router.navigateByUrl(
      this.router.createUrlTree(
        ['/messages'], {queryParams: { user: this.member.uuid }}
      )
    );
  }

}
