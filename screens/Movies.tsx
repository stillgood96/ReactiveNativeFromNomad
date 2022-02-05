import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, RefreshControl, Text, View } from "react-native";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import HMedia from "../components/HMedia";
import Slide from "../components/Slide";
import VMedia from "../components/VMedia";




const Container = styled.FlatList`
    background-color: ${props => props.theme.mainBgColor}
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;

const TrendingScroll = styled.FlatList`
  margin-top: 20px;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 20px;
`;

const VSeperator = styled.View`
    width:20px;
`;
const HSeperator = styled.View`
    height:20px;
`;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {

  };

  const renderVMedia = ({item}) => {
      return(
        <VMedia
            posterPath={item.poster_path}
            originalTitle={item.original_title}
            voteAverage={item.vote_average}
        />
      );
  }

  const renderHMedia =({item}) => {
    return(
        <HMedia
        posterPath={item.poster_path}
        originalTitle={item.original_title}
        overview={item.overview}
        releaseDate={item.release_date}
        />
    );
  }

  const movieKeyExtractor = (item) => item.id + "";


  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container
        onRefresh={onRefresh}
        refreshing={refreshing}
        data={upcoming}
        keyExtractor={movieKeyExtractor}
        ItemSeparatorComponent ={() => <HSeperator/>}
        renderItem={renderHMedia}
        ListHeaderComponent={<>
            <Swiper
            horizontal
            loop
            autoplay
            autoplayTimeout={3.5}
            showsButtons={false}
            showsPagination={false}
            containerStyle={{
            marginBottom: 40,
            width: "100%",
            height: SCREEN_HEIGHT / 4,
            }}
        >
            {nowPlaying.map((movie) => (
            <Slide
                key={movie.id}
                backdropPath={movie.backdrop_path}
                posterPath={movie.poster_path}
                originalTitle={movie.original_title}
                voteAverage={movie.vote_average}
                overview={movie.overview}
            />
            ))}
        </Swiper>
        <ListContainer>
            <ListTitle>Trending Movies</ListTitle>
            <TrendingScroll 
                data={trending}
                contentContainerStyle={{ paddingHorizontal: 30 }}
                horizontal
                keyExtractor={movieKeyExtractor}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent ={() => <VSeperator/>}
                renderItem={renderVMedia}
            >
            </TrendingScroll>
        </ListContainer>
        <ComingSoonTitle>Coming soon</ComingSoonTitle>
        </>}
    >
  </Container>
     

  );

};
export default Movies;