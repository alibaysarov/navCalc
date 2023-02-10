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
import CTA  from "./CTA.json";
import Interaction from 'ol/interaction/Interaction';

const MapWrapper = ({children}) => {
 
  const mapRef=React.useRef(null);
  const [map ,setMap]=React.useState(null);
  
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
        url:'http://localhost:5000/cta',
      }),
      style:function(feature){
        function getColor(feature){
          if(feature.values_.class.toUpperCase()=='C'.toUpperCase()){
            return '#6181B3'
          }else{
            return '#8BCD93'
          }
        }
        return new Style({
          fill:new Fill({
            color:'transparent'
          }),
          stroke:new Stroke({
            width:4,
            color:getColor(feature)
          })
        })
      }
      
      
    })
    const ctrLayer=new VectorLayer({
      source:new VectorSource({
        format:new GeoJSON(),
        url:'http://localhost:5000/ctr'
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
      layers:[defaultLayer,ctrLayer,ctaLayer],
      view:new View({
        center:fromLonLat([55,54]),
        zoom:7,
      })
    });
    
    setMap(defaultMap);
    const coordHandler=(evt)=>{
      console.log(evt.coordinates)
    }
    const source=new VectorSource({wrapX:false})
      const vector=new VectorLayer({
        source:source,
        style: {
          'fill-color': 'magenta',
          'stroke-color': 'magenta',
          'stroke-width': 4,
          'circle-radius': 7,
          'circle-fill-color': 'magenta',
        },
      })
      defaultMap.addLayer(vector)
      var abc=100;
      let projection=defaultMap.getView().getProjection();
    defaultMap.on('contextmenu',function(evt){
      
      const modify = new Modify({source: source});
      defaultMap.addInteraction(modify);
      const draw = new Draw({
        source: source,
        type: 'LineString',
        geometryName:'wp'
      });
  //     var draw; // global so we can remove it later
  //   function addInteraction() {
  //       var value = typeSelect.value;
  //       if (value !== 'None') {
  //           draw = new ol.interaction.Draw({
  //               source: source,
  //               type: /** @type {ol.geom.GeometryType} */ (typeSelect.value)
  //           });
  //           map.addInteraction(draw);
  //          draw.on("drawend",function(e){
  //          var writer = new ol.format.GeoJSON();
  //          //pass the feature as an array
  //          var geojsonStr = writer.writeFeatures([e.feature]);
  //          alert(geojsonStr)
  //   });
  //  }
      const snap = new Snap({source: source});
      
      defaultMap.on('click',()=>{
        defaultMap.removeInteraction(draw);
        draw.abortDrawing()
        defaultMap.addInteraction(snap);
      })
      defaultMap.addInteraction(draw);
      defaultMap.addInteraction(snap);
      
      draw.on('drawend',(e)=>{
        let writer=new GeoJSON();
        let geojsonStr =JSON.parse( writer.writeFeatures([e.feature]));
        
        const waypoints=geojsonStr.features[0].geometry.coordinates;
        console.log(waypoints)
        const newWs=waypoints.map(wp=>transform(wp,projection,'EPSG:4326'))
        
        const wpGeometry=new LineString(newWs);
        const totalDistance=Math.round(getLength(wpGeometry,{projection:'EPSG:4326'})/1000);

        console.log(totalDistance,'КМ.')
        abc=abc+1
        // console.log(e)
        
      })
      modify.on('modifyend',(e)=>{
        // console.log(e.target.dragSegments_)
        const writer=new GeoJSON();
        // console.log(e.features.array_[0].values_.wp.flatCoordinates)
        let modifiedCoords=e.features.array_[0].values_.wp.flatCoordinates;
        let newCoords=[];
        
        modifiedCoords.forEach((item,idx,arr)=>{
          if(idx%2==0){
            newCoords.push([arr.slice(idx,idx+2)])
          }
        })
        
        let changedWpts=transform(newCoords[0],projection,'EPSG:4326')
        let geom=new LineString(changedWpts)
        const totalDistance=Math.round(getLength(geom,{projection:'EPSG:4326'}));
        console.log(totalDistance)
        
        // let changedWps=geom.transform(projection,'EPSG:4326')
        // console.log(changedWps)

      })
    })
    defaultMap.on('mousemove',coordHandler)
    return () => defaultMap.setTarget(undefined);
    
  },[])
  
  
  return (
    <>
      <MapContext.Provider value={{map}}>
          <div style={{height:100+'%',width:100+'%'}} className={cl.map} ref={mapRef}></div>  
      </MapContext.Provider>
    </>
    
  );
};

export default MapWrapper;