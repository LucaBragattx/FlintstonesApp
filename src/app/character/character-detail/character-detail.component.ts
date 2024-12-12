import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Character } from '../character.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatMenuTrigger } from '@angular/material/menu';
import { AlertDialogComponent } from 'src/app/alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { BusinessLayerService } from 'src/app/Shared/business-layer.service';
import { Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit, OnDestroy {
  item : Character;
  id: number;
  updateCheck = false;
  @ViewChild('nameInput', {static : true}) nameInput : ElementRef;
  @ViewChild('descriptionInput', {static : true}) descriptionInput : ElementRef;
  @ViewChild('urlInput', {static : true}) urlInput : ElementRef;
  @ViewChild('sexInput', {static : true}) sexInput : ElementRef;
  @ViewChild('ageInput', {static : true}) ageInput : ElementRef;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  subscription: Subscription;
  isFetching: boolean;
  alive: boolean = true;

  constructor(private route: ActivatedRoute,
    private router: Router, private dialog: MatDialog, private businessService: BusinessLayerService ) { }

    
  ngOnInit(): void {
    try
    {
      //Subscribing to the paramaters in the route to display the characters details based off ID
      this.route.params.pipe(takeWhile(() => this.alive)).subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.item = this.businessService.getCharacter(this.id);
        }
        );
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
