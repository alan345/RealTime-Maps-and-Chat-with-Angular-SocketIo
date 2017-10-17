import { Form } from '../picture/form/form.model';
import { User } from '../user/user.model';

export class Companie {
  _id: string = '';
  nameCompanie: string = '';
  typeCompanie: string = '';
  phoneNumber: string= '';
  address: Address = new Address();
  option: Option = new Option();
  users: User[] = [];
  forms: Form[] = [];
  // categJson: CategJson = new CategJson();
  categories = new Categorie()
  typeUsers: TypeUsers[] = []
  planDetail = new PlanDetail()
  rights: Rigth[] = [];
  banck: Banck = new Banck()
}
export class TypeUsers {
  value: string = '';
}

export class Banck {
  serviceSelected: string = '';
  stripe: Stripe = new Stripe()
}
export class Stripe {
  secretKey: string = '';
}

export class Rigth {
  nameRight: string = '';
  permissions: Permission[] = []
}

export class Permission {
  namePermission: string = '';
  access: Access[] = []
}



export class Access {
  typeAccess: string= '';
}

export class PlanDetail {
  current_period_end: Date
  plan: string= '';
}

export class Categorie {
  categCategorie: Categorie0[] = []
  categProject: Categorie0[] = []
}


export class Categorie0 {
  categ: string= '';
  isFlagged: boolean = false;
  subCateg: Categorie1[] = []
}

export class Categorie1 {
  categ: string= '';
  subCateg: Categorie2[] = []
}

export class Categorie2 {
  categ: string= '';

}

// export class CategJson {
//   categCategorie: string= '';
//   categProject: string= '';
// }
export class Option {
  calendar: Calendar = new Calendar();
}
export class Calendar {
  timeBegin: number = 8;
  timeEnd: number = 19;
}

export class Address {
  address: string = '';
  city: string = '';
  state: string = '';
  zip: string = '';
}
