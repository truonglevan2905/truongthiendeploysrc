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
import { MatIconModule } from '@angular/material';
import { CreatethreadComponent } from './createthread/createthread.component';
import { MatPaginatorModule } from '@angular/material';
import { JwSocialButtonsModule } from 'jw-angular-social-buttons';
import { ChecktopicsComponent } from './checktopics/checktopics.component';
import { MemberManagementComponent } from './member-management/member-management.component';
import { MatFormFieldModule, MatSelectModule} from '@angular/material';
import { InformationmemberComponent } from './informationmember/informationmember.component';
import { DialoginvalidcomponentComponent } from './dialoginvalidcomponent/dialoginvalidcomponent.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const configsocket: SocketIoConfig = { url: 'http://localhost:3000', options: {} };
const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('298608384746-7h4kc2475k4u337dcbdu27f9llqsh4j6.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('269883347224444')
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
    , MatSelectModule,
    SocketIoModule.forRoot(configsocket),
    RouterModule.forRoot([
      { path: 'login', component:ChecktopicsComponent },
      {path:'danhgia',component:ChecktopicsComponent},
      { path: '', redirectTo: 'landing', pathMatch: 'full' }
    ]),
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ],
  exports: [FormsModule],
  
 
  providers: [ForumsService,TopicServiceService,TopicDetailService,ThreadService,CommentsService, {
    provide: AuthServiceConfig,
    useFactory: provideConfig
  }],
  bootstrap: [AppComponent],
  entryComponents: [ErrorDialogComponent,DialoginvalidcomponentComponent,CreatetopicComponent]
 
})
export class AppModule { }
