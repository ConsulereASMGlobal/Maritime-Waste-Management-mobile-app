import { PermissionsAndroid, Platform, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";

import MapView, { Marker } from "react-native-maps";

import { colors } from "@src/globals/colors";
import {
  BORDER_RADIUS_SIZE,
  LARGE_PADDING_SIZE,
  MEDIUM_PADDING_SIZE,
  screenHeight,
  screenWidth,
} from "@src/globals/themes";
import { DynamicIcon } from "@src/utils/Dynamic/DynamicIcon";
import Geolocation from "@react-native-community/geolocation";
import { users } from "@src/services/api";
import { useSelector } from "react-redux";
import { selectUserType } from "@src/redux/selectors";
import { NoDataView } from "@src/components/NoDataView";
import { LoadingIndicator } from "@src/components/LoadingIndicator";

export const Map = () => {
  const seletedUserType = useSelector(selectUserType);

  const [currentLocation, setCurrentLocation] = useState([{}]);
  const [granted, setGranted] = useState(false);
  const [destinationLocation, setDestinationLocation] = useState([]);
  let pickUps;
  const requestLocationPermission = async () => {
    try {
      const grant = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (grant === PermissionsAndroid.RESULTS.GRANTED) {
        setGranted(true);
        console.log("Location permission granted");
      } else {
        setGranted(false);
        console.log("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const requestLocationPermissionIOS = async () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        setGranted(true);
      },
      (error) => {
        console.log("map error: ", error);
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
    );
  };
  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
    );
  }, [granted]);

  useEffect(() => {
    Platform.OS == "ios"
      ? requestLocationPermissionIOS()
      : requestLocationPermission();
    if (seletedUserType === "PICKUP_POINT" || seletedUserType === "CUSTOMER") {
      users.getRecycler().then((res) => {
        pickUps = res?.data;
        const newData = res?.data.map((item: any) => ({
          key: item?.id,
          coordinate: {
            latitude: item?.address?.latitute,
            longitude: item?.address?.longitute,
          },
          title: item?.personalDetails?.name,
          description: item?.address?.street,
        }));
        const filteredData = newData.filter(
          (item) => item.coordinate.latitude !== null
        );

        setDestinationLocation(filteredData);
      });
    } else {
      users.getPickupPoint().then((res) => {
        pickUps = res?.data;
        const newData = res?.data.map((item: any) => ({
          key: item?.id,
          coordinate: {
            latitude: item?.address?.latitute,
            longitude: item?.address?.longitute,
          },
          title: item?.personalDetails?.name,
          description: item?.address?.street,
        }));
        const filteredData = newData.filter(
          (item) => item.coordinate.latitude !== null
        );

        setDestinationLocation(filteredData);
      });
    }
    // check();
  }, []);
  console.log(destinationLocation, "::-----");

  const check = () => {
    const newData = pickUps?.map((item: any) => ({
      key: item?.id,
      coordinate: {
        latitude: item?.address?.latitute,
        longitude: item?.address?.longitute,
      },
      title: item?.userName,
      description: item?.address?.street,
    }));
    setDestinationLocation(newData);
  };
  return (
    <View style={{ backgroundColor: colors.white, flex: 1 }}>
      <View style={{ zIndex: 99999 }}></View>
      {!!!destinationLocation ? (
        <NoDataView />
      ) : currentLocation?.latitude ? (
        <MapView
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={{
            width: screenWidth,
            height: screenHeight,
          }}
        >
          {currentLocation?.latitude && (
            <Marker
              coordinate={
                currentLocation
                  ? currentLocation
                  : {
                      longitude: 0,
                      latitude: 0,
                    }
              }
              title={"Your Location"}
              description={"You are here."}
            >
              <DynamicIcon
                iconFamily="MaterialIcons"
                iconName="location-pin"
                iconColor={colors.primary}
                iconSize={50}
              />
            </Marker>
          )}
          {destinationLocation?.length !== 0 &&
            destinationLocation?.map((marker) => (
              <Marker
                key={marker?.key}
                coordinate={
                  marker?.coordinate
                    ? marker?.coordinate
                    : {
                        longitude: 0,
                        latitude: 0,
                      }
                }
                title={marker?.title}
                description={marker?.description}
              >
                <DynamicIcon
                  iconFamily="MaterialIcons"
                  iconName="location-pin"
                  iconColor={colors.primary}
                  iconSize={50}
                />
              </Marker>
            ))}
        </MapView>
      ) : (
        <LoadingIndicator activityColor={colors.primary} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: { paddingHorizontal: LARGE_PADDING_SIZE, marginVertical: 15 },
  box: {
    borderRadius: BORDER_RADIUS_SIZE,
    backgroundColor: colors.white,
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingVertical: MEDIUM_PADDING_SIZE,
    // paddingHorizontal: MEDIUM_PADDING_SIZE,
    marginTop: 15,
    width: "100%",
  },
  rowCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusCont: {
    backgroundColor: colors.backgroundColor,
    paddingHorizontal: 13,
    borderRadius: BORDER_RADIUS_SIZE,
    paddingVertical: 2,
  },
  leftText: { fontWeight: "bold", marginTop: 5, fontSize: 18, flexShrink: 1 },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    position: "absolute",
    bottom: 16,
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
