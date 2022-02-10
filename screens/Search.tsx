import React, { useState } from "react";
import styled from "styled-components/native";

const Container = styled.ScrollView``;
const SearchBar = styled.TextInput`
    background-color: white;
    padding: 10px 15px; 
    border-radius : 15px;
    width: 90%;
    margin: 10px auto;
`;

const Search = () => {
    const [query, setQuery] = useState("");
    const onChangeText = (text:string) => setQuery(text);
    console.log(query);

    return(
        <Container
            style={{backgroundColor : "#1e272e"}}>
            <SearchBar 
                placeholder="Search for Movie or Tv Show" 
                placeholderTextColor="grey"
                returnKeyType="search"
                onChangeText={onChangeText}
            />
        </Container>
    );
}

export default Search;