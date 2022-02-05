const API_KEY ="bb68d517d93b8c0952646528f5a290de";
const BASE_URL ="https://api.themoviedb.org/3";

export const trending = () => 
    fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`)
        .then(res => res.json());

export const upcoming = () => 
    fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`)
        .then(res => res.json());

export const nowPlaying = () =>  
    fetch(`${BASE_URL}/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`)
        .then(res => res.json());