import { Form } from '../picture/form/form.model';
import { User } from '../user/user.model';
import { Project } from '../project/project.model';


export class UserCalendar {
    _id: string = '';
    title: string = '';
    start: Date = new Date();
    end: Date = new Date();
    color: string = '';
    // description: string = '';
    // clients: User[] = [];
    clients: User[] = [];
    assignedTos: User[] = [];
    projects: Project[] = [];
    isActiveEvent: boolean = false;
    // color: Color = new Color();
    draggable: boolean = true;
    resizable: Resizable = new Resizable();
    details: Details = new Details();
    // assignedTo: User[] = [];
    // forms: Form[] = [];
    //
    // categorie: Categorie = new Categorie();
    // quotes: Quote[] = [];
}


export class SearchData {
  fetchedUserSearchs: User[] = [];
  fetchedProjectSearchs: Project[] = [];
  typeUser = ''
}

export class Details {
  description: string = '';
}
export class Resizable {
  beforeStart: boolean = true;
  afterEnd: boolean = true;
}


export class Color {
  primary: string = '';
  secondary: string = '';
}
