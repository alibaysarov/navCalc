const uniteCoords=(array)=>{
  let newCoords=[];
  array.forEach((item,idx,arr)=>{
    if(idx%2!=0){
      newCoords.push(arr.slice(idx-1,idx+1))
    }
  })
  return newCoords
}

export default{
  uniteCoords,
  
}