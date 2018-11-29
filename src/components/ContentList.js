import React from "react";
import ContentItem from "./ContentItem";

export default function ContentList(props) {
  const viewDetail = id => {
    const item = props.items && props.items.filter(item => item.id === id)[0];

    // Check if we have already fetched video details
    (id in props.trailers
      ? Promise.resolve()
      : props.fetchTrailers(id, item.type)
    ).then(() => {
      props.history.push({
        pathname: "/detail",
        id: id,
        item: item
      });
    });
  };

  const itemsToRender = props.items.map(item => (
    <ContentItem key={item.id} item={item} viewDetail={viewDetail} />
  ));

  return (
    <div className="row">
      {itemsToRender}
    </div>
  );
}
