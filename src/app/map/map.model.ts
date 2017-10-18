import { Form } from '../picture/form/form.model';
import { User } from '../user/user.model';
import { Project } from '../project/project.model';
import { Companie } from '../companie/companie.model';


export class Map {
    _id: String = '';


    chatName: String = '';
    writtenBy: User[] = [];
    forms: Form[] = [];
    users: User[] = [];
    projects: Project[] = [];
    createdAt: Date = new Date()
    ownerCompanies: Companie[] = []

    // dateMap: DateMap = new DateMap()
}
// export class DateMap {
//   start: Date = new Date()
//   startString: string = '';
//   end: Date = new Date()
//   endString: string = '';
// }
