import { Character } from "./character.model";
import { Subject } from "rxjs";

export class CharacterService{
  private characters: Character[] = [];

      //   private characters : Character[] = [
      //   new Character('Fred Flintstone', 
      //   'Father of Pebbles Flintstone', 
      //   'https://clipart-library.com/2023/The-Flintstones-Fred-Transparent-Free-PNG.png',
      //   'Male', 35),
      //   new Character('Wilma Flintstone', 
      //   'Married to Fred Flintstone', 
      //   'https://upload.wikimedia.org/wikipedia/en/9/97/Wilma_Flintstone.png',
      //   'Female', 31),
      //   new Character('Barney Rubble', 
      //   'Married to Betty Rubble', 
      //   'https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Barney_Rubble.png/160px-Barney_Rubble.png',
      //   'Male', 33),
      //   new Character('Betty Rubble', 
      //   'Married to Barney Rubble', 
      //   'https://upload.wikimedia.org/wikipedia/en/5/5e/Betty_Rubble.png',
      //   'Female', 27),
      //   new Character('Pebbles Flintstone', 
      //   'Daughter of Wilma and Fred Flintstone', 
      //   'https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Pebbles_Flintstone.png/155px-Pebbles_Flintstone.png',
      //   'Female', 4),
      //   new Character('Mr. Slate', 
      //   'Freds boss at the Bedrock Quarrel and Gravel Company', 
      //   'https://d1w8c6s6gmwlek.cloudfront.net/yeoldeshirtshop.com/overlays/388/609/38860986.png',
      //   'Male', 42),
      //   new Character('Pearl Slaghoople', 
      //   'The widowed mother of Wilma', 
      //   'https://static.tvtropes.org/pmwiki/pub/images/pearl_slaghoople_6.png',
      //   'Female', 62),
      //   new Character('Bamm-Bamm Rubble', 
      //   'The adopted son of Barney and Betty Rubble', 
      //   'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Bamm-Bamm_Rubble.png/180px-Bamm-Bamm_Rubble.png',
      //   'Male', 5),
      //   new Character('Dino', 
      //   'He is a pet dinosaur', 
      //   'https://upload.wikimedia.org/wikipedia/en/f/f7/Dino_from_%22The_Flintstones%22.gif',
      //   'Male', 112),
      //   new Character('The Great Gazoo', 
      //   'a tiny, green, floating scientist who was exiled to Earth from his home planet for inventing a Doomsday Device.', 
      //   'https://upload.wikimedia.org/wikipedia/en/4/49/The_Great_Gazoo.png',
      //   'Male', 28),
      //   new Character('Joe Rockhead', 
      //   'A mutual friend of Barney and Fred', 
      //   'https://listium-res.cloudinary.com/image/upload/w_800,h_800,c_limit,q_auto,f_auto/nue2rxnmejqf01ltjdmy.jpg',
      //   'Male', 35),
      //   new Character('Schleprock', 
      //   'Schleprock is a friend of Bamm-Bamm and Pebbles', 
      //   'https://i.imgflip.com/6kibum.png?a473472',
      //   'Male', 12),
      //   new Character('Frank Frankenstone', 
      //   'American style hot dog', 
      //   'https://trendingpool.com/wp-content/uploads/2023/03/The_Flintstones_-_Character_Profile_Image_-_Frank_Frankenstone.webp?ezimgfmt=rs:350x506/rscb4/ng:webp/ngcb4',
      //   'Male', 32),
      //   new Character('Edna Flintstone', 
      //   'The mother of Fred Flintstone and the wife of Ed Flintstone.', 
      //   'https://i.pinimg.com/736x/53/9e/79/539e79eeb1e14bad304002c77ffc7f9f.jpg',
      //   'Female', 61),
      //   new Character('Cavey Jr.', 
      //   'Son of Captain Caveman', 
      //   'https://assets.mycast.io/characters/cavey-jr-4250191-normal.jpg?1666037036',
      //   'Male', 6),
      //   new Character('Arnold', 
      //   'Newspaper boy', 
      //   'https://i.pinimg.com/564x/6e/8c/6d/6e8c6d0745b6e3dfc3d35b737fe06680.jpg',
      //   'Male', 11),
      //   new Character('Captain Caveman', 
      //   'Father of Cavey Jr.', 
      //   'https://miro.medium.com/v2/resize:fit:1166/1*CNmAkntZl99zTjfGmFzIGw.png',
      //   'Male', 32),
      //   new Character('Ed "Pops" Flintstone', 
      //   'Father of Fred Flintstone', 
      //   'https://i.pinimg.com/736x/1e/3a/27/1e3a271b184475885f3a792f76db1fd4.jpg',
      //   'Male', 72),
      //   new Character('Samantha Stephens', 
      //   'A one-time and crossover character', 
      //   'https://m.media-amazon.com/images/M/MV5BMjAzNDYyMzQ2MV5BMl5BanBnXkFtZTYwNDA5OTE2._V1_.jpg',
      //   'Female', 25),
      //   new Character('Hidea Frankenstone', 
      //   'Married to Frank Frankenstone', 
      //   'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0d036411-ff5d-4066-a5cc-bb54ea6e0973/de1q5af-fa8ceb92-d827-403a-aefd-082ce886249a.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzBkMDM2NDExLWZmNWQtNDA2Ni1hNWNjLWJiNTRlYTZlMDk3M1wvZGUxcTVhZi1mYThjZWI5Mi1kODI3LTQwM2EtYWVmZC0wODJjZTg4NjI0OWEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.rtnhygcgfK1jpWRKEs6wFNkAkvxaYf6gpeng9POohUA',
      //   'Female', 26)
      // ];

      charactersAdded = new Subject<Character[]>();
      refreshList = new Subject<Character>();

      setCharacters(characters: Character[]){
        this.characters = characters;
        this.charactersAdded.next(this.characters.slice());
      }

      getCharacters(){
        return this.characters.slice();
      }

      addCharacter(character: Character){
        this.characters.push(character);
        this.charactersAdded.next(this.characters.slice());
      }

      getCharacter(id : number){
        return this.characters[id];
      }

      updateCharacter(id : number, character: Character){
        this.characters.splice(id, 1, character)
      }

      deleteCharacter(id: number){
        this.characters.splice(id, 1)
      }
}