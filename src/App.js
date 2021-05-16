import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { WordStress } from "./apps/word-stress/WordStress";
import { SubmitWord } from "./apps/word-stress/SubmitWord";
import { WordGrid } from "./apps/word-stress/WordGrid";

import { StylesProvider } from "@material-ui/styles";
import { ThemeProvider } from "styled-components";
import { createMuiTheme } from "@material-ui/core/styles";
import TopBar from "./apps/word-stress/components/TopBar";

function App() {
  const defaultTheme = createMuiTheme();

  return (
    <>
      <StylesProvider injectFirst>
        <ThemeProvider theme={defaultTheme}>
          <Router>
            <TopBar />
            <Route exact path="/" component={WordGrid} />
            <Switch>
              <Route exact path="/main-list" component={WordGrid} />
              <Route exact path="/submit-word" component={SubmitWord} />
              {/* <WordStress /> */}
            </Switch>
          </Router>
        </ThemeProvider>
      </StylesProvider>
    </>
  );
}

export default App;
