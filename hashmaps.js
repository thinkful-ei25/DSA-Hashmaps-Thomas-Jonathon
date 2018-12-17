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
    let key;
    if (typeof(data) === 'object') {
      key = Object.keys(data);
    } else {
      key = data;
    }
    let hashPosition = this.hashString(String(key)) % this.size;
    while(array[hashPosition] !== Number.MIN_SAFE_INTEGER && this.array[hashPosition] !== Number.MAX_SAFE_INTEGER){
      hashPosition = (hashPosition + 1) % this.size;
    }
    array[hashPosition] = data;
    this.items++;
  }

  print(){
    let array = [];
    for(let i = 0; i < this.size; i++){
      if(this.array[i] !== Number.MIN_SAFE_INTEGER){
        array.push(this.array[i]);
      }
    }
    return array;
  }

  getItem(key) {
    let hashPosition = this.hashString(String(key)) % this.size;
    let array = [];
    if (this.array[hashPosition] === Number.MIN_SAFE_INTEGER) {
      console.log('Element is not in the hashamp');
      return 0;
    } 
    while (this.array[hashPosition] !== Number.MIN_SAFE_INTEGER && this.array[hashPosition] !== Number.MAX_SAFE_INTEGER) {
      let hashKey = Object.keys(this.array[hashPosition]);
      if(String(hashKey) === key) {
        array.push(this.array[hashPosition][hashKey]);
      }
      hashPosition = (hashPosition + 1) % this.size;
    }
    return array;
  }

  hasItem(key) {
    let hashPosition = this.hashString(String(key)) % this.size;
    if (this.array[hashPosition] === Number.MIN_SAFE_INTEGER) {
      return false;
    } 
    let hashKey;
    while (this.array[hashPosition] !== Number.MIN_SAFE_INTEGER && this.array[hashPosition] !== Number.MAX_SAFE_INTEGER) {
      typeof(this.array[hashPosition]) === 'object'  ? hashKey = Object.keys(this.array[hashPosition]) : hashKey = this.array[hashPosition];
      if(String(hashKey) === String(key)) {
        return true;
      }
      hashPosition = (hashPosition + 1) % this.size;
    }
  }

  delete(key) {
    let hashPosition = this.hashString(String(key)) % this.size;
    if (this.array[hashPosition] === Number.MIN_SAFE_INTEGER) {
      console.log('DELETE: Item does not exist');
      return;
    } 
    let hashKey;
    while (this.array[hashPosition] !== Number.MIN_SAFE_INTEGER && this.array[hashPosition] !== Number.MAX_SAFE_INTEGER) {
      typeof(this.array[hashPosition]) === 'object'  ? hashKey = Object.keys(this.array[hashPosition]) : hashKey = this.array[hashPosition];
      if(String(hashKey) === key) {
        this.array[hashPosition] = Number.MAX_SAFE_INTEGER;
        this.items--;
        return;
      }
      hashPosition = (hashPosition + 1) % this.size;
    }
  }
}
/*
const hashMap = new HashMap(10);
let array =   [{Hobbit:'Frodo'}, {Wizard:'Gandolf'}, {Human:'Aragon'}, 
  {Elf: 'Legolas'}, {Maiar:'The Necromancer'}, {RingBearer: 'Gollum'}, {Hobbit:'Bilbo'}, {Maiar: 'Sauron'},
  {LadyOfLight: 'Galadriel'}, {HalfElven: 'Arwen'}, {Ent: 'Treebeard'}];
array.forEach(function(element) {
  hashMap.insert(element, hashMap.array);

});
// console.log(hashMap);
// console.log('GET ITEM: ',hashMap.getItem('Maiar'));
// console.log(hashMap.print());
*/



function palindrome(sentence) {
  const hashMap1 = new HashMap(26);
  let key;
  for (let i = 0; i < sentence.length; i++) {
    key = sentence.charAt(i);
    hashMap1.hasItem(key) ? hashMap1.delete(key) : hashMap1.insert(key, hashMap1.array);
  }
  return hashMap1.items > 1 ? false : true;
}

function groupAnagrams(listOfWords){
  const hashMap = new HashMap(listOfWords.length * 2 + 1);
  let bitMask;
  let value;
  let array = [[]];
  let i = 0;
  listOfWords.forEach(function(word){
    value = 0;
    for(let i = 0; i < word.length; i++){
      bitMask = 1 << (word.charCodeAt(i) - 97);
      value = bitMask + value;
    }
    let tempObject = {};
    tempObject[value] = word.length;
    if(hashMap.hasItem(value)){
      console.log('test');
      for(let i = 0; i < array.length; i++){
        if(array[i][0] === value){
          array[i].push(word);
        }
      }
    }
    else{
      hashMap.insert(tempObject, hashMap.array);
      array.push([]);
      array[i].push(value);
      array[i].push(word);
      i++;
    }
  });
  array.forEach(function(chain){
    chain.shift();
    if(chain.length === 0){
      array.pop();
    }
  });
  return array;
}

// console.log(palindrome('testing')); // false
// console.log(palindrome('racecar')); // true

groupAnagrams(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']);