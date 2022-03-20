import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Dimensions, FlatList, RefreshControl, Text, View } from "react-native";
import Swiper from "react-native-swiper";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import styled from "styled-components/native";
import { Movie, MovieResponse, moviesApi } from "../api";
import HList from "../components/HList";
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
  const {isLoading:nowPlayingLoading, data:nowPlayingData } = useQuery<MovieResponse>(["movies" , "nowPlaying"], moviesApi.nowPlaying);
  const {isLoading:trendingLoading, data:trendingData } = useInfiniteQuery<MovieResponse>(["movies" , "trending"], moviesApi.trending);
  const {isLoading:upcomingLoading,data:upcomingData, hasNextPage, fetchNextPage  } = useInfiniteQuery<MovieResponse>(
    ["movies" , "upcoming"], 
    moviesApi.upcoming,
    {
      getNextPageParam : (currentPage) => {
        const nextPage = currentPage.page +1;
        return nextPage > currentPage.total_pages ? null : nextPage;
      }
    }
    
    );
  
  const [refreshing, setRfreshing] = useState(false);
  

  const onRefresh = async () => {
    setRfreshing(true);
    await queryClient.refetchQueries(["movies"]);
    setRfreshing(false);
  };

  const loading = nowPlayingLoading || trendingLoading || upcomingLoading ;
  const loadMore = () => {
    if(hasNextPage) {
      fetchNextPage();
    }
  };
  
  
  return loading ? (
    <Loader/>
  ) : (
    upcomingData ? <Container
        onEndReached={loadMore}
        onEndReachedThreshold={0.4}
        onRefresh={onRefresh}
        data={upcomingData.pages.map( (page) => page.results).flat()}
        refreshing={refreshing}
        keyExtractor={(item) => item .id + ""}
        ItemSeparatorComponent ={() => <HSeperator/>}
        renderItem={({item}) => (
          <HMedia
            posterPath={item.poster_path}
            originalTitle={item.original_title}
            overview={item.overview}
            releaseDate={item.release_date}
            fullData = {item}
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
                    fullData = {movie}
                />
            ))}
        </Swiper>
        {trendingData ? <HList title="Trending Movies" data={trendingData.results}/> : null }
        <ComingSoonTitle>Coming soon</ComingSoonTitle>
        </>}/> : null
  );

};
export default Movies;


/*{
"pageParams": [undefined],
"pages": [
  {"dates": [Object], "page": 1, "results": [Array], "total_pages": 18, "total_results": 348}
  {"dates": [Object], "page": 2, "results": [Array], "total_pages": 18, "total_results": 348}
  {"dates": [Object], "page": 3, "results": [Array], "total_pages": 18, "total_results": 348}
  {"dates": [Object], "page": 4, "results": [Array], "total_pages": 18, "total_results": 348}
  ]
}*/