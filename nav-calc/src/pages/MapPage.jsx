import React from "react";
import MapContext from "../components/Map/mapContext";
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import View from "ol/View";
import { fromLonLat, transform } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON.js";
import { Circle, LineString, Point } from "ol/geom";
import Feature from "ol/Feature";
import { Fill, Stroke, Style } from "ol/style";

const MapPage = () => {
  const [map, setMap] = React.useState(null);
  const mapRef = React.useRef(null);

  const defaultLayer = new TileLayer({
    source: new XYZ({
      url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    }),
  });
  const point1 = new Feature({
    geometry: new LineString([37, 55]).transform("EPSG:4326", "EPSG:3857"),
  });
  const point2 = new Feature({
    geometry: new LineString([37.5, 55]).transform("EPSG:4326", "EPSG:3857"),
  });
  const vectorSource = new VectorSource();
  vectorSource.addFeatures([point1, point2]);

  const vectorLayer1 = new VectorLayer({
    source: vectorSource,
  });

  React.useEffect(() => {
    const mapObj = {
      target: mapRef.current,
      layers: [defaultLayer, vectorLayer1],
      view: new View({
        center: fromLonLat([37, 55]),
        zoom: 7,
      }),
    };

    const flightMap = new Map(mapObj);

    setMap(flightMap);

    return () => {};
  }, []);
  return (
    <MapContext.Provider value={map}>
      <div
        ref={mapRef}
        style={{
          width: "100%",
          minHeight: "200px",
          position: "absolute",
          height: "100%",
        }}
        id="map"
      ></div>
    </MapContext.Provider>
  );
};

export default MapPage;
