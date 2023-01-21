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
import {getDistance} from 'ol/sphere';
import {fromLonLat} from 'ol/proj';
import {toSize} from 'ol/size';




const MapWrapper = ({isShown,hideHandler}) => {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  let center;
  
  function success(pos) {
    const crd = pos.coords;
    center={
      lng:crd.longitude,
      lat:crd.latitude
    }
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    return {lat:crd.latitude,lng:crd.longitude}
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  
  navigator.geolocation.getCurrentPosition(success, error, options);
  const [ map, setMap ] = useState()
  const [ featuresLayer, setFeaturesLayer ] = useState()
  const [ selectedCoord , setSelectedCoord ] = useState()
  const [coords,setCoords]=useState([])


  const [hidemap,setHidemap]=useState(isShown)
  const hidemapHandler=()=>{
    setHidemap(prev=>!prev)
  }

  const mapRef=useRef(null)
  const mapStateRef=useRef(null)
  mapStateRef.current=map
  // const[distance,setDistance]=useState([])
  useEffect(()=>{
    const handleMapClick = (event) => {
    
      // get clicked coordinate using mapRef to access current React state inside OpenLayers callback
      //  https://stackoverflow.com/a/60643670
      
      const clickedCoord = mapStateRef.current.getCoordinateFromPixel(event.pixel);
      const transformedCoord = transform(clickedCoord, 'EPSG:3857', 'EPSG:4326')
      coords.push(transformedCoord)
      setCoords(prev=>[...prev,transformedCoord])
      console.log(coords);
      let totalDistance=0;
      coords.forEach((item,idx,arr)=>{
        if(arr.length>1 &&idx>0){
          
          // console.log(getDistance(arr[idx],arr[idx+1]));
         let c1=arr[idx-1]
         let c2=arr[idx]
        
        let range=getDistance(c1,c2)/1000/1.852;
        // setDistance(prev=>prev+=range)
        totalDistance+=range;
        console.log('Общее расстояние:',totalDistance);
        // console.log(range);
        }
      })
      
      const styles=new Style({
        image:new Circle({
          radius:6,
          fill:new Fill({color:'red'}),
          stroke:new Stroke({
            color:[0,0,0],
            width:5
          })
        }),
        stroke:new Stroke({
          color:'red',
          width:5,
        })
      })
      // console.log(styles.stroke)
      const stroke = new Style({
        fill:new Fill({
          color:'#000'
        }),
        stroke:new Stroke({
          color: 'magenta',
          width: 4,
        })
      })
      
      const pointStyle=new Style({
        image:new Circle({
          radius:7,
          fill:new Fill({
            color:'red',
          }),
          stroke:new Stroke({
            color:'black',
            width:1
          })
        }),
        fill:new Fill({
          color:'#000'
        }),
        stroke:new Stroke({
          color: 'magenta',
          width: 4,
        })
      })
      let lines = new LineString(coords).transform('EPSG:4326', initialMap.getView().getProjection());
     
      let secondLayer=new VectorLayer({
        source:new VectorSource({
          features: [
            new Feature({
              geometry: lines,
              name: "Line",
              style:pointStyle
            }),
          ],
        }),
        style:pointStyle
      })
      // secondLayer.setStroke(stroke)
      initialMap.addLayer(secondLayer)
      
      console.log(transformedCoord)
      // set React state
      setSelectedCoord( transformedCoord )
      
      function getMeDistance(){
        if(transformedCoord.length>1){
          const distances= transformedCoord.map((item,idx,arr)=>{
            if(arr.length>1&& item!=arr[-1]){
              let c1=arr[idx]
              let c2=arr[idx+1]
              return getDistance(c1,c2)/1.852
            }
            
          })
          return distances
        }
        
      }
      
    }
    const drawStyles=[
      new Style({
          stroke:new Stroke({
          color:'magenta',
          width:4
        }),
        image:new Icon({
          src:'./img/Triangle.svg',
          size:toSize([20,20]),
          scale:1
        })
    }),
    ]

    const drawStyles2=(feature)=>{
      const geometry=feature.getGeometry();
      const styles=[
        //lineString
        new Style({
          stroke:new Stroke({
            color:'magenta',
            width:4,

          })
        })
      ];
      geometry.forEachSegment((start,end)=>{
        //icons
        styles.push(
          new Style({
            geometry:new Point(end),
            image:new Icon({
              src:'./img/Triangle.svg',
              anchor: [0.75, 0.5],

            }),
          })
        );
      });
      return styles
    }
    // const styleFunction = function (feature) {
    //   const geometry = feature.getGeometry();
    //   const styles = [
    //     // linestring
    //     new Style({
    //       stroke: new Stroke({
    //         color: 'magenta',
    //         width: 4,
    //       }),
    //     }),
    //   ];
    
    //   geometry.forEachSegment(function (start, end) {
        
    //     // arrows
    //     styles.push(
    //       new Style({
    //         geometry: new Point(end),
    //         image: new Icon({
    //           src: './img/Triangle.svg',
    //           anchor: [0.75, 0.5],
              
              
    //         }),
    //       })
    //     );
    //   });
    
    //   return styles;
    // };

    const initialFeaturesLayer=new VectorLayer({
      source:new VectorSource(),
      // style:styleFunction,
    })
    const vector2 = new VectorLayer({
      source: new VectorSource({
        url:'https://api.maptiler.com/data/b8cecfdf-dc7c-465f-8ca0-eee878b61daf/features.json?key=10XI95JVnXvXtkZigjDA',
        format:new GeoJSON()
      }),
      style: drawStyles2,
    });
    const initialMap=new Map({
      target:mapRef.current,
      layers:[
        new TileLayer({
            source:new XYZ({
              url: 'https://api.maptiler.com/maps/topo-v2/{z}/{x}/{y}.png?key=10XI95JVnXvXtkZigjDA',
            })
          }),
          
        new VectorLayer({
          source:new VectorSource({
            url:'https://api.maptiler.com/data/b8cecfdf-dc7c-465f-8ca0-eee878b61daf/features.json?key=10XI95JVnXvXtkZigjDA',
            format:new GeoJSON()
          }),
          
          style:new Style({
            image: new Icon({
              src:'./img/AirportIcon.svg',
              size: toSize([40,40]),
              scale:1
              
            })
          })
        }),
        
      ],
      view:new View({
        projection: 'EPSG:3857',
        center: fromLonLat([37.414722000000,55.972778000000]),
        zoom: 7
      }),
      controls:[],
      interactions:[]
    })
    // const airports=
    
    setMap(initialMap)
    const drawIntercation=new Draw({
      style:drawStyles,
      // style:styleFunction,
      type:'LineString',
      source:new VectorSource({
        url:'https://api.maptiler.com/data/b8cecfdf-dc7c-465f-8ca0-eee878b61daf/features.json?key=10XI95JVnXvXtkZigjDA',
        format:new GeoJSON()
      }),
    })
    setFeaturesLayer(initialFeaturesLayer)
    initialMap.on('click',handleMapClick)
    // initialMap.on('contextmenu',(evt)=>{
    //   evt.preventDefault()
    //   initialMap.addInteraction(drawIntercation)
      
    //   const clickedCoord2 = mapStateRef.current.getCoordinateFromPixel(evt.pixel);
    //   const transformedCoord2 = transform(clickedCoord2, 'EPSG:3857', 'EPSG:4326')
    //   setCoords(prev=>[...prev,transformedCoord2])
    // })
  },[])
  
  
  
  return (
    <>
    
    <div style={{height:100+'%',width:100+'%'}} className={cl.map} ref={mapRef}>
    <p>{selectedCoord}</p>
    {/* <button onClick={hideHandler} className={cl.hide}>&times;</button> */}
    </div>  
    
    </>
    
  );
};

export default MapWrapper;