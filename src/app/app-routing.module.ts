import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForumsComponent } from './forums/forums.component';
import { MembersComponent } from './members/members.component';
import { TopicDetailComponent } from './topic-detail/topic-detail.component';
import { ThreadComponent } from './thread/thread.component';
import {LoginComponent} from './login/login.component';
import {RegistermemberComponent} from './registermember/registermember.component';
import {CommentsComponent} from './comments/comments.component';
import { HopthuComponent } from './hopthu/hopthu.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { CreatethreadComponent } from './createthread/createthread.component';
import {ChecktopicsComponent} from './checktopics/checktopics.component';
import { MemberManagementComponent } from './member-management/member-management.component';
import { InformationmemberComponent } from './informationmember/informationmember.component';
import { AnnouncementAdminComponent } from './announcement-admin/announcement-admin.component';
import {VideocallComponent} from './videocall/videocall.component';
import {ChatComponent} from './chat/chat.component';
const routes: Routes = [
  { path: '', redirectTo: 'forums', pathMatch: 'full' },
  { path: 'forums', component: ForumsComponent },
  { path: 'members', component: MembersComponent },
  { path: 'topic', component: TopicDetailComponent },
  { path: 'thread/:threadId', component: CommentsComponent},
  { path:'login', component:LoginComponent},
  {path:'registernember',component:RegistermemberComponent},
  {path:'topic/:topicName',component:TopicDetailComponent},
  {path:'hopthu',component:HopthuComponent},
  { path: 'search/:key', component: SearchResultComponent},
  {path:'createthread/:name',component:CreatethreadComponent},
  {path:'danhgia',component:ChecktopicsComponent},
  {path:'danhgiacheck',component:ChecktopicsComponent},
  {path:'informationmember',component:InformationmemberComponent},
  { path: 'memberManage/:username', component: MemberManagementComponent},
  {path:'threadID/:threadId',component:AnnouncementAdminComponent},
  {path:'chat',component:ChatComponent},
  {path:'call',component:VideocallComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
