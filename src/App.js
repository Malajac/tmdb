import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configureStore";

import Main from "./components/Main";
import ScrollToTop from "./components/ScrollToTop";

const store = ConfigureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <ScrollToTop>
            <Main />
          </ScrollToTop>
        </Router>
      </Provider>
    );
  }
}

export default App;
