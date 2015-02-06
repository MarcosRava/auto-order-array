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
  return AutoOrderArray;
  
})();

function push() {
  var args = Array.prototype.slice.call(arguments);
  this.emit('beforePush', args, this);
  var ret = Array.prototype.push.apply(this, arguments);
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

function autoSort() {
  console.log('sorting')
  this.sort(this._args.compare);  
}
