import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./containers/Nav";
import FavoritesList from "./pages/FavoritesList";

function App() {
	return (
		<Router>
			<div>
				<img src={logo} style={{height:40}} className="App-logo" alt="logo" />
				<Nav />
				<Switch >
					<Route exact path="/" component={Home} />
					<Route exact path="/home" component={Home} />
					<Route exact path="/favorites" component={FavoritesList} />
					<Route exact path="/posts/:id" component={Detail} />
					<Route component={NoMatch} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
