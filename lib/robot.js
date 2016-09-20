'use strict';

function Robot() {
  // implement your solution here!
  this.bearing = 'north'

}

var directions = ['east', 'west', 'north', 'south']

Robot.prototype.orient = function(direction){
  if(directions.includes(direction)){
    return this.bearing = direction
  } else {
    var error = new Error("Invalid Robot Bearing")
    throw error
  }
}

Robot.prototype.turnRight = function(){
  if(this.bearing == 'north'){
    return this.bearing = 'east'
  }else if(this.bearing == 'east'){
    return this.bearing = 'south'
  }else if(this.bearing == 'south'){
    return this.bearing = 'west'
  }else{
    this.bearing = 'north'
  }
}

Robot.prototype.turnLeft = function(){
  if(this.bearing == 'north'){
    return this.bearing = 'west'
  }else if(this.bearing == 'east'){
    return this.bearing = 'north'
  }else if(this.bearing == 'south'){
    return this.bearing = 'east'
  }else{
    this.bearing = 'south'
  }  
}

Robot.prototype.at = function(x,y){
  this.coordinates = [x,y]
}

Robot.prototype.advance = function(){
  var location = this.coordinates
  if(this.bearing == 'north'){
    location[1] = location[1] + 1
  }else if(this.bearing == 'east'){
    location[0] = location[0] + 1
  }else if(this.bearing == 'south'){
    location[1] = location[1] - 1
  }else{
    location[0] = location[0] -1
  }
  return this.at(location[0], location[1])
}

Robot.prototype.instructions = function(x){
  var array = []
  var dir = x.split("")
  for(var i = 0; i < dir.length; i++){
    if(dir[i] == 'L'){
      array.push("turnLeft")
    }else if(dir[i] =='R'){
      array.push("turnRight")
    }else if(dir[i] == 'A'){
      array.push("advance")
    }
  }
  return array
}

Robot.prototype.evaluate =function(string){
  
  var commands = this.instructions.call(this,string)
  for(var i = 0; i < commands.length; i++){
    var do_it = "this."+commands[i]+"()"
    eval(do_it)
  }

}

Robot.prototype.place = function(location_hash){
  this.at(location_hash.x,location_hash.y)
  this.orient(location_hash.direction)
}
