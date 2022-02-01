import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Swiper from 'react-native-web-swiper';
import {ActivityIndicator, Dimensions, StyleSheet} from "react-native";
import { makeImagePath } from "../utils";
import { BlurView } from 'expo-blur';


const API_KEY ="bb68d517d93b8c0952646528f5a290de";

const Container = styled.ScrollView`
    background-color: ${props => props.theme.mainBgColor};
`;

const View = styled.View`
    flex: 1;
`;

const Loader = styled.View`
    flex : 1;
    justify-content : center;
    align-items : center;
`;

const {height : SCREEN_HEGIHT} = Dimensions.get("window"); 

const BgImg = styled.Image`
    width: 100%;
    height: 100%;
    position : absolute;
`;

const Title = styled.Text``;

const Movies : React.FC<NativeStackScreenProps<any, 'Movies'>> = () => {

    const [loading, setLoading] = useState(true);
    const [nowPlaying, setNowPlaying] = useState([]);

    const getNowPlaying = async () => {
        const {results} = await (await fetch(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
            )).json();

        setNowPlaying(results);
        setLoading(false);
    }    
    useEffect( () => {
        getNowPlaying();
    }, [])

    return loading ? (
        <Loader>
            <ActivityIndicator/>
        </Loader>
    ) :  (
        <Container>
            <Swiper loop 
                timeout={3.45} 
                controlsEnabled ={false}
                containerStyle={{width:"100%" , height: SCREEN_HEGIHT /4}}>

                {nowPlaying.map(movie => <View key={movie.id}> 
                    <BgImg source={{uri: makeImagePath(movie.backdrop_path)}}
                           style= {StyleSheet.absoluteFill}/>
                    <BlurView 
                        intensity ={80}
                        style= {StyleSheet.absoluteFill}>
                        <Title>{movie.original_title}</Title>                        
                    </BlurView>
                </View>)}
            </Swiper>
        </Container>
    );
}


export default Movies;