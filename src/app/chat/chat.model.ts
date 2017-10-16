import { Form } from '../picture/form/form.model';
import { User } from '../user/user.model';
import { Quote } from '../quote/quote.model';
import { Project } from '../project/project.model';
import { Companie } from '../companie/companie.model';


export class Chat {
    _id: string = '';


    chatName: string = '';
    writtenBy: User[] = [];
    forms: Form[] = [];
    projects: Companie[] = [];
    quotes: Quote[] = [];
    createdAt: Date = new Date()

    // dateChat: DateChat = new DateChat()
}
// export class DateChat {
//   start: Date = new Date()
//   startString: string = '';
//   end: Date = new Date()
//   endString: string = '';
// }
