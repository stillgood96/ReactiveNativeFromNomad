import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, RefreshControl, Text, View } from "react-native";
import Swiper from "react-native-swiper";
import { useQuery, useQueryClient } from "react-query";
import styled from "styled-components/native";
import { Movie, MovieResponse, moviesApi } from "../api";
import HMedia from "../components/HMedia";
import Loader from "../components/Loader";
import Slide from "../components/Slide";
import VMedia from "../components/VMedia";


const Container = styled.FlatList`
    background-color: ${props => props.theme.mainBgColor}
`as unknown as typeof FlatList;


const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;

const TrendingScroll = styled.FlatList`
  margin-top: 20px;
`as unknown as typeof FlatList;

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
  const queryClient = useQueryClient();
  const {isLoading:nowPlayingLoading, data:nowPlayingData, isRefetching : isRefetchingNowPlaying  } = useQuery<MovieResponse>(["movies" , "nowPlaying"], moviesApi.nowPlaying);
  const {isLoading:trendingLoading, data:trendingData, isRefetching : isRefetchingTrending} = useQuery<MovieResponse>(["movies" , "trending"], moviesApi.trending);
  const {isLoading:upcomingLoading,data:upcomingData,  isRefetching : isRefetchingUpcoming} = useQuery<MovieResponse>(["movies" , "upcoming"], moviesApi.upcoming);
  
  const onRefresh = async () => {
      queryClient.refetchQueries(["movies"]);
  };

  const loading = nowPlayingLoading || trendingLoading || upcomingLoading ;
  const refreshing = isRefetchingNowPlaying || isRefetchingTrending || isRefetchingUpcoming;
  
  return loading ? (
    <Loader/>
  ) : (
    upcomingData ? <Container
        onRefresh={onRefresh}
        data={upcomingData.results}
        refreshing={refreshing}
        keyExtractor={(item) => item .id + ""}
        ItemSeparatorComponent ={() => <HSeperator/>}
        renderItem={({item}) => (
          <HMedia
            posterPath={item.poster_path}
            originalTitle={item.original_title}
            overview={item.overview}
            releaseDate={item.release_date}
          />
            
  
        )}
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
            {nowPlayingData?.results.map((movie) => (
                <Slide
                    key={movie.id}
                    backdropPath={movie.backdrop_path || ""}
                    posterPath={movie.poster_path || ""}
                    originalTitle={movie.original_title}
                    voteAverage={movie.vote_average}
                    overview={movie.overview}
                />
            ))}
        </Swiper>
        <ListContainer>
            <ListTitle>Trending Movies</ListTitle>
            {trendingData ? <TrendingScroll 
                data={trendingData.results}
                contentContainerStyle={{ paddingHorizontal: 30 }}
                horizontal
                keyExtractor={(item) => item.id + ""}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent ={VSeperator}
                renderItem={({item}) => (
                  <VMedia
                  posterPath={item.poster_path}
                  originalTitle={item.original_title}
                  voteAverage={item.vote_average}
                  />
                )}
            ></TrendingScroll> 
            : null }
            
        </ListContainer>
        <ComingSoonTitle>Coming soon</ComingSoonTitle>
        </>}/> : null
  );

};
export default Movies;