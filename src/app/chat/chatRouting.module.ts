import { Routes, RouterModule } from '@angular/router';
import { NgModule }            from '@angular/core';
import { ChatComponent} from './single/chat.component';
// import { ChatsComponent} from './list/chats.component';




export const routes: Routes = [
  // {path: '', component: ChatsComponent},

  // {path: 'chatSingle', component: ChatSingleComponent},
  // {path: 'chatSingle/:id', component: ChatSingleComponent},
  {path: '', component: ChatComponent},
  // {path: 'new/:idClient', component: ChatSingleComponent},
  // {path: ':idChat', component: ChatComponent},



  // {path: 'chats/:id', component: ChatsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRouting {}
