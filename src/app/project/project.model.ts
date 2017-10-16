import { Form } from '../picture/form/form.model';
import { User } from '../user/user.model';
import { Quote } from '../quote/quote.model';
import { Task } from '../task/task.model';


export class Project {
    _id: string = '';
    details: Details = new Details()
    status: number = 0;
    clients: User[] = [];
    assignedTos: User[] = [];
    // forms: Form[] = [];
    logs: Log[] = [];
    categorie: Categorie = new Categorie();
    bucketTasks: BucketTasks[] = []
    progressTasks: number = 0;
    dateProject: DateProject = new DateProject()
}

export class Log {
  comment: string = '';
  by: User[] = [];
  forms: Form[] = [];
  date: Date = new Date()
}
export class DateProject {
  creationDate: Date = new Date()
  creationDateString: string = '';
}
export class BucketTasks {
  bucketName: string = '';
  openNewTask: boolean = false;
  tasks: Task[] = []
}
//
// export class Task {
//   name: string = '';
//   status: string = '';
//   editMode: boolean = false;
//   description: string = '';
//   assignedTos: User[] = [];
//   dateTask: DateTask = new DateTask()
// }
//
//
// export class DateTask {
//   creationDate: Date = new Date()
//   creationDateString: string = '';
//   endDate: Date = new Date()
//   endDateString: string = '';
// }




export class Details {
  name: string = '';
  description: string = '';
}

export class Categorie {
  categ0: Categ[] = [];
  categ1: Categ[] = [];
  categ2: Categ[] = [];
}

export class Categ {
  name: string = '';
}

