"use strict"
var HashTable = function () {
  this._limit = 8;
  this.nodesFilled = 0;
  Object.defineProperty(this, '_util', {
    get: function () {
      return this.nodesFilled / this._limit;
    }
  });
  this._storage = LimitedArray(this._limit);
};

var linkedNode = function (key, value) {
  this.key = key;
  this.value = value;
  this.next = null;
};

HashTable.prototype.insert = function (k, v) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var dataNode = new linkedNode(k, v);
  // if there is a collision
  if (this._storage.get(index)) {
    var currentNode = this._storage.get(index);
    if (currentNode.key === k) {
      currentNode.value = v;
    }
    while (currentNode.next) {
      if (currentNode.key === k) {
        currentNode.value = v;
      }
      currentNode = currentNode.next;
    }
    currentNode.next = dataNode;
  } else {
    this._storage.set(index, dataNode);
  }
  this.nodesFilled++;
  if (this._util > .75) {
    this._double();
  }
};

HashTable.prototype.retrieve = function (k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var currentNode = this._storage.get(index);
  if (currentNode) {
    if (currentNode.key === k) {
      return currentNode.value;
    }
    while (currentNode.next) {
      currentNode = currentNode.next;
      if (currentNode.key === k) {
        return currentNode.value;
      }
    }
  }
  return undefined;
};

HashTable.prototype.remove = function (k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var currentNode = this._storage.get(index);
  // if nothing at this index
  if (!currentNode) {
    return false;
  }
  // else if head value at this index is key we're looking for
  if (currentNode.key === k) {
    // if there is a next node detach head node and set next node as head;
    if (currentNode.next) {
      this._storage.set(index, currentNode.next);
    }
  } else {
    while (currentNode.next) {
      let prevNode = currentNode;
      currentNode = currentNode.next;
      if (currentNode.key === k) {
        prevNode.next = currentNode.next ? currentNode.next : undefined;
        break;
      }
    }
  }
  if (currentNode.key === k) {
    currentNode.value = undefined;
    //currentNode.key = undefined;
    this.nodesFilled--;
    if (this._util < .25) {
      this._halve();
    }
    return;
  }
  return false;
};

HashTable.prototype._double = function () {
  this._limit = this._limit * 2;
  this._reassignKeys();
};

HashTable.prototype._halve = function () {
  this._limit = Math.ceil(this._limit / 2);
  this._reassignKeys();
};

HashTable.prototype._reassignKeys = function () {
  var _temp = this._storage;
  this._storage = LimitedArray(this._limit);
  this.nodesFilled = 0;
  _temp.each(currentNode => {
    // if this index has a node stored there insert first node at linked list
    if (currentNode && currentNode.value) {
      this.insert(currentNode.key, currentNode.value);
      // reassign new indexes
      while (currentNode.next) {
        currentNode = currentNode.next;
        this.insert(currentNode.key, currentNode.value);
      }
    }
  });
};
/*
 * Complexity: What is the time complexity of the above functions?
 */
// Goal is to be in constant time, however, sometimes there is an expensive
// operation to double/ halve the size of the hastable- but this is amortized
// over all the lookups
