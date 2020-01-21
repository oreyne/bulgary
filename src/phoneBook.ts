import {readFileSync} from 'fs';
  
export class PhoneBook{
    pairs:Array<{name:string,phone:string}>=[];
    constructor(path:string){
     this.loadList(path);
    }
    loadList(path:string) {
       const data = readFileSync(path).toString('utf-8');         
       const textByLine = data.split("\n");
       const regex = RegExp('^([a-zA-Z]+),((([+]|00)359|0)8[7-9]{1}[2-9]{1}[0-9]{6})');
       let tag;
       for (let p of textByLine){
         tag = p.match(regex);
         if(tag)this.pairs.push({name:tag[1],phone:tag[2]})
       }
         console.log(this.pairs);     
    };
    add(name:string,phone:string){

      const regexName = RegExp('^([a-zA-Z]+)$');  
      const regexPhone = RegExp('^((([+]|00)359|0)8[7-9]{1}[2-9]{1}[0-9]{6})$');        
      if(name.match(regexName) && phone.match(regexPhone))this.pairs.push({name,phone})
      else console.log("name or phone number not valid");
    }
    delete(name:string){
        const index = this.pairs.findIndex(elem => elem.name===name);        
        if (index) this.pairs.splice(index, 1);        
        console.log("After removal:", this.pairs);
    }
    getPhoneByName(name:string){
        const index = this.pairs.findIndex(elem => elem.name===name);
        console.log(this.pairs[index].phone);
    }
    getAll(){
      this.pairs.sort((a, b) => {
        if (a.name < b.name)
          return -1;
        if (a.name > b.name)
          return 1;
        return 0;
      });
      for(let p of this.pairs)console.log(`name:${p.name}, phone:${p.phone}`);
    }
}
const pb=new PhoneBook("src/phones.txt");
pb.add("Maria","00359878123456")
pb.delete('Yeni');
pb.getPhoneByName('Alicia');
pb.getAll();
