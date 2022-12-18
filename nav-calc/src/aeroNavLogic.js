import Number from "./mathLogic";

//Угол сноса

export const groundSpeed=(airSpd,windSpd,magnHdg,windDir)=>{
    const findMeDriftAngle=(airSpd,windSpd,magnHdg,windDir)=>{
        const navWind=windDir>180?windDir-180:windDir+180;
        const courseWindAngle=navWind-magnHdg;
        let driftAngle=(courseWindAngle*windSpd/airSpd)*courseWindAngle.toSin();
         return isNaN(driftAngle)?'---':{driftAngleCos:driftAngle.toCos(),courseWindAgleCos:courseWindAngle.toCos()}
    }

    const res=findMeDriftAngle(airSpd,windSpd,magnHdg,windDir);
    console.log(res)
    const {driftAngleCos,courseWindAgleCos}=res;
    return isNaN((airSpd*driftAngleCos+windSpd*courseWindAgleCos).toFixed(1))
    ?'---'
    :(airSpd*driftAngleCos+windSpd*courseWindAgleCos).toFixed(1)
    
}