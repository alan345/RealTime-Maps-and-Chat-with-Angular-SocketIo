import { Routes, RouterModule } from '@angular/router';
import { NgModule }            from '@angular/core';
import { CommentComponent} from './single/comment.component';
import { CommentsComponent} from './list/comments.component';




export const routes: Routes = [
  {path: '', component: CommentsComponent},

  // {path: 'commentSingle', component: CommentSingleComponent},
  // {path: 'commentSingle/:id', component: CommentSingleComponent},
  {path: 'new', component: CommentComponent},
  // {path: 'new/:idClient', component: CommentSingleComponent},
  {path: ':idComment', component: CommentComponent},



  // {path: 'comments/:id', component: CommentsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentRouting {}
