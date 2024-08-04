import React, { useRef, useState } from "react";
import {
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Picker from "react-native-image-crop-picker";
import BottomSheet from "../AnimatedActionSheet/AnimatedButtomSheet";
import { FastImage } from "../image/index";
import { colors } from "../../globals/colors";
import { DynamicIcon } from "../../utils/Dynamic/DynamicIcon";
import { Row } from "../common/Row";
import { TextField } from "../TextField/TextField";
import { SVGRenderer } from "../common/SVGRenderer/SvgRenderer";
import CrossIcon from "../../assets/svgIcon/icon_cross_round.svg";
import Marker, { ImageFormat, Position } from "react-native-image-marker";
import Geolocation from "@react-native-community/geolocation";
import {
  epochToHumanReadable,
  epochToHumanReadableTime,
} from "../../utils/dateUtils";
import { Image as ComImage } from "react-native-compressor";
import { useTranslation } from "react-i18next";

type ImagePickerProps = {
  setImage: any;
  title: string;
};
export const screenWidth = Dimensions.get("window").width;

export const FileImagePicker = ({ setImage, title }: ImagePickerProps) => {
  const bottomSheetRef: any = useRef();
  const [selectedImage, setSelectedImage] = useState("");

  const [loc, setLoc] = useState();
  Geolocation.getCurrentPosition((info) => {
    // console.log(info.coords.latitude, 'lat');
    // console.log(info.coords.longitude, 'lng');
    setLoc(info.coords.latitude + ", " + info.coords.longitude);
  });

  const date =
    epochToHumanReadable(new Date()) +
    " " +
    epochToHumanReadableTime(new Date());

  const { t } = useTranslation();

  const pickFromGalery = () => {
    Picker.openPicker({
      width: 512,
      height: 512,
      cropping: true,
      mediaType: "photo",
      // cropperCircleOverlay: true,
      compressImageQuality: 0.2,
    }).then(async (image) => {
      const options = {
        backgroundImage: {
          src: image?.path,
          scale: 1,
          rotate: 0,
          alpha: 1,
        },
        watermarkTexts: [
          {
            text: date + "\n" + loc,
            positionOptions: {
              position: Position.bottomCenter,
            },
            style: {
              color: "#fff",
              fontName: "STSongti-SC-Regular",
              fontSize: 10,
              underline: false,
              bold: false,
              italic: false,
              strikeThrough: false,
              textAlign: "left",
              rotate: 0,
              shadowStyle: null,
              textBackgroundStyle: null,
            },
          },
        ],
        saveFormat: ImageFormat.png,
        filename: `${new Date().toString()}`,
        quality: 10,
      };

      await Marker.markText(options)
        .then(async (res) => {
          // console.log(res);
          // setImage({
          //   uri: "file:///" + res,
          //   width: image.width,
          //   height: image.height,
          //   mime: image.mime,
          // });
          // setSelectedImage("file:///" + res);
          // bottomSheetRef.current.close();
          if (Platform.OS === "ios") {
            console.log(res, "respoin of image");
            const resulted = await ComImage.compress("file:///" + res);
            setImage({
              uri: resulted,
              width: image.width,
              height: image.height,
              mime: image.mime,
            });
            setSelectedImage(resulted);
            bottomSheetRef.current.close();
          } else {
            // uri: resulted,
            // setImage({
            //   uri: "file:///" + res,
            // });
            setImage({
              uri: "file:///" + res,
              width: image.width,
              height: image.height,
              mime: image.mime,
            });
            setSelectedImage("file:///" + res);
            bottomSheetRef.current.close();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const pickFromCamera = () => {
    try {
      Picker.openCamera({
        width: 500,
        height: 500,
        cropping: true,
        mediaType: "photo",
        // cropperCircleOverlay: true,
        compressImageQuality: 0.2,
        useFrontCamera: false,
      }).then(async (image) => {
        const options = {
          backgroundImage: {
            src: image?.path,
            scale: 1,
            rotate: 0,
            alpha: 1,
          },
          watermarkTexts: [
            {
              text: date + "\n" + loc,
              positionOptions: {
                position: Position.bottomCenter,
              },
              style: {
                color: "#fff",
                fontName: "STSongti-SC-Regular",
                fontSize: 10,
                underline: false,
                bold: false,
                italic: false,
                strikeThrough: false,
                textAlign: "left",
                rotate: 0,
                shadowStyle: null,
                textBackgroundStyle: null,
              },
            },
          ],
          saveFormat: ImageFormat.png,
          filename: `${new Date().toString()}`,
          quality: 10,
        };

        await Marker.markText(options)
          .then(async (res) => {
            // console.log(res);
            // setImage({
            //   uri: 'file:///' + res,
            //   width: image.width,
            //   height: image.height,
            //   mime: image.mime
            // });
            // setImage({ uri: image.path ?? '' });
            // setSelectedImage("file:///" + res);
            if (Platform.OS === "ios") {
              console.log(res, "respoin of image");
              const resulted = await ComImage.compress("file:///" + res);
              setImage({
                uri: resulted,
                width: image.width,
                height: image.height,
                mime: image.mime,
              });
              setSelectedImage(resulted);
              bottomSheetRef.current.close();
            } else {
              // uri: resulted,
              // setImage({
              //   uri: "file:///" + res,
              // });
              setImage({
                uri: "file:///" + res,
                width: image.width,
                height: image.height,
                mime: image.mime,
              });
              setSelectedImage("file:///" + res);
              bottomSheetRef.current.close();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } catch (error) {
      console.error("Error opening camera:", error);
    }
  };

  const renderBottomSheetContent = (onSwipe: boolean) => (
    <SafeAreaView style={styles.root}>
      <View style={styles.pin} />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          paddingVertical: 20,
        }}
      >
        <TextField>{t("Select option for the image upload")}</TextField>
        <Row
          style={{
            alignItems: "center",
            justifyContent: "space-evenly",
            width: screenWidth,
            padding: 20,
          }}
        >
          <View>
            <TouchableOpacity
              onPress={pickFromCamera}
              style={{
                ...styles.pickOptionConteiner,
                backgroundColor: colors.borderColor,
              }}
            >
              <DynamicIcon
                iconName="add-a-photo"
                iconFamily="MaterialIcons"
                iconSize={40}
                iconColor={colors.primary}
              />
            </TouchableOpacity>
            <TextField
              style={{ textAlign: "center", marginTop: 5, fontSize: 14 }}
            >
              {t("Camera")}
            </TextField>
          </View>

          <View>
            <TouchableOpacity
              onPress={pickFromGalery}
              style={{
                ...styles.pickOptionConteiner,
                backgroundColor: colors.borderColor,
              }}
            >
              <DynamicIcon
                iconName="add-photo-alternate"
                iconFamily="MaterialIcons"
                iconSize={40}
                iconColor={colors.primary}
              />
            </TouchableOpacity>
            <TextField
              style={{ textAlign: "center", marginTop: 5, fontSize: 14 }}
            >
              {t("Gallery")}
            </TextField>
          </View>
        </Row>
      </View>
    </SafeAreaView>
  );

  const cleanupImages = () => {
    setImage(null);
    setSelectedImage(null);
    Picker.clean()
      .then(() => {
        console.log("removed tmp images from tmp directory");
      })
      .catch((e) => {});
  };

  return (
    <View style={{ width: "100%" }}>
      <SVGRenderer
        onPress={() => bottomSheetRef.current.open()}
        // style={[styles.pickConteiner, {}]}
        showSecondary={!!selectedImage}
        secondaryIcon={
          <>
            <View
              style={[
                styles.pickConteiner,
                { width: "50%", alignSelf: "center" },
              ]}
            >
              <FastImage
                source={{ uri: selectedImage }}
                style={{
                  // width: "100%",
                  // height: "100%",
                  width: 170,
                  height: 170,
                  borderRadius: 6,
                }}
                resizeMode="cover"
              />
              <TouchableOpacity
                style={{
                  position: "absolute",
                  right: -50,
                  // right: Platform.OS === "ios" ? -10 : -12,
                  top: -10,
                }}
                onPress={cleanupImages}
              >
                <CrossIcon fill={colors.neutral_dark} height={25} width={25} />
              </TouchableOpacity>
            </View>
            <View style={{ alignSelf: "center", marginTop: 10 }}>
              <TextField>{title}</TextField>
            </View>
          </>
        }
      >
        <View style={styles.nonSelectedView}>
          <View
            style={{
              backgroundColor: colors.primaryBG,
              padding: 12,
              borderRadius: 100,
            }}
          >
            <FastImage
              source={require("../../assets/others/camera.gif")}
              style={{
                width: 20,
                height: 20,
                borderRadius: 6,
              }}
              resizeMode="contain"
            />
          </View>
          <View style={{ marginTop: 5 }}>
            <TextField>{title}</TextField>
          </View>
        </View>
      </SVGRenderer>
      <BottomSheet
        ref={bottomSheetRef}
        renderContent={renderBottomSheetContent}
        visibleHeight={250}
        onClose={() => console.log("bottomSheet closed!")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    backgroundColor: "white",
  },
  pin: {
    height: 4,
    width: 50,
    backgroundColor: colors.gray,
    marginTop: 12,
    borderRadius: 10,
  },
  pickConteiner: {
    // height: 150,
    backgroundColor: colors.white,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  nonSelectedView: {
    // height: 50,
    backgroundColor: colors.white,
    borderRadius: 6,
    alignItems: "center",
    // justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: "row",
    gap: 10,
    padding: 20,
    // width: "200%",
  },
  pickOptionConteiner: {
    padding: 25,
    borderRadius: screenWidth,
    alignItems: "center",
    justifyContent: "center",
  },
});
