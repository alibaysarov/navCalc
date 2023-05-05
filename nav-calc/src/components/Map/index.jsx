import React, { useState, useRef, useEffect } from "react";
import cl from "./index.module.scss";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import XYZ from "ol/source/XYZ";
import Point from "ol/geom/Point.js";
import MultiPoint from "ol/geom/MultiPoint.js";
import { transform } from "ol/proj";
import { toLonLat } from "ol/proj";
import { transformExtent } from "ol/proj";
import Feature from "ol/Feature";
import Polygon from "ol/geom/Polygon.js";
import { Circle, Fill, Icon, Stroke, Style } from "ol/style.js";
import LineString from "ol/geom/LineString.js";
import { getLength } from "ol/sphere";

import Draw from "ol/interaction/Draw.js";
import Modify from "ol/interaction/Modify.js";
import GeoJSON from "ol/format/GeoJSON.js";
import KML from "ol/format/KML.js";
import { getDistance } from "ol/sphere";
import { fromLonLat } from "ol/proj";
import { toSize } from "ol/size";
import TileSource from "ol/source/Tile";
import Snap from "ol/interaction/Snap.js";
import MapContext from "./mapContext";
import Interaction from "ol/interaction/Interaction";
import { toStringHDMS } from "ol/coordinate.js";
//redux
import { useDispatch, useSelector } from "react-redux";
import {
  showDistance,
  showTime,
  pointsList,
  getMeWind,
} from "../../redux/slices/planSlice.js";
import { drawHandler, viewPortHandler } from "../../redux/slices/mapSlice.js";

