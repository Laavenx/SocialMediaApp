import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FileUploadModule } from 'ng2-file-upload';
import { TimeagoModule } from 'ngx-timeago';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { environment } from 'src/environments/environment';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right'
    }),
    NgxSpinnerModule.forRoot({
      type: 'ball-square-spin'
    }),
    FileUploadModule,
    TimeagoModule.forRoot(),
  ],
  providers: [],
  exports: [
    ToastrModule,
    NgxSpinnerModule,
    FileUploadModule,
    TimeagoModule
  ]
})
export class SharedModule { }
