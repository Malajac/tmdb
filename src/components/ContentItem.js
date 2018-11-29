import React from "react";

export default function ContentItem(props) {
  const { item } = props;
  const imgSource = item.backdrop
    ? `https://image.tmdb.org/t/p/w500/${item.backdrop}`
    : `https://placeholdit.imgix.net/~text?txtsize=33&txt=No%20Image&w=328&h=184`;

  return (
    <div
      key={item.id}
      className="col-sm-6 p-2"
      onClick={() => props.viewDetail(item.id)}
    >
      <div className="border border-dark p-0">
        <img className="embed-responsive embed-responsive-16by9" src={imgSource} alt="Movie" />
        <h4 className="pt-2 pb-2 text-center">{item.title}</h4>
      </div>
    </div>
  );
}
