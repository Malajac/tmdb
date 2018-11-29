import React from "react";
import YouTube from "react-youtube";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    trailers: state.trailers.items
  };
};

function DetailView(props) {
  const { id, item } = props.location;
  const { trailers } = props;
  const videos = id in trailers ? trailers[id].videos : [];
  const videoTrailer = videos.length > 0 ? videos[0] : null;

  const imgSource =
    item && item.backdrop
      ? `https://image.tmdb.org/t/p/w500/${item.backdrop}`
      : `https://placeholdit.imgix.net/~text?txtsize=33&txt=No%20Image&w=328&h=184`;
  const opts = {
    // height: '200',
    width: "100%",
    playerVars: {
      autoplay: 0
    }
  };

  return (
    <div className="container-fluid mt-3">
      <button className="btn border-0 mb-3" style={{ backgroundColor : 'transparent' }} onClick={props.history.goBack}>
        <i className="fa fa-chevron-left" aria-hidden="true" />&nbsp;&nbsp;Back
      </button>
      <div className="card border-0">
          {videoTrailer ? (
            <div className="card-img-top">
              <YouTube videoId={videoTrailer.key} opts={opts} />
            </div>
          ) : (
            <img src={imgSource} alt="Backdrop" />
          )}
        <div>
          <h3 className="pt-3 pb-3">{item && item.title}</h3>
          <p>
            <strong>Movie Overview:</strong><br />
            {item && item.overview}
          </p>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(DetailView);
