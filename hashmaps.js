'use strict';
/*
  Create a Hash map called lor and add the following items to it. 
  {Hobbit:"Bilbo"}, {Hobbit:"Frodo"}, {Wizard:"Gandolf"}, {Human:"Aragon"}, 
  {Elf: "Legolas"}, {Maiar:"The Necromancer"}, {Maiar: "Sauron"}, {RingBearer: "Gollum"}, 
  {LadyOfLight: "Galadriel"}, {HalfElven: "Arwen"}, {Ent: "Treebeard"}
*/

class HashMap{
  constructor(size){
    this.array = new Array(size);
    this.size = size;
    this.items = 0;
    this.initiateArray(this.array);
  } 

  initiateArray(array){
    const length = array.length;
    for(let i = 0; i < length; i++){
      array[i] = Number.MIN_SAFE_INTEGER;
    }
  }

  hashString(string) {
    let hash = 5381;
    for (let i=0; i<string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }

  resizeHashMap(){
    let oldSize = this.size;
    this.size = this.size * 2;
    const newArray = new Array(this.size);
    this.initiateArray(newArray);
    this.items = 0;
    for(let i = 0; i < oldSize; i++){
      if(this.array[i] !== Number.MIN_SAFE_INTEGER){
        this.insert(this.array[i], newArray);
      }
    }
    this.array = newArray;
    return this.array;
  }

  insert(data, array){
    if(Math.floor(this.size / 2) <= this.items){
      array = this.resizeHashMap();
    }
    const key = Object.keys(data);
    let hashPosition = this.hashString(String(key)) % this.size;
    while(array[hashPosition] !== Number.MIN_SAFE_INTEGER){
      hashPosition = (hashPosition + 1) % this.size;
    }
    array[hashPosition] = data;
    this.items++;
  }

  print(){
    for(let i = 0; i < this.size; i++){
      if(this.array[i] !== Number.MIN_SAFE_INTEGER){
        console.log(this.array[i]);
      }
    }
  }

  getItem(key) {
    let hashPosition = this.hashString(key) % this.size;
    let array = [];
    if (this.array[hashPosition] === Number.MIN_SAFE_INTEGER) {
      console.log('Element is not in the hashamp');
      return 0;
    } 
    while (this.array[hashPosition] !== Number.MIN_SAFE_INTEGER) {
      let hashKey = Object.keys(this.array[hashPosition]);
      if(String(hashKey) === key) {
        array.push(this.array[hashPosition][hashKey]);
      }
      hashPosition = (hashPosition + 1) % this.size;
    }
    return array;
  }
}

const hashMap = new HashMap(10);
let array =   [{Hobbit:'Frodo'}, {Wizard:'Gandolf'}, {Human:'Aragon'}, 
  {Elf: 'Legolas'}, {Maiar:'The Necromancer'}, {RingBearer: 'Gollum'}, {Hobbit:'Bilbo'}, {Maiar: 'Sauron'},
  {LadyOfLight: 'Galadriel'}, {HalfElven: 'Arwen'}, {Ent: 'Treebeard'}];
array.forEach(function(element) {
  hashMap.insert(element, hashMap.array);
});
// console.log(hashMap);
console.log('GET ITEM: ',hashMap.getItem('Maiar'));