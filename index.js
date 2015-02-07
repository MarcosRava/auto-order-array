var EventEmitter = require("events").EventEmitter;
var extend = require('extend');

var AutoOrderArray;

module.exports = (function (){
  function AutoOrderArray(args) {
    args = args || {};
    this._args = args;
    this.on("push", autoSort);
  }
  AutoOrderArray.prototype = new Array();
  extend(true, AutoOrderArray.prototype, EventEmitter.prototype);
  AutoOrderArray.prototype.constructor = AutoOrderArray;
  AutoOrderArray.prototype.push = push;
  AutoOrderArray.prototype.pop = pop;
  AutoOrderArray.prototype.sort = sort;
  AutoOrderArray.prototype.concat = concat;
  AutoOrderArray.prototype.indexOf = indexOf;
  AutoOrderArray.prototype.lastIndexOf = lastIndexOf;
  AutoOrderArray.prototype.join = join;
  AutoOrderArray.prototype.reverse = reverse;
  return AutoOrderArray;
  
})();

function push() {
  var args = Array.prototype.slice.call(arguments);
  this.emit('beforePush', args, this);
  var ret = Array.prototype.push.apply(this, args);
  this.emit('push', args, this);  
  return ret;
}

function pop() {
  var args = Array.prototype.slice.call(arguments);
  this.emit('beforePop', args, this);
  var ret = Array.prototype.pop.apply(this, arguments);
  this.emit('pop', ret, this);  
  return ret;
}

function sort() {
  var args = Array.prototype.slice.call(arguments);
  this.emit('beforeSort', args, this);
  var ret = Array.prototype.sort.apply(this, arguments);
  this.emit('sort', ret, this);  
  return ret;
}

function concat() {
  var args = Array.prototype.slice.call(arguments);
  this.emit('beforeConcat', args, this);
  var ret = new this.constructor(this._args);
  Array.prototype.forEach.call(this, function(obj) {
     ret.push(obj);
  });
  Array.prototype.forEach.call(args, function(array) {
    Array.prototype.forEach.call(array, function(obj) {
     ret.push(obj);
    });
  });
  this.emit('concat', ret, this);  
  return ret;
}

function indexOf() {
  var args = Array.prototype.slice.call(arguments);
  this.emit('beforeIndexOf', args, this);
  var ret = Array.prototype.indexOf.apply(this, arguments);
  this.emit('indexOf', ret, this);  
  return ret;
}

function lastIndexOf() {
  var args = Array.prototype.slice.call(arguments);
  this.emit('beforeLastindexOf', args, this);
  var ret = Array.prototype.lastIndexOf.apply(this, arguments);
  this.emit('lastIndexOf', ret, this);  
  return ret;
}

function join() {
  var args = Array.prototype.slice.call(arguments);
  this.emit('beforeJoin', args, this);
  var ret = Array.prototype.join.apply(this, arguments);
  this.emit('join', ret, this);  
  return ret;
}

function reverse() {
  var args = Array.prototype.slice.call(arguments);
  this.emit('beforeReverse', args, this);
  var ret = Array.prototype.reverse.apply(this, arguments);
  this.emit('reverse', ret, this);  
  return ret;
}

function autoSort() {
  this.sort(this._args.compare);  
}
