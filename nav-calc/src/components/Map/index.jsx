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
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon.js';
import {Circle, Fill, Icon, Stroke, Style} from 'ol/style.js';
import LineString from 'ol/geom/LineString.js';
import Draw from 'ol/interaction/Draw.js';

import GeoJSON from 'ol/format/GeoJSON.js';
import KML from 'ol/format/KML.js'
import {getDistance} from 'ol/sphere';
import {fromLonLat} from 'ol/proj';
import {toSize} from 'ol/size';
import TileSource from 'ol/source/Tile';
import MapContext  from "./mapContext";

import CTA  from "./CTA.json";

const MapWrapper = ({children}) => {
 
  const mapRef=React.useRef(null);
  const [map ,setMap]=React.useState(null);
  const coordHandler=(evt)=>{
    console.log(evt.pixel)
  }
  React.useEffect(()=>{
    const defaultLayer=new TileLayer({
      source:new XYZ({
        url:'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
      })
    })
    const defaultVectorLayer=new VectorLayer({
      source:new VectorSource({
        format:new GeoJSON({
          dataProjection:'EPSG:4326',
        }),
        url:'https://api.maptiler.com/maps/outdoor-v2/style.json?key=10XI95JVnXvXtkZigjDA'
      })
    })
    const ctaLayer=new VectorLayer({
      source:new VectorSource({
        format:new GeoJSON(),
        url:'http://localhost:5000/cta'
      }),
      style:new Style({
        fill:new Fill({
          color:'transparent'
        }),
        stroke:new Stroke({
          width:4,
          color:'#A6D8A9'
        })
      })
    })
    const defaultMap=new Map({
      target:mapRef.current,
      layers:[defaultLayer,ctaLayer],
      view:new View({
        center:fromLonLat([55,54]),
        zoom:7,
      })
    });
    
    setMap(defaultMap);
    defaultMap.on('click',coordHandler)
    return () => defaultMap.setTarget(undefined);
  },[])
  
  
  return (
    <>
    <MapContext.Provider value={{map}}>
    <div style={{height:100+'%',width:100+'%'}} className={cl.map} ref={mapRef}>
      
    </div>  
    </MapContext.Provider>
    
    
    
    
    
    
    </>
    
  );
};

export default MapWrapper;