import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import "../index.css";
import FirstPage from "./firstStep/firstPage.jsx";
import TopNav from "./topNav.jsx";
import SecondPage from "./secondStep/secondPage.jsx";
import history from "./history";
import BioReactions from "./bioReactions";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tolerance: 0.01,
      filterLevel: 0.01,
    };
    this.handleToleranceChange = this.handleToleranceChange.bind(this);
    this.handleFilterLevelChange = this.handleFilterLevelChange.bind(this);
  }

  handleToleranceChange(tol) {
    let numTol = Number(tol);
    if (isNaN(numTol)) {
      alert("check you input, ensure its a number");
    } else {
      this.setState({ tolerance: numTol });
    }
  }

  handleFilterLevelChange(filter) {
    let numFilter = Number(filter);
    if (isNaN(numFilter)) {
      alert("check you input, ensure its a number");
    } else {
      this.setState({ filterLevel: numFilter });
    }
  }

  render() {
    const tolerance = this.state.tolerance;
    const filterLevel = this.state.filterLevel;
    return (
      <div>
        <TopNav />
        <Router history={history}>
          <Switch>
            <Route path="/reactions" component={BioReactions} />
            <Route
              path="/"
              exact
              render={(props) => (
                <FirstPage
                  {...props}
                  tolerance={tolerance}
                  filterLevel={filterLevel}
                  onToleranceChange={this.handleToleranceChange}
                  onFilterChange={this.handleFilterLevelChange}
                />
              )}
            />
            <Route
              path="/secondpage"
              render={(props) => (
                <SecondPage
                  {...props}
                  tolerance={tolerance}
                  filterLevel={filterLevel}
                  onToleranceChange={this.handleToleranceChange}
                  onFilterChange={this.handleFilterLevelChange}
                />
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
