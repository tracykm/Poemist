import * as React from "react";
import IndexView from "src/components/manyPoemViews/IndexView";

class HomeView extends React.Component {
  render() {
    return (
      <div className="index-view">
        <h5>Browse through all the communitys poems!</h5>
        <IndexView />
      </div>
    );
  }
}

export default HomeView;
