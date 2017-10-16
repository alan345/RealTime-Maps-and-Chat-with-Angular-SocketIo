import { Form } from '../picture/form/form.model';
import { User } from '../user/user.model';
import { Quote } from '../quote/quote.model';
import { Project } from '../project/project.model';
import { Companie } from '../companie/companie.model';


export class Comment {
    _id: string = '';


    commentName: string = '';
    writtenBy: User[] = [];
    forms: Form[] = [];
    projects: Companie[] = [];
    quotes: Quote[] = [];
    createdAt: Date = new Date()

    // dateComment: DateComment = new DateComment()
}
// export class DateComment {
//   start: Date = new Date()
//   startString: string = '';
//   end: Date = new Date()
//   endString: string = '';
// }
