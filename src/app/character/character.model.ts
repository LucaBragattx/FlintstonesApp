export class Character {
     public id?: number;
    public name : string;
    public description : string;
    public imagePath : string;
    public sex : string;
    public age: number;
 
    constructor(name: string, desc: string, imagePath: string, sex: string, age: number, id?: number ){
         this.name = name;
         this.description = desc;
         this.imagePath = imagePath;
         this.sex = sex;
         this.age = age;
         this.id = id;
    }
 }