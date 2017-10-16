import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {CompanieService} from '../companie.service';
import {UserService} from '../../user/user.service';


import {Companie, Categorie0, ContactsPerson} from '../companie.model';
import {Address} from '../../user/user.model';

import {ToastsManager} from 'ng2-toastr';

import {MatDialog } from '@angular/material';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import { DeleteDialog } from '../../deleteDialog/deleteDialog.component';
import { User } from '../../user/user.model';

// import { EditOptionsComponentDialog } from '../../form/modalLibrary/modalLibrary.component';
import { PaiementService} from '../../user/paiement/paiement.service';


@Component({
  selector: 'app-editCompanie',
  templateUrl: './editCompanie.component.html',
  styleUrls: ['../companie.component.css'],
})
export class EditCompanieComponent implements OnInit {
  @Output() saved: EventEmitter<any> = new EventEmitter();
  @Input() showBackButton: Boolean = true;
  fetchedCompanie: Companie = new Companie()

  // userAdmins : User[] = []
  // userManagers : User[] = []
  // userClients : User[] = []
  // usersSalesRep : User[] = []
  // userStylists : User[] = []
  myForm: FormGroup;
  // seeRights = false;
  seeCategProject = false;
  seeCategProduct = false;
  // isMyCompanyRoute: Boolean = false
  servicesBancks = ['stripe', 'paypal']
  // typesRights = [
  //   {name : 'Project', value: 'project'},
  //   {name : 'Quote', value: 'qute'},
  //   {name : 'Reporting', value: 'reporting'},
  // ]
  constructor(
    private companieService: CompanieService,
//    private modalService: NgbModal,
    private toastr: ToastsManager,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private _fb: FormBuilder,
    private authService:AuthService,
    private userService: UserService,
    private paiementService: PaiementService,
  ) {}

  ngOnInit() {
    this.getStripeAccountDetails()
    this.myForm = this._fb.group({
      nameCompanie: ['', [Validators.required, Validators.minLength(2)]],
      phoneNumber: [''],
      VAT: [''],
      isSupplier: [''],
      faxNumber: [''],
      email: [''],
      // categJson: this._fb.group({
      //   categProduct: [''],
      //   categProject: ['']
      // }),


        timeBegin: ['', [Validators.required, Validators.minLength(1)]],
        timeEnd: ['', [Validators.required, Validators.minLength(1)]],

        timeBeginbusinessHours: ['', [Validators.required, Validators.minLength(1)]],
        timeEndbusinessHours: ['', [Validators.required, Validators.minLength(1)]],

        slotDuration: [''],

        address: [''],
        city: [''],
        state: [''],
        zip: [''],
        country: [''],

      _users: this._fb.array([]),

      secretKey:[''],
      serviceSelected:[''],
    })




    this.getCurrentUser()
    this.activatedRoute.params.subscribe((params: Params) => {
      if(params['id']) {
        if(params['id'] === 'mine') {
          this.getCompanie('')
          // this.isMyCompanyRoute = true

        } else {
          this.getCompanie(params['id'])
        }
      }
    })
  }
  addTypeUser() {
    this.fetchedCompanie.typeUsers.push({value: ''})
  }
  getStripeAccountDetails() {
    this.paiementService.getStripeCust()
      .subscribe(
        res => {
          console.log(res)
        },
        error => { console.log(error) }
      )
  }


  newAddress() {
    let newAddress = new Address()
    this.fetchedCompanie.address.push(newAddress)
  }
  removeAddress(i) {
    this.fetchedCompanie.address.splice(i, 1);
  }
  newContact() {
    let newContact = new ContactsPerson()
    this.fetchedCompanie.contactsPerson.push(newContact)
  }
  removeContact(i) {
    this.fetchedCompanie.contactsPerson.splice(i, 1);
  }
  isMyCompanie() {
    let currentUser = this.authService.getCurrentUser()
    // console.log(currentUser)
    return currentUser.ownerCompanies.some(obj => {
      return obj._id === this.fetchedCompanie._id
    })

  }


