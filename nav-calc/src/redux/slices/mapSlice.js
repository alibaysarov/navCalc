import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export const getMeZones = createAsyncThunk("ui/getMeZones", async () => {
  const res = await fetch(`${layersUrl}/api/zones`);
  if (res.ok) {
    const json = await res.json();
    return json.data;
  }
  console.log(res);
  console.log("23432424234");
});
export const getMeAirports = createAsyncThunk(
  "ui/getMeAirports",
  async (_, { getState }) => {
    const { viewPortConstr } = getState().map;
    const [lng1, lat1, lng2, lat2] = viewPortConstr;
    const url = `${layersUrl}/api/airports?lng1=${lng1}&lat1=${lat1}&lng2=${lng2}&lat2=${lat2}`;
    const res = await fetch(url);
    if (res.ok) {
      const json = await res.json();
      console.log(json);
      return json.data;
    }
  }
);
export const mapSlice = createSlice({
  name: "map",
  initialState: {
    isLineAdded: false,
    zones: [],
    airports: [],
    viewPortConstr: [],
  },
  reducers: {
    viewPortHandler: (state, action) => {
      state.viewPortConstr = action.payload;
    },
    drawHandler: (state) => {
      state.isLineAdded = true;
    },
    removeAirports: (state) => {
      state.airports = [];
    },
    removeZones: (state) => {
      state.zones = [];
    },
  },
  extraReducers: {
    [getMeZones.fulfilled]: (state, action) => {
      state.zones = action.payload;
      console.log(state.zones);
      console.log("zones added");
    },
    [getMeAirports.fulfilled]: (state, action) => {
      state.airports = action.payload;
    },
  },
});

export const { drawHandler, removeZones, removeAirports, viewPortHandler } =
  mapSlice.actions;
export default mapSlice.reducer;
