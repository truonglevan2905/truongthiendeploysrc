import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForumsComponent } from './forums/forums.component';
import { MembersComponent } from './members/members.component';
import { TopicsComponent } from './topics/topics.component';
import { TopicDetailComponent } from './topic-detail/topic-detail.component';
import { ThreadComponent } from './thread/thread.component';
import { LoginComponent } from './login/login.component';
import { RegistermemberComponent } from './registermember/registermember.component';
import { HttpClientModule} from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FilterAlphabet} from '../app/members/memberfilters';
import { ForumsService} from './forums.service';
import {TopicServiceService} from './topic-service.service';
import {TopicDetailService} from './topic-detail.service';
import {ThreadService} from './thread.service';
import { CommentsComponent } from './comments/comments.component';
import {CommentsService} from './comments.service'; 
import {NgxPaginationModule} from 'ngx-pagination';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { SocialLoginModule } from 'angularx-social-login';
import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider  } from 'angularx-social-login';
import { CreatetopicComponent } from './createtopic/createtopic.component';
import { HopthuComponent } from './hopthu/hopthu.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SearchConditionComponent } from './search-condition/search-condition.component';
import { MatIconModule, MatSnackBarModule } from '@angular/material';
import { CreatethreadComponent } from './createthread/createthread.component';
import { MatPaginatorModule } from '@angular/material';
import { JwSocialButtonsModule } from 'jw-angular-social-buttons';
import { ChecktopicsComponent } from './checktopics/checktopics.component';
import { MemberManagementComponent } from './member-management/member-management.component';
import { MatFormFieldModule, MatSelectModule} from '@angular/material';
import { InformationmemberComponent } from './informationmember/informationmember.component';
import { DialoginvalidcomponentComponent } from './dialoginvalidcomponent/dialoginvalidcomponent.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { FormatdataPipe } from '../app/pipe/formatdata.pipe';
import { SortDatePipe } from '../app/pipe/sort-date.pipe';
import { SorthopthuPipe } from '../app/pipe/sorthopthu.pipe';
import { AnnouncementAdminComponent } from './announcement-admin/announcement-admin.component';
import { MatProgressSpinnerModule } from '@angular/material';
import { ProgressSpinnerDialogComponentComponent } from './progress-spinner-dialog-component/progress-spinner-dialog-component.component';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { LinkBarComponent } from './link-bar/link-bar.component';
import { ChatComponent } from './chat/chat.component';
import { VideocallComponent } from './videocall/videocall.component';
import { DirectBarComponent } from './direct-bar/direct-bar.component';
import { SafeHtml } from './SafeHtml';


declare var require: any;
const configAPI = require('src/assets/config.json');
const configsocket: SocketIoConfig = { url: configAPI['api_connect'], options: {} };
const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('22065040623-9kpcjkham0iukr08mvi5bhg731r506g2.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('1422002741258233')
  },
  {
    id: LinkedInLoginProvider.PROVIDER_ID,
    provider: new LinkedInLoginProvider('78iqy5cu2e1fgr')
  }
]);
export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    ForumsComponent,
    MembersComponent,
  
    TopicsComponent,
    TopicDetailComponent,
    ThreadComponent,
    LoginComponent,
    RegistermemberComponent,
    FilterAlphabet,
    CommentsComponent,
    ErrorDialogComponent,
    CreatetopicComponent,
    HopthuComponent,
    SearchResultComponent,
    SearchConditionComponent,
    CreatethreadComponent,
    ChecktopicsComponent,
    MemberManagementComponent,
    InformationmemberComponent,
    DialoginvalidcomponentComponent,
    FormatdataPipe,
    SortDatePipe,
    SorthopthuPipe,
    AnnouncementAdminComponent,
    ProgressSpinnerDialogComponentComponent,
    LinkBarComponent,
    ChatComponent,
    VideocallComponent,
    DirectBarComponent,
    SafeHtml,

    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularEditorModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule
    , BrowserAnimationsModule
    , MaterialModule,SocialLoginModule
    , MatIconModule
    , MatPaginatorModule
    , JwSocialButtonsModule
    , MatFormFieldModule
    , MatSelectModule
    , MatSnackBarModule
    , NotifierModule,
    
    MatProgressSpinnerModule,
    
    SocketIoModule.forRoot(configsocket),
    RouterModule.forRoot([
      { path: 'login', component:ChecktopicsComponent },
      {path:'danhgia',component:ChecktopicsComponent},
      { path: '', redirectTo: 'landing', pathMatch: 'full' }
    ]),
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ],
  exports: [FormsModule, SafeHtml],
  
 
  providers: [ForumsService,TopicServiceService,TopicDetailService,ThreadService,CommentsService, {
    provide: AuthServiceConfig,
    useFactory: provideConfig
  }],
  bootstrap: [AppComponent],
  entryComponents: [ErrorDialogComponent,DialoginvalidcomponentComponent,CreatetopicComponent, ProgressSpinnerDialogComponentComponent, ChatComponent]
 
})
export class AppModule { }
