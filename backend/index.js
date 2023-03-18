import express from 'express'
import cors from "cors";
import fs from "fs";
import mongoose from 'mongoose';
import Airport from './Models/Airport.js';
import ControlTrafficArea from './Models/CTA.js';

import mongoimport from 'mongoimport';
// import ControlTrafficArea from './Models/CTA.js';



const PORT=5000;
const app=express();
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb+srv://admin:d59tjtfj@cluster0.f2hokgu.mongodb.net/navCalc')
.then(()=>console.log('DB is Ok'))
		.catch((err)=>console.log('DB Error',err))

const myRoutes=[
  {
    name:'UWUU-UUEE',
    waypoints:[{name:'UWUU',type:'arpt'},{name:'UWKD',type:'arpt'},{name:'UUEE',type:'arpt'}],
    duration:'1hr 5min'
  },
  {
    name:'UUEE-UWUU',
    waypoints:[{name:'UUEE',type:'arpt'},{name:'UWKD',type:'arpt'},{name:'UWUU',type:'arpt'}],
    duration:'1hr 35min'
  }
]

app.get('/',(req,res)=>{
  try {
    res.status(200).json(myRoutes)
  } catch (e) {
    console.log(`Ошибка${e}`)
    res.status(500).json({
      message:'Не удалось получить маршруты!!'
  })
  }
  
})
/*

[32.682373046875, 53.064666151083, 41.317626953125, 56.84627766110529]

[[
  [32.682373046875,56.84627766110529],
  [41.317626953125,56.84627766110529],
  [41.317626953125,53.064666151083],
  [32.682373046875,53.064666151083],
  [32.682373046875,56.84627766110529]
]]

   {
     location: {
       $geoWithin: {
          $geometry: {
             type : "Polygon" ,
             coordinates: [[[32.682373046875,56.84627766110529],[41.317626953125,56.84627766110529],[41.317626953125,53.064666151083],[32.682373046875,53.064666151083],[32.682373046875,56.84627766110529]]]
          }
       }
     }
    }

    {
      location:{
        $geoWithin:{
          $geometry:{
            type : "Polygon" ,
            coordinates: [[[32.682373046875,56.84627766110529],[41.317626953125,56.84627766110529],[41.317626953125,53.064666151083],[32.682373046875,53.064666151083],[32.682373046875,56.84627766110529]]]
          }
        }
      }
    }


    {
      location:{
        $geoWithin:{
          $box:[
            [32.682373046875, 53.064666151083],
            [41.317626953125, 56.84627766110529]
          ]
        }
      }
    }
   



    db.airports.find({"location.geometry.coordinates":{$geoWithin:{$box:[[32,53],[41,56]]}}})
*/
app.get('/api/airports',async(req,res)=>{
  const {lng1,lat1,lng2,lat2}=req.query;
  const rectangle=[[lng1,lat1],[lng2,lat2]];

  for(let i=0;i<rectangle.length;i++){
    for(let j=0;j<rectangle[i].length;j++){
      rectangle[i][j]=parseFloat(rectangle[i][j]);
    }
  }

  const data={
    type: "FeatureCollection",
	name: "ARPT",
	crs: {
		type: "name",
		properties: {
			name: "urn:ogc:def:crs:OGC:1.3:CRS84"
		}
	},
  features:[]
  }
  try {
    const airports=await (await Airport.find({"location.geometry.coordinates":{$geoWithin:{$box:rectangle}}})).map(item=>item.location)
    data.features=airports
    res.status(200).json(data) 
  } catch (err) {
    res.status(500).json({message:`Ошибка  ${err}`})    
  }
})
app.get('/cta',(req,res)=>{
  let src
  try {
    fs.readFile('CTA.geojson','utf-8',(err,data)=>{
      src=data;
      src=JSON.parse(src)
      res.status(200).json(src)
    })
   
  } catch (err) {
    
  }
})

app.get('/addCTA',async(req,res)=>{
  
  try {
    let src;
    let data= await fs.promises.readFile('CTA.geojson','utf-8');
    const {features}=JSON.parse(data);
    const features2=features.map(item=>{
      return {location:item}
    })
    
    features2.forEach(element => {
      const append=async() =>{
        await fs.promises.appendFile('res.json',JSON.stringify(element,null,0)+'\n')
      }
      append()
    });
    console.log(features);
    // const cta=await ControlTrafficArea.insertMany(features);
    
    res.status(200).send('cta added')
    // const cta1=await CTA.insertMany(req.body)    
  } catch (err) {
    res.status(500).json({message:`Ошибка ${err}`})    
  }
})
app.get('/ctr',(req,res)=>{
  let src
  try {
    fs.readFile('CTR.geojson','utf-8',(err,data)=>{
      src=data;
      src=JSON.parse(src)
      res.status(200).json(src)
    })
   
  } catch (err) {
    
  }
})
app.get('/api/zones',async(req,res)=>{
  let obj1={
    type: "FeatureCollection",
    name: "CTA",
    crs: { type: "name", properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    features:[]
  }
  try {
    const ctas=(await ControlTrafficArea.find()).map(el=>el.location);
    if(ctas){
      obj1.features=ctas;
      res.status(200).json(obj1);
    }else{
      res.status(404).json({err:'CTA и CTR не найдены'})
    }
  } catch (err) {
    res.status(500).json({err:"Ошибка при загрузке CTA и CTR"})
  }
})
app.listen(PORT,()=>console.log('Server has been started!!!'))
