import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_interfaces/member';
import { MembersService } from 'src/app/_services/members.service';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {
  member: Member | undefined;

  constructor(private membersService: MembersService, private route: ActivatedRoute,
    public presenceService: PresenceService, private toastr: ToastrService, private router: Router ) { }

  ngOnInit(): void {
    this.loadMember();
    this.getImages();
  }

  getImages() {
    if (!this.member) return;
    const imageUrls = [];
    for (const photo of this.member.photos) {
      imageUrls.push(photo.url);
    }
    return imageUrls;
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
      },
      error: (err) => this.toastr.error(err)
    })
  }

  sendMessage() {
    this.router.navigateByUrl(
      this.router.createUrlTree(
        ['/messages'], {queryParams: { user: this.member.uuid }}
      )
    );
  }

  loadMember() {
    const uuid = this.route.snapshot.paramMap.get('uuid');
    this.membersService.getMember(uuid).subscribe({
      next: (member) => {
        this.member = member;
      }
    })
  }
}