  addCateg(typeCateg, level, index1, index2, index3) {
      let newCategorie = new Categorie0()
      if(level === 0)
        this.fetchedCompanie.categories[typeCateg].unshift(newCategorie)
      if(level === 1)
        this.fetchedCompanie.categories[typeCateg][index1].subCateg.unshift(newCategorie)
      if(level === 2)
        this.fetchedCompanie.categories[typeCateg][index1].subCateg[index2].subCateg.unshift(newCategorie)

  }
  removeTypeUser(i) {
    this.fetchedCompanie.typeUsers.splice(i, 1)
  }

  removeCateg(typeCateg, level, index1, index2, index3) {
      if(level === 0)
        this.fetchedCompanie.categories[typeCateg].splice(level, 1)
      if(level === 1)
        this.fetchedCompanie.categories[typeCateg].splice(index1, 1)
      if(level === 2)
        this.fetchedCompanie.categories[typeCateg][index1].subCateg.splice(index2, 1)
      if(level === 3)
        this.fetchedCompanie.categories[typeCateg][index1].subCateg[index2].subCateg.splice(index3, 1)
  }


  fetchedCurrentUser: User = new User()
  getCurrentUser() {
    this.userService.getUser('')
      .subscribe(
        res => { this.fetchedCurrentUser = res },
        error => { console.log(error) }
      )
  }
  getPicture(result){

  }
  // openDialog(positionImage: string) {
  //   // let dialogRef = this.dialog.open(EditOptionsComponentDialog);
  //   // dialogRef.afterClosed().subscribe(result => {
  //   //   if(result) {
  //   //     this.fetchedCompanie.forms.push(result)
  //   //   }
  //   // })
  // }

  // removeForm(i: number) {
  //     this.fetchedCompanie.forms.splice(i, 1)
  //     this.save();
  // }

