import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, retry, tap, timeout } from "rxjs/operators";
import { Character } from "./character.model";
import { CharacterService } from "./character.service";
import { BehaviorSubject, Subject } from "rxjs";
@Injectable()
export class DataStorageService {
    error = new Subject<string>();
    request = {
        Theme:"FlintStone"
    };
    character: Character[];
    baseUrl = 'http://localhost:4200/users';
    getListResponseCode = new BehaviorSubject<string>('0');
    getDeleteResponseCode = new BehaviorSubject<string>('0');
    getUpdateResponseCode = new BehaviorSubject<string>('0');
    getAddResponseCode = new BehaviorSubject<string>('0');
    listData : Character[] = [];
    reset: boolean = false;

    constructor(private http: HttpClient){}

    //A general post method for making requests to the API that passes the response code to a behaviour subject and the data to a list
    public GeneralPost<T>(postObject: any, SubjectToUpdate: BehaviorSubject<string>, ObjectToUpdate: T, endpointVerb: string, callingMethod: string, userEmail: string, userPassword: string, reset: boolean) {
		const _methodName = "GeneralPost";
		try {
			let _url = this.baseUrl;

			this.http.post<T>(_url + '/' + endpointVerb, JSON.stringify(postObject)).pipe(timeout(5000), retry(1))
				.subscribe(data => {
					if (data["result"] == "200") {
						Object.assign(ObjectToUpdate, data['data']);//this does a deep copy assignment so as to not remove the pass by reference
						SubjectToUpdate.next("200");
						if (reset == true) {
							SubjectToUpdate.next("0");
						}
					}
                    else if(data["result"] =="401")
                    {
                        SubjectToUpdate.next("401");
                    }
					else {
						SubjectToUpdate.next(data["result"]);
						SubjectToUpdate.next("0");
					}
				},
					error => {
						//@ts-ignore
						// this.loggingService.logEntry(this.fileName, this._Class, _methodName, LogLevel.ERROR, "Error trying to subscribe in general post:" + JSON.stringify(error), error.message, "request: " + JSON.stringify(postObject) + "email:" + userEmail + ", password:" + userPassword);
                        console.log(error);
						SubjectToUpdate.next("601");
						SubjectToUpdate.next("0");
					}
				);
		}
		catch (Exception) {
			// this.loggingService.logEntry(this.fileName, this._Class, _methodName, LogLevel.ERROR, "General error executing general post:" + JSON.stringify(Exception), Exception.message, JSON.stringify(postObject));
            console.log('Logging service:' + Exception);
			SubjectToUpdate.next("603");
			SubjectToUpdate.next("0");
		}
	}

    //A method used to get the characters data from the API using the general post method
    getCharacters(){
        try
        {
            const _get = '_getCharacters';
            this.getListResponseCode.next('0');
            this.GeneralPost(this.request, this.getListResponseCode, this.listData, 'retrieveUser', _get, 'Luca', 'Luca123', this.reset);    
        }
        catch(e)
        {
            console.log(e);
        }
    }

    //A method used to add a character to the API using the genreal post method
    addCharacter(character: Character){
        try
        {
            const _add = '_addCharacters';
            this.getAddResponseCode.next('0');
            this.GeneralPost(character, this.getAddResponseCode, this.listData, 'insertUser', _add, 'Luca', 'Luca123', this.reset);
        }
        catch(e)
        {
            console.log(e);
        }
    }

    //A method used to update a characters data in the API using the general post method
    updateCharacter(id: number, character: Character){
        try
        {
            const _update = 'updateCharacters';
            this.getUpdateResponseCode.next('0');
            this.GeneralPost(character, this.getUpdateResponseCode, id, 'updateGradUser', _update, 'Luca', 'Luca123', this.reset);
        }
        catch(e)
        {
            console.log(e);
        }
    }

    //A method used to delete a character from the API using the general post method
    deleteCharacter(id: number){
        try
        {
            const _update = 'updateCharacters';
            this.getDeleteResponseCode.next('0');
            this.GeneralPost(this.request, this.getDeleteResponseCode, id, 'deleteGradUser', _update, 'Luca', 'Luca123', this.reset);
        }
        catch(e)
        {
            console.log(e);
        }
    }

    //A method used to reset the behaviour subjects code
    resetCode(){
        try
        {
            this.getListResponseCode.next('0');
            this.getAddResponseCode.next('0');
            this.getUpdateResponseCode.next('0');
            this.getDeleteResponseCode.next('0');
        }
        catch(e)
        {
            console.log(e);
        }
    }
}