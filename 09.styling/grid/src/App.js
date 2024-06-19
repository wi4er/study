import React from "react";
import logo from './logo.svg';
import './App.css';
import RowColumnTemplates from "./components/RowColumnTemplates";
import {Route, Router, Switch} from "react-router";
import {createBrowserHistory} from "history";
import Layout from "./layout/Layout";
import CellTemplates from "./components/CellTemplates";
import AreasTemplates from "./components/AreasTemplates";

function App() {
    return (
        <Router history={createBrowserHistory()}>
            <Switch>
                <Route path={"/areas"}>
                    <Layout>
                        <AreasTemplates />
                    </Layout>
                </Route>

                <Route path={"/cell"}>
                    <Layout>
                        <CellTemplates />
                    </Layout>
                </Route>

                <Route path={"/"}>
                    <Layout>
                        <RowColumnTemplates/>
                    </Layout>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
