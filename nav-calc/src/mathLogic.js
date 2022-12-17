 Number.prototype.toSin=  function(){
    return Number(Math.sin(this*Math.PI/180).toFixed(3))
  }
 Number.prototype.toCos=function(){
    return Number(Math.cos(this*Math.PI/180).toFixed(3))
  }
  export default Number;