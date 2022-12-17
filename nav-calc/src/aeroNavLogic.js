import Number from "./mathLogic";
export const findMeDriftAngle=(airSpd,windSpd,magnHdg,windDir)=>{
    const navWind=windDir>180?windDir-180:windDir+180;
    const courseWindAgle=navWind-magnHdg;
    let driftAngle=(courseWindAgle*windSpd/airSpd)*courseWindAgle.toSin();
     return driftAngle
  }