import { Component, Input, OnInit, Output } from '@angular/core';
import { BusinessLayerService } from '../Shared/business-layer.service';
import { Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-grid-options',
  templateUrl: './grid-options.component.html',
  styleUrls: ['./grid-options.component.css']
})
export class GridOptionsComponent implements ICellRendererAngularComp  {
  id: number;
  public params!: ICellRendererParams;
  @Input() cell: any;
  @Output() onClicked = new Subject<boolean>();

  constructor(private router: Router, private businessService: BusinessLayerService) { }

  refresh(): boolean {
    try
    {
      return false;
    }
    catch(e)
    {
      console.log(e);
    }
  }

  agInit(params: ICellRendererParams): void {
    try{
      this.params = params;
    }
    catch(e)
    {
      console.log(e);
    }
  }

  //Calls the deleteCharacter method in business service based off the characters ID and navigates the user to the delete component
  onDelete(){
    try
    {
      this.onClicked.next(this.cell);
      this.businessService.deleteCharacter(this.params.data['id']);
      console.log(this.params.data);
      this.router.navigate(['/', 'delete', this.params.data['id']]);
    }
    catch (e)
    {
      console.log(e);
    }
  }

  //Navigates the user to the update component based off the characters ID
  directToUpdate() {
    try
    {
      this.onClicked.next(this.cell);
      this.businessService.setResponseCode.next('0');
      console.log(this.params.data);
      this.router.navigate(['/update', this.params.data['id']]);
    }
    catch (e)
    {
      console.log(e);
    }
  }

   //Navigates the user to the details component based off the characters ID
  directToDetails() {
    try
    {
      this.onClicked.next(this.cell);
      this.router.navigate(['/list', this.params.data['id']]);
    }
    catch (e)
    {
      console.log(e);
    }
  }
}
