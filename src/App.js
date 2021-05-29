import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Word Stress app
import TopBar from "./apps/word-stress/components/TopBar";
import { WordStress } from "./apps/word-stress/WordStress";
import { SubmitWord } from "./apps/word-stress/SubmitWord";
import { WordGrid } from "./apps/word-stress/WordGrid";

// Classroom Helper app

import { Main } from "./apps/classroom-helper/Main";

import { StylesProvider } from "@material-ui/styles";
import { ThemeProvider } from "styled-components";
import { createMuiTheme } from "@material-ui/core/styles";

import { ClassSelect } from "./apps/classroom-helper/ClassSelect";

function App() {
  const defaultTheme = createMuiTheme();

  return (
    <div>
      <StylesProvider injectFirst>
        <ThemeProvider theme={defaultTheme}>
          {/* <Main /> */}
          <ClassSelect />
          {/* <Router>
            <TopBar />
            <Route exact path="/" component={WordGrid} />
            <Switch>
              <Route exact path="/main-list" component={WordGrid} />
              <Route exact path="/submit-word" component={SubmitWord} />
            </Switch>
          </Router> */}
        </ThemeProvider>
      </StylesProvider>
    </div>
  );
}

export default App;
