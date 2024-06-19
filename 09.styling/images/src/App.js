import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import TypePage from "./pages/TypePage";
import Layout from "./layout/Layout";
import SizePage from "./pages/SizePage";
import WidthPage from "./pages/WidthPage";
import MediaPage from "./pages/MediaPage";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={"/"} exact>
                    <Layout>
                        <TypePage />
                    </Layout>
                </Route>

                <Route path={"/size/"}>
                    <Layout>
                        <SizePage />
                    </Layout>
                </Route>

                <Route path={"/width/"}>
                    <Layout>
                        <WidthPage />
                    </Layout>
                </Route>

                <Route path={"/media/"}>
                    <Layout>
                        <MediaPage />
                    </Layout>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
