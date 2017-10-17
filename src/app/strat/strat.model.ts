import { Form } from '../picture/form/form.model';
import { User } from '../user/user.model';
// import { Quote } from '../quote/quote.model';
import { Categorie } from '../categorie/categorie.model';

import { Project, DateDjoa } from '../project/project.model';


export class Strat {
    _id: string = '';
    projects: Project[] = []
    title: string = '';
    editMode: boolean = false;
    description: string = '';
    stratType: string = '';
    dateStrat: DateDjoa = new DateDjoa()
    users: User[] = [];
    // categories: Categorie[] = [];
    // start: Date = new Date()
    // startString: string = '';
    // end: Date = new Date()
    // endString: string = '';

    // dateStrat: DateStrat = new DateStrat()
}
// export class DateStrat {
//   start: Date = new Date()
//   startString: string = '';
//   end: Date = new Date()
//   endString: string = '';
// }

// export const typeStrats = [
//   'strat',
//   'content',
//   'research',
//   'other',
// ]
