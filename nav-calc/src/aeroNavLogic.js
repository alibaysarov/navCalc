import Number from "./mathLogic";

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
        groundSpeed:(airSpd*driftAngleCos+windSpd*courseWindAgleCos).toFixed(1),
        driftAngle,
        heading:parseInt(magnHdg-driftAngle)
    }
    return isNaN(navData.groundSpeed)
    ?'---'
    :navData
    
}