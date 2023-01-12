import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
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
  constructor(private memberSerivce: MembersService, private toastr: ToastrService,
    public presenceService: PresenceService) { }

  ngOnInit(): void {
  }

  addLike(member: Member) {
    this.memberSerivce.addLike(member.userName).subscribe({ 
      next: () => this.toastr.success('you have liked ' + member.knownAs),
      error: (err) => this.toastr.error(err)
    })
  }

}
