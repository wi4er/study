import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Layout from "./layout/Layout";
import TransitionPage from "./pages/TransitionPage";
import KeyframesPage from "./pages/KeyframesPage";

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route path="/keyframes">
                        <KeyframesPage />
                    </Route>

                    <Route path="/">
                        <TransitionPage />
                    </Route>
                </Switch>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
