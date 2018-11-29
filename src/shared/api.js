import { ItemTypeEnum } from "./constants";

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "<your key here>";

export const getMovies = query => {
  const url = query
    ? `${API_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=1`
    : `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

  return fetch(url)
    .then(fulfilledHandler, rejectedHandler)
    .then(response => response.json())
    .then(data =>
      data.results.map(item => ({
        id: item.id,
        title: item.title,
        poster: item.poster_path,
        backdrop: item.backdrop_path,
        overview: item.overview,
        type: ItemTypeEnum.MOVIE
      }))
    );
};

export const getTvShows = query => {
  const url = query
    ? `${API_URL}/search/tv?api_key=${API_KEY}&query=${query}&language=en-US&page=1`
    : `${API_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`;

  return fetch(url)
    .then(fulfilledHandler, rejectedHandler)
    .then(response => response.json())
    .then(data =>
      data.results.map(item => ({
        id: item.id,
        title: item.name,
        poster: item.poster_path,
        backdrop: item.backdrop_path,
        overview: item.overview,
        type: ItemTypeEnum.TVSHOW
      }))
    );
};

export const getTrailers = (id, type) => {
  const url =
    type === ItemTypeEnum.MOVIE
      ? `${API_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`
      : `${API_URL}/tv/${id}?api_key=${API_KEY}&append_to_response=videos`;

  return fetch(url)
    .then(fulfilledHandler, rejectedHandler)
    .then(response => response.json())
    .then(data => ({
      id: id,
      videos: data.videos.results
    }));
};

const fulfilledHandler = response => {
  if (response.ok) {
    return response;
  } else {
    var error = new Error(
      "Error " + response.status + ": " + response.statusText
    );
    error.response = response;
    throw error;
  }
};

const rejectedHandler = error => {
  var errmess = new Error(error.message);
  throw errmess;
};
