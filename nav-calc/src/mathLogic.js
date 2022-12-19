 Number.prototype.toSin=  function(){
    return Number(Math.sin(this*Math.PI/180))
  }
 Number.prototype.toCos=function(){
    return Number(Math.cos(this*Math.PI/180))
  }
  export default Number;