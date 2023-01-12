import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
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
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];

  constructor(private membersService: MembersService, private route: ActivatedRoute,
    public presenceService: PresenceService ) { }

  ngOnInit(): void {
    this.loadMember();

    this.galleryOptions = [
      {
        width: '400px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Fade,
        preview: false
      }
    ]
  }

  getImages(): NgxGalleryImage[] {
    if (!this.member) return;
    const imageUrls = [];
    for (const photo of this.member.photos) {
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url
      })
    }

    return imageUrls;
  }

  loadMember() {
    const username = this.route.snapshot.paramMap.get('username');
    this.membersService.getMember(username).subscribe({
      next: (member) => {
        this.member = member;
        this.galleryImages = this.getImages();
      }
    })
  }
}
