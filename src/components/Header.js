import React from "react";
import { ModeEnum } from "../shared/constants";

export default function Header(props) {
  const leftButtonClass =
    props.currentMode === ModeEnum.MOVIELIST ? "btn-primary" : "btn-secondary";
  const rightButtonClass =
    props.currentMode === ModeEnum.TVSHOWLIST ? "btn-primary" : "btn-secondary";

  return (
    <div className="row p-2">
      <div className="btn-group mt-3 mb-3 d-flex" role="group">
        <button
          onClick={props.leftButtonHandler}
          type="button"
          className={`btn ${leftButtonClass}`}
        >
          Movies
        </button>
        <button
          onClick={props.rightButtonHandler}
          type="button"
          className={`btn ${rightButtonClass}`}
        >
          TV Shows
        </button>
      </div>
      <div className="input-group mb-3 rounded">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-search" />
          </span>
        </div>
        <input
          type="search"
          className="form-control"
          value={props.query}
          onChange={e => props.handleSearch(e.target.value)}
          placeholder="search"
        />
      </div>
    </div>
  );
}
