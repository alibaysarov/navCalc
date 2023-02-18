const uniteCoords=(array)=>{
  let newCoords=[];
  array.forEach((item,idx,arr)=>{
    if(idx%2!=0){
      newCoords.push(arr.slice(idx-1,idx+1))
    }
  })
  return newCoords
}
const timeToString=(num)=>{
  let date1=new Date();
  let year=date1.getFullYear();
  let month =date1.getMonth()
  let day=date1.getDate()
  num=Math.round(num)
  let hours=num%60;
  let minutes=num-(hours*60)
  let date = new Date(year,month,day,hours, minutes);
 
 return date.toLocaleTimeString().slice(0,-3)
}
export default{
  uniteCoords,
  timeToString
}