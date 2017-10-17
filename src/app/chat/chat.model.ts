import { Form } from '../picture/form/form.model';
import { User } from '../user/user.model';
import { Strat } from '../strat/strat.model';
import { Mission } from '../mission/mission.model';
import { Project } from '../project/project.model';
import { Companie } from '../companie/companie.model';


export class Chat {
    _id: string = '';


    chatName: string = '';
    writtenBy: User[] = [];
    forms: Form[] = [];
    users: User[] = [];
    projects: Companie[] = [];
    strats: Strat[] = [];
    missions: Mission[] = [];
    createdAt: Date = new Date()
    ownerCompanies: Companie[]=[]

    // dateChat: DateChat = new DateChat()
}
// export class DateChat {
//   start: Date = new Date()
//   startString: string = '';
//   end: Date = new Date()
//   endString: string = '';
// }
