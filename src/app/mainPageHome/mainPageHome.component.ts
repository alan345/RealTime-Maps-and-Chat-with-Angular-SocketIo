import { Component, OnInit } from '@angular/core';
import { MainPageHomeService} from './mainPageHome.service';
import { FormGroup } from '@angular/forms';
import { ToastsManager} from 'ng2-toastr';
import { MatDialog} from '@angular/material';
// import { EditOptionsComponentDialog }  from '../form/modalLibrary/modalLibrary.component';
import { AdminService} from '../admin/services/admin.service';


// import { Options } from './options.model';
import { Router} from '@angular/router';
import { AuthService} from '../auth/auth.service';
// import { Companie} from '../companie/companie.model';

@Component({
  selector: 'app-admin',
  templateUrl: './mainPageHome.component.html',
  styleUrls: ['./mainPageHome.component.css']
})
export class MainPageHomeComponent implements OnInit {
  // companies: Companie[] = []
  // trackinPage : any = {
  //   lastVisitPagePressCount: [],
  //   lastVisitPageVideoCount: []
  // }
  // isEditTitle:boolean = false
  // myForm: FormGroup;
  // options: Options = {
  //   design : {
  //     mainPage:{
  //       titleHomePage: '',
  //       buttonHomePage: '',
  //       linkButtonHomePage: '',
  //       _imgHome1:[],
  //       _imgHome2:[],
  //       _imgHome3:[],
  //       _imgHome4:[],
  //       _imgHome5:[],
  //       _imgHome6:[],
  //     }
  //   }
  // }

  constructor(

    private router:Router,
    private adminService: AdminService,
    private mainPageHomeService: MainPageHomeService,
    private toastr: ToastsManager,
    public dialog: MatDialog,

    private authService: AuthService,
  ) {}

  // editTitleHomePage(){
  //   if(this.isEditTitle)
  //     this.save()
  //   this.isEditTitle = !this.isEditTitle
  // }
  // openDialog(positionImage: string) {
  //   let dialogRef = this.dialog.open(EditOptionsComponentDialog);
  //   dialogRef.afterClosed().subscribe(result => {
  //     if(result) {
  //       this.options.design.mainPage[positionImage][0] = result
  //       this.save()
  //     }
  //   })
  // }
  // save(model: FormGroup, isValid: boolean) {
  //   // this.mainPageHomeService.updateOptions(model)
  //   //   .subscribe(
  //   //     res => {
  //   //       this.toastr.success('Great!', res.message)
  //   //     },
  //   //     error => {console.log(error)}
  //   //   )
  // }
  // save(){
  //   if(this.options.design.mainPage.buttonHomePage.length > 12) {
  //     this.toastr.error('Error!', 'Max 12 characters for the button')
  //   } else {
  //     this.mainPageHomeService.updateOptions(this.options)
  //       .subscribe(
  //         res => {
  //           this.toastr.success('Great!', res.message)
  //         },
  //         error => {console.log(error)}
  //       )
  //   }
  //
  // }


  goTo(path: string) {

      this.router.navigate([path]);



    // if( (this.isAdmin() || this.isManager()) && path === 'user') {
    //   if(this.companies.length)
    //     this.router.navigate(['/companie/' + this.companies[0]._id + '/users']);
    // } else {
    //   this.router.navigate([path]);
    // }
  }
  // showObjHTML(nameObject, typeAccess) {
  //   return this.authService.showObjHTML(nameObject, typeAccess)
  // }

  ngOnInit() {
    //this.companieService.getCompanieByUserId(this.authService.currentUser.userId)
    // this.companieService.getCompanieForCurrentUser()
    // .subscribe(
    //   (data => this.companies = data)
    // )


    //
    // this.mainPageHomeService.getOptions()
    //   .subscribe(
    //     options => this.options = <Options>options.obj,
    //     error => {console.log(error)}
    //   );
  }
  isAdmin() {
    return this.authService.isAdmin();
  }


}
