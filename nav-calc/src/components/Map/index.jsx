import React,{useState,useRef,useEffect} from 'react';
import cl from './index.module.scss';
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'
import Point from 'ol/geom/Point.js';
import MultiPoint from 'ol/geom/MultiPoint.js';
import {transform} from 'ol/proj';
import {toLonLat} from 'ol/proj';
import {transformExtent} from 'ol/proj';
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon.js';
import {Circle, Fill, Icon, Stroke, Style} from 'ol/style.js';
import LineString from 'ol/geom/LineString.js';
import {getLength} from 'ol/sphere';

import Draw from 'ol/interaction/Draw.js';
import Modify from 'ol/interaction/Modify.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import KML from 'ol/format/KML.js'
import {getDistance} from 'ol/sphere';
import {fromLonLat} from 'ol/proj';
import {toSize} from 'ol/size';
import TileSource from 'ol/source/Tile';
import Snap from 'ol/interaction/Snap.js'
import MapContext  from "./mapContext";
import Interaction from 'ol/interaction/Interaction';

//redux
import { useDispatch,useSelector } from "react-redux";
import { showDistance,showTime } from '../../redux/slices/planSlice.js';
import {drawHandler} from '../../redux/slices/mapSlice.js';

//new imports
import { mapLayers,vector,source,modify,snap,draw } from "./utils/mapLayers.js";
import mapLogic from "./utils/mapLogic.js";
const MapWrapper = ({children,paramsChangeHandler}) => {
  const dispatch=useDispatch()
  const {isLineAdded}=useSelector((state)=>state.map)
  
  const mapRef=React.useRef(null);
  const [map ,setMap]=React.useState(null);
  
  const geoOptions={
    enableHighAccuracy: true,
    timeout: 3000,
    maximumAge: 0
  }
  let centerMap=[0,0]
  function success(pos) {
    const crd = pos.coords;
    centerMap=[crd.longitude,+crd.latitude]  
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }  
  navigator.geolocation.getCurrentPosition(success, error, geoOptions);
  
  
  React.useEffect(()=>{
    const defaultMap=new Map({
      target:mapRef.current,
      layers:mapLayers,
      view:new View({
        center:fromLonLat(centerMap),
        zoom:7,
      }),
      controls:[]
    });
    
    setMap(defaultMap);
    defaultMap.addLayer(vector)
      
    let projection=defaultMap.getView().getProjection();
    defaultMap.on('contextmenu',function(evt){
      defaultMap.addInteraction(modify);
      function finishDrawingHandler(){
        defaultMap.removeInteraction(draw);
        draw.finishDrawing()
        defaultMap.addInteraction(snap);
      }
      defaultMap.on('click',finishDrawingHandler);
      
      if(isLineAdded==false){
        defaultMap.addInteraction(draw);
        defaultMap.addInteraction(snap);
      }else{
        defaultMap.removeInteraction(draw);
        defaultMap.removeInteraction(snap)
      }
      
      
      draw.on('drawend',(e)=>{
        dispatch(drawHandler())
        let writer=new GeoJSON();
        let geojsonStr =JSON.parse( writer.writeFeatures([e.feature])); 
        const waypoints=geojsonStr.features[0].geometry.coordinates;
       
        const newWs=waypoints.map(wp=>transform(wp,projection,'EPSG:4326'))
        
        const wpGeometry=new LineString(newWs);
        const totalDistance=Math.round(getLength(wpGeometry,{projection:'EPSG:4326'})/1000);

  
        dispatch(showDistance({distance:totalDistance}))
        dispatch(showTime())
        
        
      })
      modify.on('modifyend',(e)=>{
        
        
        const targetGeometry=e.features.array_
          .map(el=>el.getGeometry()).map(item=>item.flatCoordinates)
        
        const coordinates=mapLogic.uniteCoords(targetGeometry.at(-1))
          .map(item=>transform(item,projection,'EPSG:4326'))
        
        let geom=new LineString(coordinates)
        const totalDistance=Math.round(getLength(geom,{projection:'EPSG:4326'})/1000)
        dispatch(showDistance({distance:totalDistance}))
        dispatch(showTime())

      })
    })
    
    return () => defaultMap.setTarget(undefined);
    
  },[])
  
  
  return (
    <>
      <MapContext.Provider value={{map}}>
          <div style={{height:'100%',width:'100%'}} className={cl.map} ref={mapRef}></div>  
      </MapContext.Provider>
    </>
    
  );
};

export default MapWrapper;