import express from 'express'
import cors from "cors";

const PORT=5000;
const app=express();
app.use(express.json())
app.use(cors())

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

app.listen(PORT,()=>console.log('Server has been started!!!'))
