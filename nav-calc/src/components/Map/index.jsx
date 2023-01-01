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
import {Circle, Fill, Stroke, Style} from 'ol/style.js';
import LineString from 'ol/geom/LineString.js';

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
 
  useEffect(()=>{
    const handleMapClick = (event) => {
    
      // get clicked coordinate using mapRef to access current React state inside OpenLayers callback
      //  https://stackoverflow.com/a/60643670
      
      const clickedCoord = mapStateRef.current.getCoordinateFromPixel(event.pixel);
      const transformedCoord = transform(clickedCoord, 'EPSG:3857', 'EPSG:4326')
      coords.push(transformedCoord)
      console.log(coords)
      
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
      
      // const styleFunction = function (feature) {
      //   const geometry = feature.getGeometry();
      //   const styles = [
      //     // linestring
      //     new Style({
      //       stroke: new Stroke({
      //         color: [0,0,0],
      //         width: 2,
      //       }),
      //     }),
      //   ];
      // }
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


      // const featureToAdd=new Feature({
      //   geometry:new Point(event.coordinate)
      // })
      
      // featureToAdd.setStyle(styles)
      // // initialFeaturesLayer.source.addFeature(featureToAdd)
      // console.log(featureToAdd)
      // transform coord to EPSG 4326 standard Lat Long
      
      console.log(transformedCoord)
      // set React state
      setSelectedCoord( transformedCoord )
      
    }
    
    const initialFeaturesLayer=new VectorLayer({
      source:new VectorSource(),
      
    })
    const initialMap=new Map({
      target:mapRef.current,
      layers:[
        //USGS TOPO
        new TileLayer({
          source:new XYZ({
            url: 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}',
          })
        }),
        initialFeaturesLayer
      ],
      view:new View({
        projection: 'EPSG:3857',
        center: [46,40],
        zoom: 3
      }),
      controls:[]
    })
    
    setMap(initialMap)
    setFeaturesLayer(initialFeaturesLayer)
    initialMap.on('click',handleMapClick)
  },[])
  
  
  
  
  return (
    <>
    
    <div style={{height:400+'px',width:100+'%'}} className={cl.map} ref={mapRef}>
    <p>{selectedCoord}</p>
    <button onClick={hideHandler} className={cl.hide}>&times;</button>
    </div>  
    
    </>
    
  );
};

export default MapWrapper;