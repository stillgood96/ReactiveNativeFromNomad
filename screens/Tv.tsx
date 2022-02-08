import React from "react";
import styled from "styled-components/native";
import {FlatList, RefreshControl, ScrollView} from "react-native";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { tvApi } from "../api";
import Loader from "../components/Loader";
import VMedia from "../components/VMedia";
import HList, { HListSeperator } from "../components/HList";

const tvView = styled.View`
    background-color: ${props => props.theme.mainBgColor}
`;

const Tv = () => {
    const queryClient = useQueryClient();
    const {isLoading:todayLoading , data: todayData, isRefetching:todayRefetching} = useQuery(
        ["tv", "today"], 
        tvApi.airingToday
    );
    const {isLoading:topLoading , data: topData , isRefetching:topRefetching} = useQuery(
        ["tv", "top"], 
        tvApi.topRated
    );
    const {isLoading:trendingLoading , data: trendingData, isRefetching:trendingRefetching} = useQuery(
        ["tv", "trending"], 
        tvApi.trending
    );
            
    const loading = todayLoading || topLoading || trendingLoading;
    
    if(loading) {
        return <Loader/>
    }

    const refreshing = todayRefetching || topRefetching ||trendingRefetching;
    
    const onRefresh = () => {
        queryClient.refetchQueries(["tv"])
    }
    return(
        <ScrollView style= {{backgroundColor : "#1e272e"}}
                    contentContainerStyle= {{paddingVertical:30}}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
        >
            <HList title="Trending TV"  data={trendingData.results}/>
            <HList title={"Airing TV"} data={todayData.results}/>
            <HList title={"TopRated TV"} data={topData.results}/>
        
        </ScrollView>
    )
}

export default Tv;