//new imports
import {
  mapLayers,
  vector,
  source,
  modify,
  snap,
  draw,
  ctrStyle,
  ctaStyle,
  airportStyle,
  layersUrl,
} from "./utils/mapLayers.js";
import mapLogic from "./utils/mapLogic.js";
import { containsExtent, intersects } from "ol/extent";
const MapWrapper = ({ children, paramsChangeHandler }) => {
  const dispatch = useDispatch();
  const { isLineAdded, zones, airports } = useSelector((state) => state.map);

  const { speed } = useSelector((state) => state.plan);

  const { zonesIsShown, airportsIsShown } = useSelector((state) => state.ui);
  const mapRef = React.useRef(null);
  const [map, setMap] = React.useState(null);

  const geoOptions = {
    enableHighAccuracy: true,
    timeout: 3000,
    maximumAge: 0,
  };
  let centerMap = [0, 0];
  function success(pos) {
    const crd = pos.coords;
    centerMap = [crd.longitude, +crd.latitude];
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  navigator.geolocation.getCurrentPosition(success, error, geoOptions);

  React.useEffect(() => {
    const [defaultLayer, ctrLayer, ctaLayer, airportsLayers] = mapLayers;
    // ctrLayer.setStyle(ctrStyle)

    const getmeVC = () => {
      const extent1 = defaultMap
        .getView()
        .calculateExtent(defaultMap.getSize());
      const viewportCoord = transformExtent(extent1, "EPSG:3857", "EPSG:4326");

      if (airportsIsShown == true) {
        console.log(viewportCoord);
        dispatch(viewPortHandler(viewportCoord));
        const [lng1, lat1, lng2, lat2] = viewportCoord;
        console.log(lng1, lat1, lng2, lat2);

        const url = new URL(`${layersUrl}/api/airports`);
        url.searchParams.set("lng1", lng1);
        url.searchParams.set("lat1", lat1);
        url.searchParams.set("lng2", lng2);
        url.searchParams.set("lat2", lat2);

        airportsLayers.getSource().setUrl(url.href);
        airportsLayers.setStyle(airportStyle);
        airportsLayers.getSource().refresh();
      } else {
        airportsLayers.getSource().clear();
        airportsLayers.setStyle(false);
        airportsLayers.getSource().refresh();
      }
    };

    const defaultMap = new Map({
      target: mapRef.current,
      layers: [...mapLayers, vector],
      view: new View({
        center: fromLonLat([37, 55]),
        zoom: 7,
      }),
      controls: [],
    });
    const toggleCtaFeatures = () => {
      if (zonesIsShown) {
        console.log(ctaLayer.getSource());
        ctaLayer.getSource().setUrl(`${layersUrl}/api/zones`);
        ctaLayer.getSource().refresh();
        // console.log(transform(defaultMap.getView().getCenter(),'EPSG:3857','EPSG:4326'));
      } else {
        ctaLayer.getSource().clear();
      }
      console.log(zonesIsShown);
    };
    toggleCtaFeatures();
    getmeVC();

    // defaultMap.addLayer(vector)
    const renderInViewPortCTR = (feature) => {
      const extent = defaultMap.getView().calculateExtent(defaultMap.getSize());
      const geom = feature.getGeometry().intersectsExtent(extent);
      return geom ? ctrStyle : undefined;
    };

    const renderInViewPortCTA = (feature) => {
      const getColor =
        feature.values_.class.toUpperCase() == "C".toUpperCase()
          ? "#6181B3"
          : "#8BCD93";

      const style = new Style({
        fill: new Fill({
          color: "transparent",
        }),
        stroke: new Stroke({
          width: 2,
          color: getColor,
        }),
      });
      const cache = new Set([feature]);

      const extent = defaultMap.getView().calculateExtent(defaultMap.getSize());
      const geom = feature.getGeometry().intersectsExtent(extent);
      return geom ? style : undefined;
    };
    // console.log(readFeatures(layerItems));

    const moveStarthandler = (e) => {
      ctaLayer.setStyle(renderInViewPortCTA);
      ctrLayer.setStyle(renderInViewPortCTR);
    };

    setMap(defaultMap);

    function finishDrawingHandler() {
      // defaultMap.addInteraction(draw)
      if (draw.sketchCoords_.length > 2) {
        defaultMap.removeInteraction(draw);
      }
      draw.abortDrawing();
      // defaultMap.addInteraction(snap);
    }

    let projection = defaultMap.getView().getProjection();
    const addInteractions = () => {
      defaultMap.addInteraction(draw);
      defaultMap.addInteraction(snap);
    };
    defaultMap.on("moveend", moveStarthandler);
    defaultMap.on("moveend", getmeVC);
    defaultMap.on("contextmenu", function (evt) {});

    defaultMap.on("click", finishDrawingHandler);
    draw.on("drawend", (e) => {
      // defaultMap.addInteraction(draw);
      dispatch(drawHandler());
      draw.abortDrawing();
      // draw.finishDrawing()

      let writer = new GeoJSON();
      let geojsonStr = JSON.parse(writer.writeFeatures([e.feature]));
      const waypoints = geojsonStr.features[0].geometry.coordinates;

      const newWs = waypoints.map((wp) =>
        transform(wp, projection, "EPSG:4326")
      );
      const wpGeometry = new LineString(newWs);

      let startDistance = [];
      wpGeometry.forEachSegment((start, end) => {
        let distanceTo = (getDistance(start, end) / 1000).toFixed(2);
        startDistance.push(+distanceTo);
      });
      console.log(startDistance);
      const totalDistance = Math.round(
        getLength(wpGeometry, { projection: "EPSG:4326" }) / 1000
      );

      const stringCoords = newWs.map((item, idx) => {
        let time = (startDistance[idx] / speed) * 60;
        time = mapLogic.timeToString(time);
        dispatch(getMeWind(newWs[idx + 1]));
        return {
          leg: {
            start: newWs[idx],
            end: newWs[idx + 1] || null,
          },
          latlng: toStringHDMS(item).replace(/\s/g, ""),
          distFrom: startDistance[idx] || 0,
          time: time != "Invalid D" ? time : "---",
        };
      });
      // console.log(stringCoords);
      dispatch(showDistance({ distance: totalDistance }));
      dispatch(showTime());
      dispatch(pointsList(stringCoords));
    });
    modify.on("modifyend", (e) => {
      const targetGeometry = e.features.array_
        .map((el) => el.getGeometry())
        .map((item) => item.flatCoordinates);

      const coordinates = mapLogic
        .uniteCoords(targetGeometry.at(-1))
        .map((item) => transform(item, projection, "EPSG:4326"));
      let geom = new LineString(coordinates);
      const startDistance = [];
      geom.forEachSegment((start, end) => {
        let distanceTo = (getDistance(start, end) / 1000).toFixed(2);
        startDistance.push(+distanceTo);
      });
      const stringCoords = coordinates.map((item, idx) => {
        let time = (startDistance[idx] / speed) * 60;
        time = mapLogic.timeToString(time);

        return {
          latlng: toStringHDMS(item).replace(/\s/g, ""),
          distFrom: startDistance[idx] || 0,
          time: time != "Invalid D" ? time : "---",
        };
      });
      console.log("string coords are :", stringCoords);
      dispatch(pointsList(stringCoords));
      const totalDistance = Math.round(
        getLength(geom, { projection: "EPSG:4326" }) / 1000
      );
      dispatch(showDistance({ distance: totalDistance }));
      dispatch(showTime());
    });
    addInteractions();
    defaultMap.addInteraction(modify);
    return () => defaultMap.setTarget(undefined);
  }, [zones, airports]);

  return (
    <>
      <MapContext.Provider value={{ map }}>
        <div
          style={{ height: "100%", width: "100%" }}
          className={cl.map}
          ref={mapRef}
        ></div>
      </MapContext.Provider>
    </>
  );
};

export default MapWrapper;
