import React from "react";
import createStore from "./store";
import { Provider } from "react-redux";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Wrapper from "./components/Wrapper";
import Dashboard from "./components/Dashboard";
import {
  Provider as URQLP,
  createClient,
  defaultExchanges,
  subscriptionExchange
} from "urql";
import { SubscriptionClient } from "subscriptions-transport-ws";

const subscriptionClient = new SubscriptionClient(`ws://react.eogresources.com/graphql`,
  {
    reconnect: true,
    timeout: 20000
  }
);

const client = createClient({
  url: "https://react.eogresources.com/graphql",
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: operation => subscriptionClient.request(operation)
    })
  ]
});

const store = createStore();
const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: "rgb(39,49,66)"
    },
    secondary: {
      main: "rgb(197,208,222)"
    },
    background: {
      main: "rgb(226,231,238)"
    }
  }
});

const App = props => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <Wrapper>
        <Header />
        <URQLP value={client}>
        <Dashboard/>
        </URQLP>
      </Wrapper>
    </Provider>
  </MuiThemeProvider>
);

export default App;
