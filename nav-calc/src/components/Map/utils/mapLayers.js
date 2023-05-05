import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import XYZ from "ol/source/XYZ";
import { Circle, Fill, Icon, Stroke, Style } from "ol/style.js";
// import Point from 'ol/geom/Point.js';
// import MultiPoint from 'ol/geom/MultiPoint.js';
// import {transform} from 'ol/proj';
// import {toLonLat} from 'ol/proj';
// import {transformExtent} from 'ol/proj';
// import Feature from 'ol/Feature';
// import Polygon from 'ol/geom/Polygon.js';
// import LineString from 'ol/geom/LineString.js';
// import {getLength} from 'ol/sphere';

import Draw from "ol/interaction/Draw.js";
import Modify from "ol/interaction/Modify.js";
import GeoJSON from "ol/format/GeoJSON.js";
import Snap from "ol/interaction/Snap.js";
// import KML from 'ol/format/KML.js'
// import {getDistance} from 'ol/sphere';
// import {fromLonLat} from 'ol/proj';
// import {toSize} from 'ol/size';
// import TileSource from 'ol/source/Tile';

//redux
import { useDispatch, useSelector } from "react-redux";
import { showDistance, showTime } from "../../../redux/slices/planSlice.js";
import { drawHandler } from "../../../redux/slices/mapSlice.js";

const defaultLayer = new TileLayer({
  source: new XYZ({
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  }),
});
const defaultVectorLayer = new VectorLayer({
  source: new VectorSource({
    format: new GeoJSON({
      dataProjection: "EPSG:4326",
    }),
    url: "https://api.maptiler.com/maps/outdoor-v2/style.json?key=10XI95JVnXvXtkZigjDA",
  }),
});
const ctaLayer = new VectorLayer({
  source: new VectorSource({
    format: new GeoJSON(),
  }),
});
const airportsLayers = new VectorLayer({
  source: new VectorSource({
    format: new GeoJSON(),
  }),
});
export const airportStyle = new Style({
  image: new Circle({
    radius: 5,
    fill: new Fill({
      color: "blue",
    }),
    stroke: new Stroke({
      width: 1,
      color: "#000",
    }),
  }),
});
airportsLayers.setStyle(airportStyle);
export const ctrStyle = new Style({
  fill: new Fill({
    color: "transparent",
  }),
  stroke: new Stroke({
    width: 3,
    color: "#A6D8A9",
  }),
});
const ctrLayer = new VectorLayer({
  source: new VectorSource({
    format: new GeoJSON(),
  }),
});

export const mapLayers = [defaultLayer, ctrLayer, ctaLayer, airportsLayers];

export const source = new VectorSource({ wrapX: false });
export const vector = new VectorLayer({
  source: source,
  style: {
    "fill-color": "magenta",
    "stroke-color": "magenta",
    "stroke-width": 4,
    "circle-radius": 7,
    "circle-fill-color": "magenta",
  },
});

export const draw = new Draw({
  source: source,
  type: "LineString",
  geometryName: "wp",
});

export const modify = new Modify({ source: source });
export const snap = new Snap({ source: source });
export const layersUrl = "https://nav-calc-api.vercel.app/";
