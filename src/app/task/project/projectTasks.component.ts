import { Component, OnInit} from '@angular/core';
import { ProjectService} from '../../project/project.service';
import { ToastsManager} from 'ng2-toastr';
//import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Project, BucketTasks } from '../../project/project.model';
import { Task } from '../../task/task.model';
// import { EditOptionsComponentDialog } from '../form/modalLibrary/modalLibrary.component';
//import { FormGroup} from '@angular/forms';
// import { DomSanitizer } from '@angular/platform-browser';
// import { DeleteDialog } from '../deleteDialog/deleteDialog.component'
// import { UserService} from '../user/user.service';
// import { QuoteService} from '../quote/quote.service';

// import { User } from '../user/user.model';
// import { Quote } from '../quote/quote.model';
import { DragulaService } from 'ng2-dragula';
import { User } from '../../user/user.model';
import { AuthService} from '../../auth/auth.service';
import { TaskService } from '../../task/task.service'
import {MatDialog } from '@angular/material';
import { TaskDialogComponent } from '../../task/single/dialog/taskDialog.component';


@Component({
  selector: 'app-projects',
  templateUrl: './projectTasks.component.html',
  styleUrls: ['../task.component.css'],

})

export class ProjectTasksComponent implements OnInit {


  // public bucketTasks: Array<any> = [
  //   {
  //     bucketName: 'Group A',
  //     openNewTask: false,
  //     tasks: [{ name: 'Item A' }, { name: 'Item B' }, { name: 'Item C' }, { name: 'Item D' }]
  //   },
  //   {
  //     bucketName: 'Group B',
  //     openNewTask: false,
  //     tasks: [{ name: 'Item 1' }, { name: 'Item 2' }, { name: 'Item 3' }, { name: 'Item 4' }]
  //   }
  // ];
  fetchedProject: Project = new Project();
  fetchedProjects: Project[] = []
  //
  // public many = [
  //
  //   {
  //     bucketName: 'Group A',
  //     tasks: ['The', 'possibilities', 'are', 'endless!']
  //   },
  //
  //   {
  //     bucketName: 'Group B',
  //     tasks: ['The', 'toto', 'tata', 'titi!']
  //   },
  //
  // ]


  statusTypes = [
    { label: 'Not Started', value: '' },
    { label: 'Pending', value: 'pending' },
    { label: 'Done', value: 'done' }
  ]


  public many2: Array<string> = ['Explore', 'them'];

  constructor(
    //  private sanitizer: DomSanitizer,
    private projectService: ProjectService,
    private toastr: ToastsManager,
    public dialog: MatDialog,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private dragulaService: DragulaService,
    private authService: AuthService,
    private taskService: TaskService,
  ) {
    // dragulaService.setOptions('nested-bag', {
    //   moves: function (el:any, container:any, handle:any):any {
    //     return handle.className === 'move';
    //   }
    // });

    dragulaService.dropModel.subscribe((value) => {
      this.onDropModel(value.slice(1));
    });
    dragulaService.removeModel.subscribe((value) => {
      this.onRemoveModel(value.slice(1));
    });
  }

  newBucketTaskF(newBucketTask) {
    let bucketTaskObj: BucketTasks = new BucketTasks()
    bucketTaskObj.bucketName = newBucketTask,
      bucketTaskObj.openNewTask = false,
      bucketTaskObj.tasks = []

    this.fetchedProject.bucketTasks.push(bucketTaskObj)
    this.save()
  }


  deleteBucketTask(bucketTaskIndex) {
    this.fetchedProject.bucketTasks.splice(bucketTaskIndex, 1)
    this.save()
  }


  deleteTask(task, bucketTaskIndex, taskIndex) {
    console.log(task, bucketTaskIndex, taskIndex)
    this.taskService.deleteTask(task._id)
      .subscribe(
        res => {
          this.toastr.success('Great!', res.message);
          this.fetchedProject.bucketTasks[bucketTaskIndex].tasks.splice(taskIndex, 1)
          this.save()
        },
        error => {
          console.log(error);
        }
      )

  }


  addTask(content, bucketTaskIndex) {

    console.log(content, bucketTaskIndex)
    this.fetchedProject.bucketTasks[bucketTaskIndex].openNewTask = false
    let newTask = new Task()
    // newTask.dateTask.startString = this.authService.isoDateToHtmlDate(newTask.dateTask.start)
    // newTask.dateTask.endString = this.authService.isoDateToHtmlDate(newTask.dateTask.end)
    newTask.projects = [this.fetchedProject]

    newTask.title = content
    // this.fetchedProject.bucketTasks[bucketTaskIndex].tasks.push(newTask)
    // let taskIndex =  this.fetchedProject.bucketTasks[bucketTaskIndex].tasks.length-1
    this.saveTask(newTask, bucketTaskIndex)

  }



  saveTask(newTask, bucketTaskIndex) {
    this.doCalc()
    if (newTask._id) {
      this.taskService.updateTask(newTask)
        .subscribe(
        res => {
          this.toastr.success('Great!', res.message)
        },
        error => { console.log(error) }
        );
    } else {
      this.taskService.saveTask(newTask)
        .subscribe(
        res => {
          this.fetchedProject.bucketTasks[bucketTaskIndex].tasks.push(res.obj)
          this.save()
        },
        error => {
          this.toastr.error('Error!', error.message)
          console.log(error)
        }
        );
    }

    // this.authService.saveTask(this.fetchedProject.bucketTasks[bucketTaskIndex].tasks[taskIndex])
    // this.projectService.updateTask(taskData, this.fetchedProject)
    //   .subscribe(
    //   res => {
    //     this.toastr.success('Great!', res.message)
    //   },
    //   error => { console.log(error) }
    //   );
  }

