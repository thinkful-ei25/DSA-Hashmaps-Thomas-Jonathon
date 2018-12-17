'use strict';
class Node{
  constructor(data){
    this.data = data;
    this.next = null;
  }
}

class HashMap{
  constructor(size){
    this.array = new Array(size);
    this.items = 0;
    this.size = size;
  } 

  hashString(string) {
    let hash = 5381;
    for (let i=0; i<string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }

  hashTypeOf(data){
    if(typeof(data) === 'object'){
      return String(Object.keys(data));
    }
    return String(data);
  }

  insert(data){
    const key = this.hashTypeOf(data);
    let hashPosition = this.hashString(key) % this.size;
    if(this.array[hashPosition]){
      let tempNode = this.array[hashPosition];
      while(tempNode.next !== null){
        tempNode = tempNode.next;
      }
      tempNode.next = new Node(data);
    }
    else{
      this.array[hashPosition] = new Node(data);
    }
  }

  delete(data){
    const key = this.hashTypeOf(data);
    let hashPosition = this.hashString(key) % this.size;
    let currentNode = this.array[hashPosition];
    let previousNode = currentNode;
    while(currentNode !== null){
      if(currentNode.data === data){
        previousNode.next = currentNode.next;
        return; //remove this to delete multiple entries of the same number
      }
      else{
        previousNode = currentNode; //only here to allow multiple deletions if the return is removed
      }
      currentNode = currentNode.next;
    }
  }

  printHash(){
    let string;
    let tempNode;
    for(let i = 0; i < this.size; i++){
      string = '';
      tempNode = this.array[i];
      while(tempNode !== null){
        tempNode.next === null ? string += tempNode.data : string += tempNode.data + ' -> ';
        tempNode = tempNode.next;
      }
      console.log(string);
    }
  }
}

function insertRandomNumbers(hashMap, totalNumbers){
  for(let i = 0; i < totalNumbers; i++){
    hashMap.insert(Math.floor(Math.random() * 100 + 1));
  }
}

const hashMap = new HashMap(20);
insertRandomNumbers(hashMap, 100);
hashMap.printHash();
console.log('------------------------------');
hashMap.delete(50);
hashMap.printHash();