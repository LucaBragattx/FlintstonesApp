import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Character } from "../character/character.model";
import { DataStorageService } from "../character/data-storage.service";
import * as _ from 'lodash';

@Injectable()
export class TabService {
    setResponseCode = new BehaviorSubject<string>('0');
    characters: Character[] = [];
    charactersGender: Character[] = [];
    charactersTop: Character[] = [];
    charactersLetter: Character[] = [];
    charactersSort: Character[] = [];
    character: Character;
    id: number;
    fetched: boolean = false;
    count: number = 0;
    count2: number = 0;
    
    constructor(private dataStorageService: DataStorageService) {
        this.dataStorageService.getListResponseCode.subscribe(response => {
            try
            {
                this.characters = this.dataStorageService.listData;
                //Assigning an ID to my list of characters
                for(let i = 0; i < this.characters.length; i++)
                {
                  this.characters[i].id = i;
                }
                this.getPostFemale(response);
                this.getPostTopFive(response);
                this.getPostFirstLetter(response);
                this.countGenders(this.characters);
            }
            catch(error){
                console.log(error);
            }
      });

      this.dataStorageService.getDeleteResponseCode.subscribe(response => {
        try{
            this.getPostFemale(response);
            this.getPostTopFive(response);
            this.getPostFirstLetter(response);
            this.countGenders(this.characters);
        }
        catch(e)
        {
            console.log(e);
        }
      });

      this.dataStorageService.getUpdateResponseCode.subscribe(response => {
        try{
            this.getPostFemale(response);
            this.getPostTopFive(response);
            this.getPostFirstLetter(response);
            this.countGenders(this.characters);
        }
        catch(e)
        {
            console.log(e);
        }
      });

      this.dataStorageService.getAddResponseCode.subscribe(response => {
        try{
            this.getPostFemale(response);
            this.getPostTopFive(response);
            this.getPostFirstLetter(response);
            this.countGenders(this.characters);
        }
        catch(e)
        {
            console.log(e);
        }
      });
    }

     //A method used to link the component and DAL to call the getCharacters method from the API
    setCharacter(){
        try
        {
            this.dataStorageService.getCharacters();
        }
        catch(err){
            console.log(err);
        }
    }

    //A method used to get the response code to process and update the behaviour subject in this service
    getPostFemale(response: string){
        try
        {
            if (response === '200') { 
                console.log('TS2: ' + response);
                console.log('TS2 tab1: ' + this.characters);
                this.getFemales(this.characters);
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
                console.log('Post female was 0');
                console.log(this.dataStorageService.getListResponseCode.value);
            }
        }
        catch(err){
            console.log(err);
        }
    }

    //A method used to get the response code to process and update the behaviour subject in this service
    getPostFirstLetter(response: string){
        try
        {
            if (response === '200') { 
                console.log('BS2: ' + response);
                console.log('TS2 tab4: ' + this.characters);
                this.getFirstLetter(this.characters);
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
        catch(err){
            console.log(err);
        }
    }


    //A method used to get the response code to process and update the behaviour subject in this service
    getPostTopFive(response: string){
        try
        {
            if (response === '200') { 
                console.log('BS2: ' + response);
                console.log('TS2 tab3: ' + this.characters);
                this.getTopFive(this.characters);
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
        catch(err){
            console.log(err);
        }
    }

    //A method used to get all the female characters in the array
    getFemales(characters: Character[]){
        try
        {
            this.charactersGender = [];
            for(let i = 0; i < characters.length; i++){
                if(characters[i].sex === 'Female')
                {
                    this.charactersGender.push(characters[i]);
                }
                // else if(characters[i].sex === 'Male')
                // {
                //     this.charactersGender.splice(characters[i].id, 1);
                // }
            }
        }
        catch(err){
            console.log(err);
        }
      }

    //A method used to count all the genders in the array
    countGenders(characters: Character[]){
        try
        {
            this.count = 0;
            this.count2 = 0;
            for (let i = 0; i < characters.length; i++) {
                if(characters[i].sex === 'Male')
                {
                  this.count++;
                }
                else
                {
                  this.count2++;
                }
              }
              console.log(this.count);
              console.log(this.count2);

        }
        catch(err){
            console.log(err);
        }
      }

      //A method used to get the top 5 oldest characters in the array
      getTopFive(characters: Character[]){
        try
        {
            const sortArray = [...characters]; //creating a copy of my array
            sortArray.sort((a, b) => b.age - a.age); //sorts the array in descending order based on the age
            const [firstItem, secondItem,  
            thirdItem, fourthItem, fifthItem] = sortArray.slice(0, 5); //gets the first 5 characters
            this.charactersTop.splice(0, this.charactersTop.length); 
            this.charactersTop.push(firstItem, secondItem, thirdItem, fourthItem, fifthItem);
        }
        catch(err){
            console.log(err);
        }
      }

      //A method used to get all the characters with the first letter P
      getFirstLetter(characters: Character[]){
        try
        {
            this.charactersLetter = [];
            for (let i = 0; i < characters.length; i++) {
                if(Array.from(characters[i].name)[0] === 'P')
                {
                    this.charactersLetter.push(this.characters[i]);
                }
            }
        }
        catch(err)
        {
            console.log(err);
        }
      }
}