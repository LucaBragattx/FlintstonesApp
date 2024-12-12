import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Character } from '../character/character.model';
import { TabService } from '../Shared/tab.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  characters: Character[] = [];
  isFetching: boolean;


  constructor(private tabService: TabService) { }

  ngOnInit(): void {
    // this.tabService.setCharacter();
    // this.tabService.setResponseCode.subscribe(response => {
    //   this.getList(response);
    // });
  }

  // refreshList(){
  //   try
  //   {
  //     //this.characters = this.characterService.getCharacters();
  //     this.characters = this.tabService.characters;
  //   }
  //   catch(err)
  //   {
  //     console.log(err);
  //   }
  // }

  // getList(response: string){
  //   try
  //   {
  //     if (response === '200') { 
  //       this.isFetching = false;
  //       this.refreshList();
  //       console.log('List: ' + response)
  //     } 
  //     else
  //     {
  //       this.isFetching = true;
  //     }
  //   }
  //   catch(err)
  //   {
  //     console.log(err);
  //   }
  // }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

}
