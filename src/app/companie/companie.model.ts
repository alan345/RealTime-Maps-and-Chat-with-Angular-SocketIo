import { Form } from '../picture/form/form.model';
import { User } from '../user/user.model';
import { Address } from '../user/user.model';


export class Companie {
  _id: string = '';
  nameCompanie: string = '';
  // typeCompanie: string = '';
  isSupplier: boolean = false;
  phoneNumber: string= '';
  faxNumber: string= '';
  email: string= '';
  VAT: string= '';
  address: Address[] = [];
  option: Option = new Option();
  users: User[] = [];
  forms: Form[] = [];
  // categJson: CategJson = new CategJson();
  categories = new Categorie()
  typeUsers: TypeUsers[] = []
  planDetail = new PlanDetail()
  rights: Rigth[] = [];
  banck: Banck = new Banck()
  contactsPerson: ContactsPerson[] = []
}


export class ContactsPerson {
  contactType: string = '';
  contactName: string = '';
  contactFirstName: string = '';
  contactPhoneNumber: string = '';
  contactEmail: string = '';
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
  categProduct: Categorie0[] = []
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
//   categProduct: string= '';
//   categProject: string= '';
// }
export class Option {
  calendar: Calendar = new Calendar();
}

export class Calendar {
  timeBegin: string = '06:00:00';
  timeEnd: string = '19:00:00';
  slotDuration: string = '00:30:00';

  timeBeginbusinessHours: string = '10:00:00';
  timeEndbusinessHours: string = '17:00:00';
}
//
// export class Address {
//   nameAddress: string = '';
//   address: string = '';
//   city: string = '';
//   state: string = '';
//   zip: string = '';
//   country: string = '';
//
// }
