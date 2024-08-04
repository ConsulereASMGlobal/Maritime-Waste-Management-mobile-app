import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import YoutubePlayer, { getYoutubeMeta } from "react-native-youtube-iframe";
import { screenWidth } from "@src/globals/themes";
import { colors } from "@src/globals/colors";
import { TextBold, TextField } from "@src/components/TextField/TextField";
import { FastImage } from "@src/components/image";
import { Spacer } from "@src/components/common/Spacer";
import { useTranslation } from "react-i18next";

const Videos = () => {
  const { t } = useTranslation();

  const getYoutubeMetaData = async (id) => {
    try {
      const response = await getYoutubeMeta(id).then((meta) => {
        return meta;
      });
      return response;
    } catch (error) {
      console.error(`Failed to fetch metadata for video ID: ${id}`, error);
      return null;
    }
  };
  const list = [
    { id: 1, youtubeID: "nQmJaZM5T84" },
    { id: 2, youtubeID: "RDPzkfdwqcY" },
    { id: 3, youtubeID: "XbNCAyRZlwE" },
  ];
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideoTitles = async () => {
      const updatedList = await Promise.all(
        list.map(async (item) => {
          const meta = await getYoutubeMetaData(item.youtubeID);
          return {
            ...item,
            title: meta ? meta?.title : "Title not found",
            thumbnailUrl: meta?.thumbnail_url ? meta?.thumbnail_url : "",
          };
        })
      );
      setVideos(updatedList);
    };

    fetchVideoTitles();
  }, []);
  //   console.log(videos, ";;;;;;");
  const trimTextAfterThreeWords = (text) => {
    const words = text.split(" ");
    if (words.length <= 3) {
      return text;
    }
    return words.slice(0, 3).join(" ") + "\n" + words.slice(3, 5) + "...";
  };
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TextBold>{t("Editor's Pick of the day")}</TextBold>
      </View>
      <Spacer spacing={10} />

      <ScrollView
        style={{ flexDirection: "row", gap: 10 }}
        contentContainerStyle={{ gap: 15 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {videos.map((item: any) => (
          <View style={{ backgroundColor: colors.shaded, borderRadius: 10 }}>
            <YoutubePlayer
              height={screenWidth / 2.4}
              //   height={165}
              width={screenWidth - 100}
              videoId={item?.youtubeID}
              webViewStyle={{
                // flex: 1,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                backgroundColor: colors.blue,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                // marginTop: 7,
                alignItems: "center",
                padding: 10,
              }}
            >
              <FastImage
                source={{ uri: item?.thumbnailUrl }}
                style={{ width: 50, height: 50, borderRadius: 8 }}
                resizeMode="cover"
              />
              <TextField style={{ fontWeight: "600" }}>
                {trimTextAfterThreeWords(item?.title)}
              </TextField>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Videos;

const styles = StyleSheet.create({});
