import { BlurView } from "expo-blur";
import React from "react";
import {StyleSheet, useColorScheme, View} from "react-native";
import styled from "styled-components/native";
import Poster from "../screens/Poster";
import { makeImagePath } from "../utils";

const BgImg = styled.Image`
    width: 100%;
    height: 100%;
    position : absolute;
`;


const Title = styled.Text<{isDark : boolean}>`
    font-size: 16px;
    font-weight: 600;
    color: ${(props) => (props.isDark ? "white" : props.theme.textColor)}
`;

const Wrapper = styled.View`
    flex-direction : row;
    height: 100%;
    justify-content: center;
    align-items: center;
`;
const Column = styled.View`
    width: 40%;
    margin-left:15px;
`;

const Overview = styled.Text<{isDark : boolean}>`
    margin-top: 10px;
    color: ${ (props) => (props.isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)")};
`;

const Votes = styled(Overview) <{isDark: boolean}>`
    font-size:12px;
    color: ${ (props) => (props.isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)")};
`;



interface SliderProps {
    backdropPath : string;
    posterPath: string;
    originalTitle : string;
    voteAverage: number;
    overview: string;
};

const Slide : React.FC<SliderProps> = ({
    backdropPath, 
    posterPath, 
    originalTitle, 
    voteAverage, overview
}) => {
    const isDark = useColorScheme() === "dark";

    return (
        <View style ={{flex:1}}> 
            <BgImg source={{uri: makeImagePath(backdropPath)}}
            style= {StyleSheet.absoluteFill}/>
            <BlurView
            tint ={isDark? "dark" : "light"}
            intensity ={25}
            style= {StyleSheet.absoluteFill}>

                <Wrapper>           
                    <Poster path={posterPath} />
                    <Column>
                        <Title isDark= {isDark}>{originalTitle}</Title>    
                        {voteAverage > 0 ? <Votes isDark={isDark}>⭐️{voteAverage}/10</Votes> : null}
                        <Overview isDark= {isDark}>{overview.slice(0, 90)}...</Overview>                                 
                    </Column>                            
                </Wrapper>
            </BlurView>     
        </View>
    )
}

export default Slide;
