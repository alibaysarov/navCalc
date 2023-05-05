import Number from "./mathLogic";


import { SphericalUtil } from "node-geometry-library";
import geomagnetism from 'geomagnetism';
//Путевая скорость

export const groundSpeed=(airSpd,windSpd,magnHdg,windDir)=>{

    function evaluateSpd(item){
        item.value=Number(item.value).toFixed(1)
        switch (item.measure) {
            case 'ms':
                item.value*=3.6
                break;
            case 'kts':
                item.value*=1.852
                break;
            case 'kmh':
                item.value=Number(item.value)
                break;
        }
        return Number(item.value);
    }
    
    airSpd=evaluateSpd(airSpd)
    windSpd=evaluateSpd(windSpd)

    const findMeDriftAngle=(airSpd,windSpd,magnHdg,windDir)=>{
        const navWind=(windDir>180)?windDir-180:windDir+180;
        const courseWindAngle=navWind-magnHdg;
        console.log(courseWindAngle)
        let driftAngle=parseInt((57.3*windSpd/airSpd)*courseWindAngle.toSin())
        
             console.log(driftAngle)
         return isNaN(driftAngle)
         ?'---'
         :{
            driftAngle:!courseWindAngle>180?-driftAngle:driftAngle,
            driftAngleCos:driftAngle.toCos(),
            courseWindAgleCos:courseWindAngle.toCos()
            }
    }

    const res=findMeDriftAngle(airSpd,windSpd,magnHdg,windDir);
    console.log(res)
    const {driftAngle,driftAngleCos,courseWindAgleCos}=res;
    const navData={
        groundSpeed:Math.round(airSpd*driftAngleCos+windSpd*courseWindAgleCos),
        driftAngle,
        heading:parseInt(magnHdg-driftAngle)<0?360+parseInt(magnHdg-driftAngle):parseInt(magnHdg-driftAngle)
    }
    return isNaN(navData.groundSpeed)
    ?'---'
    :navData
    
}

export const airData=(leg)=>{
    console.log(leg);
    const {start,end}=leg;
    let trueHeading='---';
    if(end==null){
        return trueHeading;
    }else{
    
    const pointA={
        lat:start[1],
        lng:start[0]
    }
    const pointB={
        lat:end[1],
        lng:end[0]
    }
    trueHeading=SphericalUtil.computeHeading(pointA,pointB);
    trueHeading=trueHeading>0?trueHeading:360-trueHeading;
    const magneticVariation=geomagnetism.model().point([pointB.lat,pointB.lng]).decl;
    const magnetHeading=trueHeading-magneticVariation;
    
    return {trueHeading,magnetHeading};


    }
    
}