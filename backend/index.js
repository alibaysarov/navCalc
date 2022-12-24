import express from 'express'


const PORT=5000;
const app=express();
app.use(express.json())

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
  res.status(200).json(myRoutes)
})

app.listen(PORT,()=>console.log('Server has been started!!!'))
