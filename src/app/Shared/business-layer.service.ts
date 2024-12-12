import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject} from "rxjs";
import { DataStorageService } from "../character/data-storage.service";
import { Character } from "../character/character.model";

@Injectable()
export class BusinessLayerService{

    setResponseCode = new BehaviorSubject<string>('0');
    characters: Character[] = [];
    character: Character;
    id: number;
    i: number;
    fetched: boolean = false;
    charactersAdded = new Subject<Character[]>();
    

    constructor(private dataStorageService: DataStorageService) {
        this.dataStorageService.getListResponseCode.subscribe(response => {
          this.getPost(response);
      });

        this.dataStorageService.getDeleteResponseCode.subscribe(response => {
        this.deletePost(response);
      });

      this.dataStorageService.getUpdateResponseCode.subscribe(response => {
        this.updatePost(response);
      });

      this.dataStorageService.getAddResponseCode.subscribe(response => {
       this.addPost(response);
      });
    }

    //A method used link the component and DAL to call the getCharacters method from the API
    setCharacter(){
      try
      {
        this.dataStorageService.getCharacters();
      }
      catch(e)
      {
        console.log(e);
      }
    }


    //A method used link the component and DAL to call the deleteCharacter method from the API
    deleteCharacter(id: number){
      try
      {
        this.dataStorageService.deleteCharacter(id);
        this.id = id;
        console.log('DAL delete id ' + id);
      }
      catch(e)
      {
        console.log(e);
      }
    }

    //A method used link the component and DAL to call the updateCharacter method from the API
    updateCharacter(id : number, character: Character){
      try
      {
        this.dataStorageService.updateCharacter(id, character);
        this.id = id;
        this.character = character;
        console.log('DAL update id ' + id);
      }
      catch(e)
      {
        console.log(e);
      }
    }

    //A method used to return a single character from the list using it's ID
    getCharacter(id : number){
      try
      {
        return this.characters[id];
      }
      catch(e)
      {
        console.log(e);
      }
    }
    
    //A method used link the component and DAL to call the addCharacter method from the API
    addCharacter(character: Character){
      try
      {
        this.dataStorageService.addCharacter(character);
        this.character = character;
        console.log('DAL added: ' + character);
      }
      catch(e)
      {
        console.log(e);
      }
    }

    //A method used to get the response code from the getCharacters post and change the behaviour subject in this service based off that response
    getPost(response: string){
      try
      {
        if (response === '200') { 
          console.log('BS2: ' + response);
          this.characters = this.dataStorageService.listData;
          console.log('List data:' + this.characters);
          for(let i = 0; i < this.characters.length; i++)
          {
            this.characters[i].id = i;
            this.i = i;
          }
          console.log('BS2 characters: ' + this.characters);
          this.setResponseCode.next('200');
        }
        else if(response ==='401')
        {
          this.setResponseCode.next('401');
        }
        else if(response === '601'){
          this.setResponseCode.next('601');
        }
        else {
          this.setResponseCode.next('0');
        }
      }
      catch(e)
      {
        console.log(e);
      }
    }

    //A method used to get the response code from the addCharacter post and change the behaviour subject in this service based off that response
    addPost(response: string){
      try
      {
        if (response === '200')
        {
          console.log('BS2 add: ' + response);
          this.characters.push(this.character);
          this.charactersAdded.next(this.characters.slice());
          console.log('Business add id ' + this.id);
          this.setResponseCode.next('200');
        } 
        else if(response ==='401')
        {
          this.setResponseCode.next('401');
        }
        else if(response === '601'){
          this.setResponseCode.next('601');
        }
        else {
          this.setResponseCode.next('0');
        }
      }
      catch(e)
      {
        console.log(e);
      }
    }

    //A method used to get the response code from the updateCharacter post and change the behaviour subject in this service based off that response
    updatePost(response: string){
      try
      {
        if (response === '200')
        {
          console.log('BS2 update: ' + response);
          this.characters.splice(this.id, 1, this.character);
          console.log('Business udpdate id ' + this.id);
          this.setResponseCode.next('200');
        }
        else if(response ==='401')
        {
          this.setResponseCode.next('401');
        }
        else if(response === '601'){
          this.setResponseCode.next('601');
        }
        else {
          this.setResponseCode.next('0');
        }
      }
      catch(e)
      {
        console.log(e);
      }
    }

    //A method used to get the response code from the deleteCharacter post and change the behaviour subject in this service based off that response
    deletePost(response: string){
      try
      {
        if (response === '200') { 
          console.log('BS2 delete: ' + response);
          this.characters.splice(this.id, 1);
          console.log('Business delete id ' + this.id);
          this.setResponseCode.next('200');
        } 
        else if(response ==='401')
        {
          this.setResponseCode.next('401');
        }
        else if(response === '601'){
          this.setResponseCode.next('601');
        }
        else {
          this.setResponseCode.next('0');
        }
      }
      catch(e)
      {
        console.log(e);
      }
  }

  //A method used to reset the behaviour subject code and calls the resetCode method in the DAL
  resetCode(){
    try
    {
      this.setResponseCode.next('0');
      this.dataStorageService.resetCode();
    }
    catch(e)
    {
      console.log(e);
    }
  }
}