import { Form } from '../picture/form/form.model';
import { User } from '../user/user.model';
import { Product } from '../product/product.model';
import { Project } from '../project/project.model';
import { Companie } from '../companie/companie.model';


export class Quote {
  _id: string = '';
  clients: User[] = [];
  name: string = '';
  statusQuote: number = 0;
  statusQuoteString: string = '';
  typeQuote: string = 'quote';
  quoteNumber: number;
  // _users: User[] = [];
  // ownerQuotes: User[] = [];
  // companieClients: Companie[] = []
  forms: Form[] = [];
  invoices: Quote[] = [];
  products: Product[] = [];
  projects: Project[] = [];
  devisDetails: DevisDetail[] = []
  priceQuote: PriceQuote = new PriceQuote()
  signature: Signature = new Signature()
  detail: Detail = new Detail()
  // paiements: Paiement[] = []
}

export class Detail {
  currency: string = '';
  quoteRef: string = '';
  dateQuote: DateQuote = new DateQuote()
}

export class DateQuote {
  issueDate: Date = new Date();
  issueDateString: string = '';
  expiryDate: Date = new Date();
  expiryDateString: string ='';
}

// export class Paiement {
//   type: string = '';
//   amount: number= 0;
//   datePaiement: Date = new Date();
//   editDateMode : boolean = false
// }

export class Signature {
  base64: string = '';
  isSigned: boolean = false;
  dateSignature: Date;
  users: User[] = [];
}
export class PriceQuote {
  priceQuoteWithoutTaxes: number = 0;
  priceQuoteWithTaxes: number = 0;
  // paiementQuote: number = 0;
  priceQuoteTaxes: PriceQuoteTaxe[] = []
}

export class PriceQuoteTaxe {
  VAT: number = 0;
  TotalVAT: number = 0;
}


export const ModelVATs: number[] = [5.5, 10]


export class BucketProduct {
  typeRow: string = '';
  title: string = '';
  productInit: Product[] = [];
  priceWithoutTaxes: number;
  priceWithTaxes: number;
  totalPriceWithoutTaxes: number;
  totalPriceWithTaxes: number;
  vat: number;
  quantity: number;
  discount: number;
  isEditMode: boolean = false;

}


export class DevisDetail {
  nameBucketProducts: string = '';
  bucketProducts: BucketProduct[] = []
}

export const StatusQuotes =
[
  // {index: 0, label: 'RDV planifié'},
  // {index: 1, label: 'Rappeler'},
  // {index: 2, label: 'Stand-By'},
  // {index: 3, label: 'Devis à faire'},
  {indexStatus: 0, label: 'Pending Approval'},
  {indexStatus: 1, label: 'Signed'},
  {indexStatus: 2, label: 'Rejected'},
  {indexStatus: 3, label: 'Signed, pending paiement'},
  {indexStatus: 4, label: 'Done'},
]

// export class Address {
//   address: string = '';
//   city: string = '';
//   state: string = '';
//   zip: string = '';
// }
