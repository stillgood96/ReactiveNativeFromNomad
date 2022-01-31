import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import styled from "styled-components/native";
import Swiper from 'react-native-web-swiper';
import {Dimensions} from "react-native";

const API_KEY ="bb68d517d93b8c0952646528f5a290de";

const Container = styled.ScrollView`
    background-color: ${props => props.theme.mainBgColor}
`;

const View = styled.View`
    flex: 1;
`;

const {height : SCREEN_HEGIHT} = Dimensions.get("window"); 

const Movies : React.FC<NativeStackScreenProps<any, 'Movies'>> = () => {
    const [loading, setLoading] = useState(true);

    const getNowPlaying = () => {
        fetch(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
            );
    }    
    return (
        <Container>
            <Swiper loop 
                timeout={3.45} 
                controlsEnabled ={false}
                containerStyle={{width:"100%" , height: SCREEN_HEGIHT /4}}>
                <View style={{backgroundColor : "red"}}></View>
                <View style={{backgroundColor : "blue"}}></View>
                <View style={{backgroundColor : "orange"}}></View>
                <View style={{backgroundColor : "black"}}></View>
            </Swiper>
        </Container>
    );
}


export default Movies;