export const StatusProject =
[
  {index: 0, label: 'Started'},
  {index: 10, label: 'Done'},
]
// [
//   {index: 0, label: 'RDV planifié'},
//   {index: 1, label: 'Rappeler'},
//   {index: 2, label: 'Stand-By'},
//   {index: 3, label: 'Devis à faire'},
//   {index: 4, label: 'Attente Validation'},
//   {index: 5, label: 'Devis validée, A envoyer'},
//   {index: 6, label: 'Attente approbation'},
//   {index: 7, label: 'Devis refusé'},
//   {index: 8, label: 'Devis accepté – Attente acompte'},
//   {index: 9, label: 'En cours de réalisation'},
//   {index: 10, label: 'Terminé'},
// ]
// export const ItemSteps =
// [
//
//
//   {
//     'categ':'Devis Rénovation',
//     'subCateg': [
//
//       {
//         'categ':'Cuisine',
//         'subCateg': [
//           {categ: 'ok'},
//         ]
//       },
//       {
//         'categ':'Salle de Bain',
//         'subCateg': [
//           {categ: 'ok'},
//         ]
//       },
//       {
//         'categ':'Remise en conformité électrique',
//         'subCateg': [
//           {categ: 'ok'},
//         ]
//       },
//       {
//         'categ':'Maçonnerie',
//         'subCateg': [
//           {categ: 'ok'},
//         ]
//       },
//       {
//         'categ':'Peinture',
//         'subCateg': [
//           {categ: 'ok'},
//         ]
//       },
//       {
//         'categ':'PMR',
//         'subCateg': [
//           {categ: 'ok'},
//         ]
//       }
//     ]
//   },
//
//
//
//
//   {
//     'categ':'Intervention Immédiate',
//     'subCateg': [
//
//       {
//         'categ':'Plomberie',
//         'subCateg': [
//           {categ: 'Recherche de Fuite'},
//           {categ: 'Réparation De Fuite'},
//           {categ: 'Engorgement de canalisation'},
//           {categ: 'Ballon Eau chaude en panne'},
//           {categ: 'Robinneterie en panne'},
//           {categ: 'Wc en panne'},
//           {categ: 'Innondation'},
//         ]
//       },
//       {
//         'categ':'Electricité',
//         'subCateg': [
//           {categ: 'Recherche de panne électrique'},
//           {categ: 'Remplacement de tableau électrique '},
//         ]
//       },
//       {
//         'categ':'Serrurerie',
//         'subCateg': [
//           {categ: 'ouverture de porte'},
//           {categ: 'Remplacement de serrure'},
//         ]
//       },
//       {
//         'categ':'Vitrerie',
//         'subCateg': [
//           {categ: 'Remplacement de vitre à la coupe'},
//           {categ: 'Fermeture Provisoire'},
//         ]
//       },
//       {
//         'categ':'Chauffage',
//         'subCateg': [
//           {categ: 'Fuite Chaudiere ou Radiateur'},
//           {categ: 'Recherche de panne chaudiere'},
//           {categ: 'Contrat Entretien'},
//           {categ: 'Remplacement de Chaudiere '},
//         ]
//       }
//     ]
//   },
//
//
//
//
//   {
//     'categ':'Devis Installation',
//     'subCateg': [
//
//       {
//         'categ':'Menuiserie',
//         'subCateg': [
//           {categ: 'Double Vitrage rénovation'},
//           {categ: 'Vitre / Vitrine'},
//           {categ: 'Fenêtres'},
//           {categ: 'Survitrage'},
//         ]
//       },
//       {
//         'categ':'Chauffage',
//         'subCateg': [
//           {categ: 'Remplacement de chaudiere'},
//           {categ: 'Déplacement de chaudiere'},
//           {categ: 'Installation de radiateur'},
//         ]
//       },
//       {
//         'categ':'Petite Electricité',
//         'subCateg': [
//           {categ: 'Tirage de ligne électrique'},
//           {categ: 'Rajout de prise'},
//         ]
//       },
//       {
//         'categ':'Serrurerie',
//         'subCateg': [
//           {categ: 'Installation d\'une serrure de sécurité'},
//           {categ: 'Blindage de porte'},
//           {categ: 'Remplacement de porte'},
//         ]
//       },
//       {
//         'categ':'Plomberie',
//         'subCateg': [
//           {categ: 'Remplacement de Ballon eau chaude'},
//           {categ: 'Remplacement de robinneterie'},
//           {categ: 'Remplacement de WC'},
//           {categ: 'Tirage de ligne '},
//         ]
//       },
//       {
//         'categ':'Electricité',
//         'subCateg': [
//           {categ: 'Installation ou Remplacement Convecteur'},
//
//         ]
//       }
//     ]
//   },
//
//
//
//
//
//   {
//     'categ':'Électricité',
//     'subCateg': [
//
//       {
//         'categ':'Convecteur',
//         'subCateg': [
//           {categ: 'Convecteur électrique CASSETTE RAY SUNAIR 3600TC Thermor, ref : 497091'},
//           {categ: 'Convecteur électrique Thermor Equateur 2000W'},
//           {categ: 'Convecteur gamme Baleares 1500W horizontal tout compris'},
//         ]
//       },
//       {
//         'categ':'Disjoncteur',
//         'subCateg': [
//           {categ: 'Disjoncteur 10A'},
//           {categ: 'Disjoncteur 16A/ 30Mili'},
//           {categ: 'Disjoncteur 20A'},
//           {categ: 'Disjoncteur 32A'},
//           {categ: 'Disjoncteur C2'},
//           {categ: 'Disjoncteur Divers tri'},
//         ]
//       },
//       {
//         'categ':'Eclairage',
//         'subCateg': [
//           {categ: 'Interrupteur'},
//           {categ: 'Projecteurs'},
//           {categ: 'Lampes'},
//         ]
//       },
//       {
//         'categ':'Branchement',
//         'subCateg': [
//           {categ: 'Fils et câbles'},
//           {categ: 'Prises'},
//         ]
//       },
//       {
//         'categ':'Protection',
//         'subCateg': [
//           {categ: 'Protections de l\'habitat'},
//           {categ: 'Cartouches et fusibles'},
//         ]
//       },
//
//     ]
//   },
//
//
//   {
//     'categ': 'Chauffage',
//     'subCateg': [
//
//       {
//         'categ': 'Radiateurs',
//         'subCateg': [
//           {categ: 'Fixations de radiateurs'},
//           {categ: 'Radiateur thermoactif'},
//           {categ: 'Robinetterie de radiateurs'},
//           {categ: 'Accessoires'},
//           {categ: 'Sèche-serviettes'},
//           {categ: 'Habillage'},
//         ]
//       },
//       {
//         'categ':'Chaudière',
//         'subCateg': [
//           {categ: 'Bloc hydraulique'},
//           {categ: 'Système de sécurité surchauffe'},
//           {categ: 'Chaudière électrique'},
//           {categ: 'Thermostat'},
//         ]
//       },
//     ]
//   },
// ]
