import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CharacterService } from '../character.service';
import { Character } from '../character.model';
import { FormControl, Validators } from '@angular/forms';
import { DataStorageService } from '../data-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from 'src/app/alert-dialog/alert-dialog.component';
import { Router } from '@angular/router';
import { BusinessLayerService } from 'src/app/Shared/business-layer.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-character-new',
  templateUrl: './character-new.component.html',
  styleUrls: ['./character-new.component.css']
})
export class CharacterNewComponent implements OnInit, OnDestroy {

  @ViewChild('nameInput', {static : true}) nameInput : ElementRef;
  @ViewChild('descriptionInput', {static : true}) descriptionInput : ElementRef;
  @ViewChild('urlInput', {static : true}) urlInput : ElementRef;
  @ViewChild('sexInput', {static : true}) sexInput : ElementRef;
  @ViewChild('ageInput', {static : true}) ageInput : ElementRef;

  //Used to validate the data being entered into the input fields
  name = new FormControl('', [Validators.required, Validators.maxLength(20)]);
  desc = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  url = new FormControl('', [Validators.required, Validators.maxLength(150)]);
  sex = new FormControl('', [Validators.required]);
  age = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.maxLength(3)]);
  selectedValue: string;
  isFetching : boolean;
  alive: boolean = true;

  constructor(private characterService : CharacterService, private dataStorageService: DataStorageService, private dialog: MatDialog, private router: Router, private businessService: BusinessLayerService) { 
  }

  ngOnInit(): void {
    try
    {
      this.isFetching = false;
      this.businessService.setResponseCode.pipe(takeWhile(() => this.alive)).subscribe(response => {
        this.newCharacter(response);
      });
    }
    catch(e)
    {
      console.log(e);
    }
  }

  //Prevents defualt form submit behaviour and call the onAdd method
  onFormSubmit(event: Event) {
    try
    {
      event.preventDefault();
      this.onAdd();
    }
    catch(e)
    {
      console.log(e);
    }
  }

  //Creates a new Character object based off the input values and calls the addCharacter method in the business service
  onAdd(){
    try
    {
      const addName = this.nameInput.nativeElement.value;
      const addDesc = this.descriptionInput.nativeElement.value;
      const addUrl = this.urlInput.nativeElement.value;
      const addSex = this.selectedValue;
      const addAge = this.ageInput.nativeElement.value;
      const addCharac = new Character(addName, addDesc, addUrl, addSex, addAge);
      this.businessService.addCharacter(addCharac);
      this.isFetching = true;
    }
    catch(e)
    {
      console.log(e);
    }
  }

  //Checks the value of the response code passed from the business services behaviour subject to perform actions accordingly
  newCharacter(response: string){
    try
    {
      if(response === '200')
      {
        this.isFetching = false;
        const dialogRef = this.dialog.open(AlertDialogComponent,{
                data:{
                  message: 'Character '+   ' has been added successfully!',
                  buttonText: {
                    cancel: 'Done',
                    reroute: this.router.navigate(['/', 'list'])
                  }
                },
              });
              this.businessService.setResponseCode.next('0');
      }
      else if(response ==='401'){
        this.router.navigate(['/', 'logout']);
      }
      else if(response ==='601')
      {
        const dialogRef = this.dialog.open(AlertDialogComponent,{
          data:{
            message: 'An error has occured! Would you like to refresh the page?',
            buttonText: {
              cancel: 'Yes'
            }
          },
        });

        dialogRef.afterClosed().subscribe(dialogResult => {
          if(dialogResult){
            this.businessService.setResponseCode.next('200');
            this.ngOnInit();
            console.log(dialogResult);
          }
          else{
            this.router.navigate(['/', 'logout']);
          }

       });
      }
      else
      {
        console.log('Add failed!');
      }
    }
    catch(e)
    {
      console.log(e);
    }
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
