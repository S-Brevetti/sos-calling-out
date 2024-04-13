import { useState, useEffect } from "react";

import { Dimensions, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { State } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";

interface LocationObj {
  mocked?: boolean;
  coords: any;
}

type Coordinates = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

interface Region {
  region: Coordinates;
}

const initialState: Region = {
  region: {
    latitude: 4,
    longitude: 1,
    latitudeDelta: 0,
    longitudeDelta: 0.1,
  },
};

type Props = {
  callback: any;
};

export default function Map(props: Props) {
  const [state, setState] = useState(initialState);
  let address: any = "";

  useEffect(() => {
    getPermissions();
  }, []);

  function passAddress(): void{
    props.callback(address);
    console.log("sto passando questo: ", address)
  }

  async function getPermissions() {
    await Location.requestForegroundPermissionsAsync();
    let newLocation: LocationObj = await Location.getCurrentPositionAsync({});
    address = await Location.reverseGeocodeAsync(newLocation.coords);
    passAddress();
    let newState = {
      region: {
        latitude: newLocation.coords.latitude,
        longitude: newLocation.coords.longitude,
        latitudeDelta: 0.009,
        longitudeDelta: 0.009,
      },
    };
    setState(newState);
  }

  return (
    <MapView
      style={styles.mapView}
      initialRegion={{
        latitude: state.region.latitude,
        longitude: state.region.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      region={state.region}
      onRegionChange={getPermissions}
    >
      <Marker coordinate={state.region} />
    </MapView>
  );
}

const styles = StyleSheet.create({
  mapView: {
    flex: 1,
  },
});