  initDataToRemove(){
        this.fetchedCompanie.categories.categProduct = [
          {
            "categ":"Serrurerie",
            "isFlagged" : false,
            "subCateg": [
              {
                "categ":"Serrurerie de bâtiment",
                "subCateg": [
                  {"categ": "Clés"},
                  {"categ": "Cylindres"},
                  {"categ": "Verrous"}
                ]
              },
              {
                "categ":"Ferme-portes",
                "subCateg": [
                  {"categ": "Ferme-portes contemporains"},
                  {"categ": "Ferme-portes technologies à came"},
                  {"categ": "Ferme-portes technologies pignons à crémaillère"}
                ]
              },
              {
                "categ":"Garnitures de porte",
                "subCateg": [
                  {"categ": "Equipements de la porte"},
                  {"categ": "Poignées"},
                  {"categ": "Judas"},
                  {"categ": "Garnitures inox"},
                  {"categ": "Accessoires de montage de garnitures de porte"}
                ]
              },
              {
                "categ":"Sécurité de porte",
                "subCateg": [
                  {"categ": "Blindage"},
                  {"categ": "Tôles"},
                  {"categ": "Barres de pivot"},
                  {"categ": "Garnitures de sécurité"},
                  {"categ": "Pivots de sol"},
                  {"categ": "Pivots de linteau"}
                ]
              }
            ]
          },

          {
            "categ":"Menuiserie",
            "isFlagged" : false,
            "subCateg": [

              {
                "categ":"Portes",
                "subCateg": [
                  {"categ": "Fenêtres bois ou PVC"},
                  {"categ": "Portes et portes fenêtres"},
                  {"categ": "Coulissants bois ou PVC"},
                  {"categ": "Blindage pivot"},
                  {"categ": "Super-blindages"},
                  {"categ": "Pivots"},
                  {"categ": "Blocs-portes"}
                ]
              },
              {
                "categ":"Fenêtres",
                "subCateg": [
                  {"categ": "Equipement de la porte et de la fenêtre"},
                  {"categ": "Fermetures de la porte et de la fenêtre"},
                  {"categ": "Etanchéité de la porte et de la fenêtre"},
                  {"categ": "Vitrines"},
                  {"categ": "Habillage"}
                ]
              }
            ]
          },





          {
            "categ":"Fenêtres",
            "isFlagged" : false,
            "subCateg": [

              {
                "categ":"Vitrage",
                "subCateg": [
                  {"categ": "Double vitrages"},
                  {"categ": "Double vitrages de rénovation composition 4-6-4 avec gaz Argon"},
                  {"categ": "Encadrement vitrage PVC"},
                  {"categ": "Double battants"},
                  {"categ": "Porte-fenêtre Bâti Renov Bicouleur double vitrage 442-16-4 avec gaz Argon"},
                  {"categ": "Survitrage"},
                  {"categ": "Vitrage droit avec parcloses"},
                  {"categ": "Vitrage en façade"},
                  {"categ": "Vitrine"},
                  {"categ": "Vitre fixe opaque avec bâti aluminium et fenêtre en ouverture oscillo battants"}
                ]
              },
              {
                "categ":"Isolation",
                "subCateg": [
                  {"categ": "Habillage en double joint"},
                  {"categ": "Isolation phonique"},
                  {"categ": "Isolation thermique"}
                ]
              },
              {
                "categ":"Verre",
                "subCateg": [
                  {"categ": "Verre couleur bronze sécurité 1"},
                  {"categ": "Verre à la découpe"},
                  {"categ": "Verre armé"},
                  {"categ": "Verre clair"},
                  {"categ": "Verre de sécurité composition"},
                  {"categ": "Verre dépoli acide (opaque)"},
                  {"categ": "Verre double vitrage avec gaz Argon"},
                  {"categ": "Verre feuilleté"},
                  {"categ": "Verre opaque"},
                  {"categ": "Verre simple"},
                  {"categ": "Verre anti-UV"}
                ]
              }
            ]
          },




          {
            "categ":"Plomberie",
            "isFlagged" : false,
            "subCateg": [

              {
                "categ":"Ballon d'eau chaude",
                "subCateg": [
                  {"categ": "Chauffe-eau gaz"},
                  {"categ": "Chauffe-eau électrique"},
                  {"categ": "Equipement sécurité"}
                ]
              },
              {
                "categ":"Robinetterie",
                "subCateg": [
                  {"categ": "Robinetterie de lavabo"},
                  {"categ": "Robinetterie de cuisine"},
                  {"categ": "Robinetterie de douche"}
                ]
              },
              {
                "categ":"Vanne",
                "subCateg": [
                  {"categ": "Vanne-compteur"},
                  {"categ": "Electrovannes gaz à réarmement"},
                  {"categ": "Vannes soupape"}
                ]
              },
              {
                "categ":"Carrelage",
                "subCateg": [
                  {"categ": "Receveurs"},
                  {"categ": "Receveurs céramiques"},
                  {"categ": "Receveurs à carreler"},
                  {"categ": "Pieds pour receveurs"}
                ]
              },
              {
                "categ":"Sanitaire",
                "subCateg": [
                  {"categ": "Cuvettes"},
                  {"categ": "Broyeurs"},
                  {"categ": "Abattants"},
                  {"categ": "Pipes"},
                  {"categ": "Mécanisme de WC"},
                  {"categ": "Réservoir indépendant"},
                  {"categ": "Plaque de déclenchement"},
                  {"categ": "Bidets"},
                  {"categ": "Lavabos et colonnes"}
                ]
              }
            ]
          },





          {
            "categ":"Électricité",
            "isFlagged" : false,
            "subCateg": [

              {
                "categ":"Convecteur",
                "subCateg": [
                  {"categ": "Convecteur électrique CASSETTE RAY SUNAIR 3600TC Thermor, ref : 497091"},
                  {"categ": "Convecteur électrique Thermor Equateur 2000W"},
                  {"categ": "Convecteur gamme Baleares 1500W horizontal tout compris"}
                ]
              },
              {
                "categ":"Disjoncteur",
                "subCateg": [
                  {"categ": "Disjoncteur 10A"},
                  {"categ": "Disjoncteur 16A/ 30Mili"},
                  {"categ": "Disjoncteur 20A"},
                  {"categ": "Disjoncteur 32A"},
                  {"categ": "Disjoncteur C2"},
                  {"categ": "Disjoncteur Divers tri"}
                ]
              },
              {
                "categ":"Eclairage",
                "subCateg": [
                  {"categ": "Interrupteur"},
                  {"categ": "Projecteurs"},
                  {"categ": "Lampes"}
                ]
              },
              {
                "categ":"Branchement",
                "subCateg": [
                  {"categ": "Fils et câbles"},
                  {"categ": "Prises"}
                ]
              },
              {
                "categ":"Protection",
                "subCateg": [
                  {"categ": "Protections de l\"habitat"},
                  {"categ": "Cartouches et fusibles"}
                ]
              }

            ]
          },


          {
            "categ": "Chauffage",
            "isFlagged" : false,
            "subCateg": [

              {
                "categ": "Radiateurs",
                "subCateg": [
                  {"categ": "Fixations de radiateurs"},
                  {"categ": "Radiateur thermoactif"},
                  {"categ": "Robinetterie de radiateurs"},
                  {"categ": "Accessoires"},
                  {"categ": "Sèche-serviettes"},
                  {"categ": "Habillage"}
                ]
              },
              {
                "categ":"Chaudière",
                "subCateg": [
                  {"categ": "Bloc hydraulique"},
                  {"categ": "Système de sécurité surchauffe"},
                  {"categ": "Chaudière électrique"},
                  {"categ": "Thermostat"}
                ]
              }
            ]
          }
        ]


         this.fetchedCompanie.categories.categProject = [
      {
        "categ":"Devis Rénovation",
        "isFlagged" : true,
        "subCateg": [

          {
            "categ":"Salle de Bain",
            "subCateg": [
              {"categ": "ok"}
            ]
          },
          {
            "categ":"Remise en conformité électrique",
            "subCateg": [
              {"categ": "ok"}
            ]
          },
          {
            "categ":"Maçonnerie",
            "subCateg": [
              {"categ": "ok"}
            ]
          },
          {
            "categ":"Peinture",
            "subCateg": [
              {"categ": "ok"}
            ]
          },
          {
            "categ":"PMR",
            "subCateg": [
              {"categ": "ok"}
            ]
          }
        ]
      },




      {
        "categ":"Intervention Immédiate",
        "isFlagged" : true,
        "subCateg": [

          {
            "categ":"Plomberie",
            "subCateg": [
              {"categ": "Recherche de Fuite"},
              {"categ": "Réparation De Fuite"},
              {"categ": "Engorgement de canalisation"},
              {"categ": "Ballon Eau chaude en panne"},
              {"categ": "Robinneterie en panne"},
              {"categ": "Wc en panne"},
              {"categ": "Innondation"}
            ]
          },
          {
            "categ":"Electricité",
            "subCateg": [
              {"categ": "Recherche de panne électrique"},
              {"categ": "Remplacement de tableau électrique "}
            ]
          },
          {
            "categ":"Serrurerie",
            "subCateg": [
              {"categ": "ouverture de porte"},
              {"categ": "Remplacement de serrure"}
            ]
          },
          {
            "categ":"Vitrerie",
            "subCateg": [
              {"categ": "Remplacement de vitre à la coupe"},
              {"categ": "Fermeture Provisoire"}
            ]
          },
          {
            "categ":"Chauffage",
            "subCateg": [
              {"categ": "Fuite Chaudiere ou Radiateur"},
              {"categ": "Recherche de panne chaudiere"},
              {"categ": "Contrat Entretien"},
              {"categ": "Remplacement de Chaudiere "}
            ]
          }
        ]
      },




      {
        "categ":"Devis Installation",
        "isFlagged" : true,
        "subCateg": [

          {
            "categ":"Menuiserie",
            "subCateg": [
              {"categ": "Double Vitrage rénovation"},
              {"categ": "Vitre / Vitrine"},
              {"categ": "Fenêtres"},
              {"categ": "Survitrage"}
            ]
          },
          {
            "categ":"Chauffage",
            "subCateg": [
              {"categ": "Remplacement de chaudiere"},
              {"categ": "Déplacement de chaudiere"},
              {"categ": "Installation de radiateur"}
            ]
          },
          {
            "categ":"Petite Electricité",
            "subCateg": [
              {"categ": "Tirage de ligne électrique"},
              {"categ": "Rajout de prise"}
            ]
          },
          {
            "categ":"Serrurerie",
            "subCateg": [
              {"categ": "Installation d\"une serrure de sécurité"},
              {"categ": "Blindage de porte"},
              {"categ": "Remplacement de porte"}
            ]
          },
          {
            "categ":"Plomberie",
            "subCateg": [
              {"categ": "Remplacement de Ballon eau chaude"},
              {"categ": "Remplacement de robinneterie"},
              {"categ": "Remplacement de WC"},
              {"categ": "Tirage de ligne "}
            ]
          },
          {
            "categ":"Electricité",
            "subCateg": [
              {"categ": "Installation ou Remplacement Convecteur"}

            ]
          }
        ]
      },





      {
        "categ":"Électricité",
        "isFlagged" : false,
        "subCateg": [

          {
            "categ":"Convecteur",
            "subCateg": [
              {"categ": "Convecteur électrique CASSETTE RAY SUNAIR 3600TC Thermor, ref : 497091"},
              {"categ": "Convecteur électrique Thermor Equateur 2000W"},
              {"categ": "Convecteur gamme Baleares 1500W horizontal tout compris"}
            ]
          },
          {
            "categ":"Disjoncteur",
            "subCateg": [
              {"categ": "Disjoncteur 10A"},
              {"categ": "Disjoncteur 16A/ 30Mili"},
              {"categ": "Disjoncteur 20A"},
              {"categ": "Disjoncteur 32A"},
              {"categ": "Disjoncteur C2"},
              {"categ": "Disjoncteur Divers tri"}
            ]
          },
          {
            "categ":"Eclairage",
            "subCateg": [
              {"categ": "Interrupteur"},
              {"categ": "Projecteurs"},
              {"categ": "Lampes"}
            ]
          },
          {
            "categ":"Branchement",
            "subCateg": [
              {"categ": "Fils et câbles"},
              {"categ": "Prises"}
            ]
          },
          {
            "categ":"Protection",
            "subCateg": [
              {"categ": "Protections de l\"habitat"},
              {"categ": "Cartouches et fusibles"}
            ]
          }

        ]
      },


      {
        "categ": "Chauffage",
        "isFlagged" : false,
        "subCateg": [

          {
            "categ": "Radiateurs",
            "subCateg": [
              {"categ": "Fixations de radiateurs"},
              {"categ": "Radiateur thermoactif"},
              {"categ": "Robinetterie de radiateurs"},
              {"categ": "Accessoires"},
              {"categ": "Sèche-serviettes"},
              {"categ": "Habillage"}
            ]
          },
          {
            "categ":"Chaudière",
            "subCateg": [
              {"categ": "Bloc hydraulique"},
              {"categ": "Système de sécurité surchauffe"},
              {"categ": "Chaudière électrique"},
              {"categ": "Thermostat"}
            ]
          }
        ]
      }
    ]
    this.save()
  }

