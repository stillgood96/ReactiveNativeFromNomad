import React, { useState } from "react";
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
    const {isLoading:todayLoading , data: todayData} = useQuery(
        ["tv", "today"], 
        tvApi.airingToday
    );
    const {isLoading:topLoading , data: topData } = useQuery(
        ["tv", "top"], 
        tvApi.topRated
    );
    const {isLoading:trendingLoading , data: trendingData} = useQuery(
        ["tv", "trending"], 
        tvApi.trending
    );
            
    const loading = todayLoading || topLoading || trendingLoading;
    const [refreshing, setRefreshing] = useState(false);
    
    if(loading) {
        return <Loader/>
    }
    
    const onRefresh = async () => {
        setRefreshing(true);
        await queryClient.refetchQueries(["tv"])
        setRefreshing(false);
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