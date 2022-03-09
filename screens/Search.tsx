import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { moviesApi, tvApi } from "../api";
import HList from "../components/HList";
import Loader from "../components/Loader";

const Container = styled.ScrollView``;
const SearchBar = styled.TextInput`
    background-color: white;
    padding: 10px 15px; 
    border-radius : 15px;
    width: 90%;
    margin: 10px auto;
    margin-bottom : 40px;
`;

const Search = () => {
    const [query, setQuery] = useState("");
    const onChangeText = (text:string) => setQuery(text);
    const {isLoading: movieLoading, data: moviesData, refetch: searchMovies} = useQuery(["search", query], moviesApi.search,{
        enabled: false
    });
    const {isLoading: tvLoading, data: tvData, refetch: searchTv} = useQuery(["search", query], tvApi.search,{
        enabled: false
    });

    const onSubmit = () => {
        if(query === "") {
            return;
        }
        searchMovies();
        searchTv();
    }

    return(
        <Container
            style={{backgroundColor : "#1e272e"}}>
            <SearchBar 
                placeholder="Search for Movie or Tv Show" 
                placeholderTextColor="grey"
                returnKeyType="search"
                onChangeText={onChangeText}
                onSubmitEditing={onSubmit}
            />
            {movieLoading || tvLoading ? <Loader/> : null}
            {moviesData ? <HList title="Movie Results" data={moviesData.results}/> : null}
            {tvData ? <HList title="Tv Results" data={tvData.results}/> : null}
        </Container>
    );
}

export default Search;