import { Form } from '../picture/form/form.model';
import { Companie } from '../companie/companie.model';
import { User } from '../user/user.model';

export class Product {
    _id: string = '';
    details: Details = new Details();
    referenceName: string = '';
    reference: string = '';
    forms: Form[] = [];
    categorie: Categorie = new Categorie();
    owner: User[] = [];
    vendors: Companie[] = [];
}

export class Details {
  unit: string = '';
  referenceName: string = '';
  reference: string = '';
  price: Price = new Price();
  description: string = '';
  dimension: Dimension = new Dimension();
  stock: Stock = new Stock();
}

export class Categorie {
  categ0: Categ[] = [];
  categ1: Categ[] = [];
  categ2: Categ[] = [];
}


export class Categ {
  name: string = '';
}



export class Price {
  costPrice: number = 0;
  sellingPrice: number = 0;
  vat: number = 0;
}
export class Dimension {
  height: number = 0;
  width: number = 0;
  depth: number = 0;
}
export class Stock {
  quantity: number = 0;
}


export const ItemSteps =
[
  {
    'categ':'',
    'subCateg': [
      {
        'categ':'',
        'subCateg': [
          {categ: ''},
        ]
      }
    ]
  }
]
//
// [
//   {
//     "categ":"",
//     "subCateg": [
//       {
//         "categ":"",
//         "subCateg": [
//           {"categ": ""}
//         ]
//       }
//     ]
//   },
//   {
//     "categ":"Serrurerie",
//     "subCateg": [
//       {
//         "categ":"",
//         "subCateg": [
//           {"categ": ""}
//         ]
//       },
//       {
//         "categ":"Serrurerie de bâtiment",
//         "subCateg": [
//           {"categ": "Clés"},
//           {"categ": "Cylindres"},
//           {"categ": "Verrous"}
//         ]
//       },
//       {
//         "categ":"Ferme-portes",
//         "subCateg": [
//           {"categ": "Ferme-portes contemporains"},
//           {"categ": "Ferme-portes technologies à came"},
//           {"categ": "Ferme-portes technologies pignons à crémaillère"}
//         ]
//       },
//       {
//         "categ":"Garnitures de porte",
//         "subCateg": [
//           {"categ": "Equipements de la porte"},
//           {"categ": "Poignées"},
//           {"categ": "Judas"},
//           {"categ": "Garnitures inox"},
//           {"categ": "Accessoires de montage de garnitures de porte"}
//         ]
//       },
//       {
//         "categ":"Sécurité de porte",
//         "subCateg": [
//           {"categ": "Blindage"},
//           {"categ": "Tôles"},
//           {"categ": "Barres de pivot"},
//           {"categ": "Garnitures de sécurité"},
//           {"categ": "Pivots de sol"},
//           {"categ": "Pivots de linteau"}
//         ]
//       }
//     ]
//   },
//
//
//
//
//
//
//   {
//     "categ":"Menuiserie",
//     "subCateg": [
//       {
//         "categ":"",
//         "subCateg": [
//           {"categ": ""}
//         ]
//       },
//       {
//         "categ":"Portes",
//         "subCateg": [
//           {"categ": "Fenêtres bois ou PVC"},
//           {"categ": "Portes et portes fenêtres"},
//           {"categ": "Coulissants bois ou PVC"},
//           {"categ": "Blindage pivot"},
//           {"categ": "Super-blindages"},
//           {"categ": "Pivots"},
//           {"categ": "Blocs-portes"}
//         ]
//       },
//       {
//         "categ":"Fenêtres",
//         "subCateg": [
//           {"categ": "Equipement de la porte et de la fenêtre"},
//           {"categ": "Fermetures de la porte et de la fenêtre"},
//           {"categ": "Etanchéité de la porte et de la fenêtre"},
//           {"categ": "Vitrines"},
//           {"categ": "Habillage"}
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
//     "categ":"Fenêtres",
//     "subCateg": [
//       {
//         "categ":"",
//         "subCateg": [
//           {"categ": ""}
//         ]
//       },
//       {
//         "categ":"Vitrage",
//         "subCateg": [
//           {"categ": "Double vitrages"},
//           {"categ": "Double vitrages de rénovation composition 4-6-4 avec gaz Argon"},
//           {"categ": "Encadrement vitrage PVC"},
//           {"categ": "Double battants"},
//           {"categ": "Porte-fenêtre Bâti Renov Bicouleur double vitrage 442-16-4 avec gaz Argon"},
//           {"categ": "Survitrage"},
//           {"categ": "Vitrage droit avec parcloses"},
//           {"categ": "Vitrage en façade"},
//           {"categ": "Vitrine"},
//           {"categ": "Vitre fixe opaque avec bâti aluminium et fenêtre en ouverture oscillo battants"}
//         ]
//       },
//       {
//         "categ":"Isolation",
//         "subCateg": [
//           {"categ": "Habillage en double joint"},
//           {"categ": "Isolation phonique"},
//           {"categ": "Isolation thermique"}
//         ]
//       },
//       {
//         "categ":"Verre",
//         "subCateg": [
//           {"categ": "Verre couleur bronze sécurité 1"},
//           {"categ": "Verre à la découpe"},
//           {"categ": "Verre armé"},
//           {"categ": "Verre clair"},
//           {"categ": "Verre de sécurité composition"},
//           {"categ": "Verre dépoli acide (opaque)"},
//           {"categ": "Verre double vitrage avec gaz Argon"},
//           {"categ": "Verre feuilleté"},
//           {"categ": "Verre opaque"},
//           {"categ": "Verre simple"},
//           {"categ": "Verre anti-UV"}
//         ]
//       }
//     ]
//   },
//
//
//
//
//   {
//     "categ":"Plomberie",
//     "subCateg": [
//       {
//         "categ":"",
//         "subCateg": [
//           {"categ": ""}
//         ]
//       },
//       {
//         "categ":"Ballon d'eau chaude",
//         "subCateg": [
//           {"categ": "Chauffe-eau gaz"},
//           {"categ": "Chauffe-eau électrique"},
//           {"categ": "Equipement sécurité"}
//         ]
//       },
//       {
//         "categ":"Robinetterie",
//         "subCateg": [
//           {"categ": "Robinetterie de lavabo"},
//           {"categ": "Robinetterie de cuisine"},
//           {"categ": "Robinetterie de douche"}
//         ]
//       },
//       {
//         "categ":"Vanne",
//         "subCateg": [
//           {"categ": "Vanne-compteur"},
//           {"categ": "Electrovannes gaz à réarmement"},
//           {"categ": "Vannes soupape"}
//         ]
//       },
//       {
//         "categ":"Carrelage",
//         "subCateg": [
//           {"categ": "Receveurs"},
//           {"categ": "Receveurs céramiques"},
//           {"categ": "Receveurs à carreler"},
//           {"categ": "Pieds pour receveurs"}
//         ]
//       },
//       {
//         "categ":"Sanitaire",
//         "subCateg": [
//           {"categ": "Cuvettes"},
//           {"categ": "Broyeurs"},
//           {"categ": "Abattants"},
//           {"categ": "Pipes"},
//           {"categ": "Mécanisme de WC"},
//           {"categ": "Réservoir indépendant"},
//           {"categ": "Plaque de déclenchement"},
//           {"categ": "Bidets"},
//           {"categ": "Lavabos et colonnes"}
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
//     "categ":"Électricité",
//     "subCateg": [
//       {
//         "categ":"",
//         "subCateg": [
//           {"categ": ""}
//         ]
//       },
//       {
//         "categ":"Convecteur",
//         "subCateg": [
//           {"categ": "Convecteur électrique CASSETTE RAY SUNAIR 3600TC Thermor, ref : 497091"},
//           {"categ": "Convecteur électrique Thermor Equateur 2000W"},
//           {"categ": "Convecteur gamme Baleares 1500W horizontal tout compris"}
//         ]
//       },
//       {
//         "categ":"Disjoncteur",
//         "subCateg": [
//           {"categ": "Disjoncteur 10A"},
//           {"categ": "Disjoncteur 16A/ 30Mili"},
//           {"categ": "Disjoncteur 20A"},
//           {"categ": "Disjoncteur 32A"},
//           {"categ": "Disjoncteur C2"},
//           {"categ": "Disjoncteur Divers tri"}
//         ]
//       },
//       {
//         "categ":"Eclairage",
//         "subCateg": [
//           {"categ": "Interrupteur"},
//           {"categ": "Projecteurs"},
//           {"categ": "Lampes"}
//         ]
//       },
//       {
//         "categ":"Branchement",
//         "subCateg": [
//           {"categ": "Fils et câbles"},
//           {"categ": "Prises"}
//         ]
//       },
//       {
//         "categ":"Protection",
//         "subCateg": [
//           {"categ": "Protections de l\"habitat"},
//           {"categ": "Cartouches et fusibles"}
//         ]
//       }
//
//     ]
//   },
//
//
//   {
//     "categ": "Chauffage",
//     "subCateg": [
//       {
//         "categ":"",
//         "subCateg": [
//           {"categ": ""}
//         ]
//       },
//       {
//         "categ": "Radiateurs",
//         "subCateg": [
//           {"categ": "Fixations de radiateurs"},
//           {"categ": "Radiateur thermoactif"},
//           {"categ": "Robinetterie de radiateurs"},
//           {"categ": "Accessoires"},
//           {"categ": "Sèche-serviettes"},
//           {"categ": "Habillage"}
//         ]
//       },
//       {
//         "categ":"Chaudière",
//         "subCateg": [
//           {"categ": "Bloc hydraulique"},
//           {"categ": "Système de sécurité surchauffe"},
//           {"categ": "Chaudière électrique"},
//           {"categ": "Thermostat"}
//         ]
//       }
//     ]
//   }
// ]
