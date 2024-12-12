import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CharacterService } from '../character.service';
import { Character } from '../character.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from 'src/app/alert-dialog/alert-dialog.component';
import { BusinessLayerService } from 'src/app/Shared/business-layer.service';
import { Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-character-update',
  templateUrl: './character-update.component.html',
  styleUrls: ['./character-update.component.css']
})
export class CharacterUpdateComponent implements OnInit, OnDestroy {
  item : Character;
  id: number;
  @ViewChild('nameInput', {static : true}) nameInput : ElementRef;
  @ViewChild('descriptionInput', {static : true}) descriptionInput : ElementRef;
  @ViewChild('urlInput', {static : true}) urlInput : ElementRef;
  @ViewChild('ageInput', {static : true}) ageInput : ElementRef;

  selectedValue: string;
  updateForm: FormGroup;
  private subscription: Subscription;
  isFetching : boolean;
  alive: boolean = true;

  constructor(private route: ActivatedRoute,
    private characService: CharacterService, 
    private formbuilder: FormBuilder, private dialog: MatDialog, private router: Router, private businessService: BusinessLayerService) { }
  
  ngOnInit(): void {
    try
    {
      this.isFetching = false;
      this.businessService.setResponseCode.pipe(takeWhile(() => this.alive)).subscribe(response => {
        this.updateCharacter(response);
      });
      
      //Subscribing to the paramaters in the route to update the characters details based off ID
      this.route.params.pipe(takeWhile(() => this.alive)).subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.item = this.businessService.getCharacter(this.id);
        }
        );
        this.initializeForm();
    }
    catch(e)
    {
      console.log(e);
    }
  }

  onFormSubmit(event: Event){
    try
    {
      event.preventDefault();
      this.onUpdate();
      if (this.updateForm.valid) {
        const updatedData = this.updateForm.value;
        console.log('Updated Data:', updatedData);
      } 
      else 
      {
        console.log('Form is invalid.');
      }
    }
    catch(e)
    {
      console.log(e);
    }
  }

  //Intializes the forms and sets validation on all the input fields
  initializeForm() {
    try
    {
      this.updateForm = this.formbuilder.group({
        name: [this.item.name, [Validators.required, Validators.maxLength(20)]],
        description: [this.item.description, [Validators.required, Validators.maxLength(60)]],
        imagePath: [this.item.imagePath, [Validators.required, Validators.maxLength(200)]],
        sex: [this.item.sex, [Validators.required]],
        age: [this.item.age, [Validators.pattern(/^[0-9]+$/), Validators.maxLength(3)]]
      });
    }
    catch(e)
    {
      console.log(e);
    }
  }

  //Updates a Character object based off the input values and calls the updateCharacter method in the business service
  onUpdate(){
    try
    {
      const updateName = this.nameInput.nativeElement.value;
      const updateDesc = this.descriptionInput.nativeElement.value;
      const updateUrl = this.urlInput.nativeElement.value;
      const updateSex = this.selectedValue || this.item.sex;
      const updateAge = this.ageInput.nativeElement.value;
      const updatedCharac = new Character(updateName, updateDesc, updateUrl, updateSex, updateAge);
      this.businessService.updateCharacter(this.id, updatedCharac);
      this.isFetching = true;
    }
    catch(e)
    {
      console.log(e);
    }
  }

  //Checks the value of the response code passed from the business services behaviour subject to perform actions accordingly
  updateCharacter(response: string)
  {
    try
    {
      if(response === '200')
      {
        this.isFetching = false;
        this.router.navigate(['/', 'list']);
        const dialogRef = this.dialog.open(AlertDialogComponent,{
                data:{
                  message: 'Character ' + ' has been updated successfully!',
                  buttonText: {
                    cancel: 'Done'
                  }
                },
              });
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
      else{
        console.log('Update failed!');
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