  save() {

    //this.fetchedCompanie.categJson.categProduct = JSON.stringify(JSON.parse(this.fetchedCompanie.categJson.categProduct))
    if(this.fetchedCompanie._id) {
      this.companieService.updateCompanie(this.fetchedCompanie)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            this.fetchedCompanie = res.obj
            this.saved.emit(res.obj)
          //  this.router.navigate(['companie/' + this.fetchedCompanie._id])
          },
          error => {
            this.toastr.error('error!', error)
          }
        )
    } else {
      this.companieService.saveCompanie(this.fetchedCompanie)
        .subscribe(
          res => {
            this.toastr.success('Great!', res.message)
            this.fetchedCompanie = res.obj
            this.saved.emit(res.obj)
            //  this.router.navigate(['companie/' + res.obj._id])
          },
          error => {console.log(error)}
        )
    }
  }
  saveMyCompanie(){
    this.companieService.saveMyCompanie(this.fetchedCompanie)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message)
          this.fetchedCompanie = res.obj
        },
        error => {console.log(error)}
      )
  }

  onDelete(id: string) {
    this.companieService.deleteCompanie(id)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message);
          this.router.navigate(['companie/'])
          console.log(res);
        },
        error => {
          console.log(error);
        }
      );
  }

  goBack() {
    this.location.back();
  }



  getCompanie(id: string) {
    this.companieService.getCompanie(id, {})
      .subscribe(
        res => {
          this.fetchedCompanie = res
        },
        error => {
          console.log(error);
        }
      )
  }


}