  newTask(index) {
    this.fetchedProject.bucketTasks[index].openNewTask = true
  }
  private onDropModel(args) {
    let [el, target, source] = args;
    // do something else
    this.save()
  }

  private onRemoveModel(args) {
    let [el, source] = args;
  }


  selectAssignedTo(event, bucketTaskIndex, taskIndex) {
    this.fetchedProject.bucketTasks[bucketTaskIndex].tasks[taskIndex].users = event
    this.save()
  }

  openDialog(task: Task) {
    let dialogRef = this.dialog.open(TaskDialogComponent, {
      data: {
        fetchedTask: task
      }
    });
    // dialogRef.componentInstance.fetchedUserCalendar = userCalendar;
    dialogRef.afterClosed().subscribe(result => {
      // this.resetSearchGetUserCalendars()
      // this.getUserCalendars(1, this.search)
      // if(result) {
      //   this.fetchedCompanie.forms.push(result)
      // }
    })
  }

  onClick(bucketTaskIndex, taskIndex) {
    console.log('onclick')

    this.fetchedProject.bucketTasks.forEach((bucketTask, i) => {
      bucketTask.tasks.forEach((task, j) => {
        this.openDialog(this.fetchedProject.bucketTasks[i].tasks[j])
        // this.fetchedProject.bucketTasks[i].tasks[j].editMode = false
      })
    }
    )
    // this.fetchedProject.bucketTasks[bucketTaskIndex].tasks[taskIndex].editMode = true

  }

  selectProject(project: Project) {
    this.getProject(project)

  }
  clearAutocomplete() {
    this.fetchedProject = new Project()
  }
  getProject(project: Project) {
    this.fetchedProject = project
    this.fetchedProject.bucketTasks.forEach((bucketTask, bucketTaskIndex) => {
      bucketTask.tasks.forEach((task, taskIndex) => {


        this.fetchedProject.bucketTasks[bucketTaskIndex]
          .tasks[taskIndex]
          .startString = this.authService
            .isoDateToHtmlDate(this.fetchedProject.bucketTasks[bucketTaskIndex].tasks[taskIndex].start)

        this.fetchedProject.bucketTasks[bucketTaskIndex]
          .tasks[taskIndex]
          .endString = this.authService
            .isoDateToHtmlDate(this.fetchedProject.bucketTasks[bucketTaskIndex].tasks[taskIndex].end)

      })
    });
  }
  getProjectById(id: string) {
    this.projectService.getProject(id)
      .subscribe(
      res => {
        this.getProject(<Project>res)
        this.fetchedProjects = [<Project>res]
        // this.fetchedProject.detail.dateQuote.issueDateString = this.authService.isoDateToHtmlDate(this.fetchedQuote.detail.dateQuote.issueDate)
        // this.fetchedQuote.detail.dateQuote.expiryDateString = this.authService.isoDateToHtmlDate(this.fetchedQuote.detail.dateQuote.expiryDate)


        // start: Date = new Date()
        // startString: string = '';
        // end: Date = new Date()
        // endString: string = '';

      },
      error => {
        console.log(error);
      }
      )
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['idProject'])
        this.getProjectById(params['idProject'])

    })
  }




  goBack() {
    this.location.back();
  }

  getResultAutocomplete(event) {
    console.log(event)
  }

  doCalc() {
    let nbTasks = 0
    let nbTasksCompleted = 0
    this.fetchedProject.bucketTasks.forEach((bucketTask, bucketTaskIndex) => {
      nbTasks += bucketTask.tasks.length
      bucketTask.tasks.forEach((task, taskIndex) => {
        if (task.status === 'done')
          nbTasksCompleted++

        if (task.status === 'pending')
          nbTasksCompleted = nbTasksCompleted + 0.5

      })
    });
    this.fetchedProject.progressTasks = nbTasksCompleted / nbTasks

  }
  save() {
    this.doCalc()
    // let nbTasks = 0
    // let nbTasksCompleted = 0
    //
    // this.fetchedProject.bucketTasks.forEach((bucketTask, bucketTaskIndex) => {
    //   nbTasks += bucketTask.tasks.length
    //   bucketTask.tasks.forEach((task, taskIndex) => {
    //     if (task.status === 'done')
    //       nbTasksCompleted++
    //
    //     if (task.status === 'pending')
    //       nbTasksCompleted = nbTasksCompleted + 0.5
    //
    //     //
    //     // this.fetchedProject.bucketTasks[bucketTaskIndex]
    //     // .tasks[taskIndex].dateTask
    //     // .start = this.authService
    //     // .HTMLDatetoIsoDate(this.fetchedProject.bucketTasks[bucketTaskIndex].tasks[taskIndex].dateTask.startString)
    //     //
    //     // this.fetchedProject.bucketTasks[bucketTaskIndex]
    //     // .tasks[taskIndex].dateTask
    //     // .end = this.authService
    //     // .HTMLDatetoIsoDate(this.fetchedProject.bucketTasks[bucketTaskIndex].tasks[taskIndex].dateTask.endString)
    //
    //   })
    // });



    if (this.fetchedProject._id) {
      this.projectService.updateProject(this.fetchedProject)
        .subscribe(
        res => {
          this.toastr.success('Great!', res.message)
          //this.router.navigate(['project/' + res.obj._id]);
        },
        error => { console.log(error) }
        );
    } else {

      this.projectService.saveProject(this.fetchedProject)
        .subscribe(
        res => {
          this.toastr.success('Great!', res.message)
          //  this.router.navigate(['project/' + res.obj._id]);
        },
        error => { console.log(error) }
        );
    }
  }



}
