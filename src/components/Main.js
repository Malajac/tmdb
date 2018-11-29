import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchMovies,
  fetchTvShows,
  fetchTrailers
} from "../redux/ActionCreators";

import Header from "./Header";
import ContentList from "./ContentList";
import DetailView from "./DetailView";
import { ModeEnum } from "../shared/constants";

const MIN_SEARCH_QUERY = 3;

const mapStateToProps = state => {
  return {
    movies: state.movies.items,
    tvShows: state.tvShows.items,
    isMoviesLoading: state.movies.isLoading,
    isTvShowsLoading: state.tvShows.isLoading,
    moviesError: state.movies.errMess,
    tvShowsError: state.tvShows.errMess,
    trailers: state.trailers.items
  };
};

const mapDispatchToProps = dispatch => ({
  fetchMovies: query => dispatch(fetchMovies(query)),
  fetchTvShows: query => dispatch(fetchTvShows(query)),
  fetchTrailers: (id, type) => dispatch(fetchTrailers(id, type))
});

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMode: ModeEnum.TVSHOWLIST,
      query: "",
      oldQuery: ""
    };
  }

  // https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#fetching-external-data
  // "The recommended upgrade path for most use cases is to move data-fetching into componentDidMount"
  componentDidMount() {
    this.loadList(ModeEnum.TVSHOWLIST, "");
  }

  loadList(mode, query) {
    const search = query.length >= MIN_SEARCH_QUERY ? query : "";

    if (mode === ModeEnum.MOVIELIST) {
      this.props.fetchMovies(search);
      this.setState({
        currentMode: ModeEnum.MOVIELIST
      });
    } else if (mode === ModeEnum.TVSHOWLIST) {
      this.props.fetchTvShows(search);
      this.setState({
        currentMode: ModeEnum.TVSHOWLIST
      });
    }
  }

  refreshList() {
    const { currentMode, query, oldQuery } = this.state;
    if (query.length < MIN_SEARCH_QUERY && oldQuery.length < MIN_SEARCH_QUERY) {
      return;
    } else {
      this.loadList(currentMode, query);
    }
  }

  handleSearch(query) {
    this.setState(
      {
        query: query,
        oldQuery: this.state.query
      },
      () => this.refreshList()
    );
  }

  render() {
    const {
      movies,
      tvShows,
      isMoviesLoading,
      isTvShowsLoading,
      moviesError,
      tvShowsError
    } = this.props;
    const isItemsLoading = isMoviesLoading || isTvShowsLoading;
    const items =
      this.state.currentMode === ModeEnum.MOVIELIST ? movies : tvShows;
    const itemsError =
      this.state.currentMode === ModeEnum.MOVIELIST
        ? moviesError
        : tvShowsError;

    return (
      <div className="container">
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <div>
                {isItemsLoading && (
                  <span id="loadingSpinner" className="fa fa-spinner fa-spin" />
                )}
                <Header
                  leftButtonHandler={() =>
                    this.loadList(ModeEnum.MOVIELIST, this.state.query)
                  }
                  rightButtonHandler={() =>
                    this.loadList(ModeEnum.TVSHOWLIST, this.state.query)
                  }
                  handleSearch={query => this.handleSearch(query)}
                  query={this.state.query}
                  currentMode={this.state.currentMode}
                />
                <ContentList
                  {...props}
                  items={items}
                  trailers={this.props.trailers}
                  fetchTrailers={this.props.fetchTrailers}
                />
                {itemsError && (
                  <div className="container">
                    <div className="row">
                      <h4>{itemsError}</h4>
                    </div>
                  </div>
                )}
              </div>
            )}
          />
          <Route
            exact
            path="/detail"
            render={props => <DetailView {...props} />}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Main)
);
