import React from "react";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import store from "./lib/store";
import MainPage from "./component/MainPage";

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={MainPage}/>
                        {/*<Route component={NotFoundPage}/>*/}
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

export default App;