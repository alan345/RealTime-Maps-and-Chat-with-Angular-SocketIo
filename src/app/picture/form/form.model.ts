// export class Form {
//
//   constructor(public textInput1: string, public textInput2: string,
//               public fileUp?: string, public userId?: string, public formId?: string) {
//
//     this.textInput1 = textInput1;
//     this.textInput2 = textInput2;
//     this.fileUp = fileUp;
//     this.userId = userId;
//     this.formId = formId;
//   }
// }
import { User } from '../../user/user.model'


export class Form {
  _id: string;
  owner: User[] = [];
  imagePath: string;
  type: string;
}
