import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailsComponent } from './member/member-details/member-details.component';
import { MemberEditComponent } from './member/member-edit/member-edit.component';
import { MemberListComponent } from './member/member-list/member-list.component';
import { MemberMessageComponent } from './member/member-message/member-message.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guard/auth.guard';
import { PreventUnsavedChangesGuard } from './_guard/prevent-unsaved-changes.guard';
import { MemberDetailedResolver } from './_resolvers/member-detailed.resolver';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: '',
   runGuardsAndResolvers: 'always',
   canActivate: [AuthGuard],
   children: [
    {path: 'member', component: MemberListComponent},
    {path: 'member/:id', component: MemberDetailsComponent, resolve: {members: MemberDetailedResolver}},
    {path: 'members/edit', component: MemberEditComponent, canDeactivate:[PreventUnsavedChangesGuard]},
   // {path: 'member/message/:id', component: MemberMessageComponent},
    {path: 'list', component: ListsComponent},
    {path: 'messages', component: MessagesComponent},
   ]
  },
  {path: '**', component: HomeComponent, pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
