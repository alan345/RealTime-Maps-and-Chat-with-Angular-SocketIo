import { Form } from '../picture/form/form.model';
import { User } from '../user/user.model';
import { Strat } from '../strat/strat.model';
import { Project } from '../project/project.model';
import { Companie } from '../companie/companie.model';


export class Log {
    _id: string = '';


    type: string = '';


    projects: Companie[] = [];
    users: User[] = [];
    strats: Strat[] = [];
    documents: Document[] = [];
    createdAt: Date = new Date()




    // dateLog: DateLog = new DateLog()
}
// export class DateLog {
//   start: Date = new Date()
//   startString: string = '';
//   end: Date = new Date()
//   endString: string = '';
// }
