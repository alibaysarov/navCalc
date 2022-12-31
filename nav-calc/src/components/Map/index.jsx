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


const MapWrapper = () => {
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
  const mapRef=useRef(null)
  const mapStateRef=useRef(null)
  mapStateRef.current=map
  const handleMapClick = (event) => {
    
    // get clicked coordinate using mapRef to access current React state inside OpenLayers callback
    //  https://stackoverflow.com/a/60643670
    const clickedCoord = mapStateRef.current.getCoordinateFromPixel(event.pixel);
    
    // transform coord to EPSG 4326 standard Lat Long
    const transormedCoord = transform(clickedCoord, 'EPSG:3857', 'EPSG:4326')
    console.log(transormedCoord)
    // set React state
    setSelectedCoord( transormedCoord )
    
  }
  useEffect(()=>{
    const initialFeaturesLayer=new VectorLayer({
      source:new VectorSource()
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
  let feature1=new Feature({
    geometry: new Polygon(),
    labelPoint: new Point([-11.0000,46.00000],"Point"),
    name: 'My Polygon'
  })
  const features=[feature1]
  useEffect(() => {
  
    if (features.length) { // may be empty on first render

      if(featuresLayer){
        // set features to map
      featuresLayer.setSource(
        new VectorSource({
          features: features // make sure features is an array
        })
      )

      // fit map to feature extent (with 100px of padding)
      map.getView().fit(featuresLayer.getSource().getExtent(), {
        padding: [100,100,100,100]
      })
      }

    }

  },[features])
  
  return (
    <div style={{height:400+'px',width:100+'%'}} className={cl.map} ref={mapRef}>
    <p>{selectedCoord}</p>
    </div>
  );
};

export default MapWrapper;