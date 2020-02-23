import React, { Component } from "react";

const StateContext = React.createContext();

class StateProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      isAppReady: false,
      user: {},
      coo: "",
      portes: [],
      isFetching: false,
      snackbar: {
        hasError: false,
        errorMessage: "",
        hasValidate: false,
        validateMessage: ""
      },
      hasResult: false,
      shouldEmptyForm: false,
      tab: 0,
      shouldComplete: false,
      completeData: []
    };
  }

  componentWillMount() {
    this.ensureLogged();
  }

  resetSnackbar = () =>
    this.setState({
      snackbar: {
        hasError: false,
        errorMessage: "",
        hasValidate: false,
        validateMessage: ""
      }
    });

  setError = message =>
    this.setState({
      snackbar: {
        hasError: true,
        errorMessage: message
      }
    });

  setValidate = message =>
    this.setState({
      snackbar: {
        hasValidate: true,
        validateMessage: message
      }
    });

  ensureLogged = async () => {
    const res = await fetch("/api/auth/ensureLogged");
    if (res.status === 200) {
      const json = await res.json();
      this.setState({ isLogged: true, user: json.user });
    }
    this.setState({ isAppReady: true });
  };

  setLogged = value => this.setState({ isLogged: value });

  setPorte = value => this.setState({ portes: [], hasResult: false });

  getPorte = async coo => {
    this.setState({ coo: coo, isFetching: true });
    this.resetSnackbar();
    const res = await fetch(`/api/porte/get_porte?coo=${coo}`);
    const json = await res.json();
    if (res.status === 200) {
      console.log("r", json);
      this.setState({ portes: json.portes, hasResult: true });
    } else {
      this.setError(json.errors.message);
      console.log("e", json);
    }
    this.setState({ isFetching: false });
  };

  addPorte = async body => {
    this.resetSnackbar();
    const res = await fetch("/api/porte/add_porte", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const status = res.status;
    if (status === 200) {
      const json = await res.json();
      console.log(json);
      this.setState({ shouldEmptyForm: true });
      this.setValidate(json.msg);
    } else {
      const json = await res.json();
      this.setError(json.errors.message);
      console.log("e", json);
    }
  };

  setShouldEmptyForm = value => this.setState({ shouldEmptyForm: value });

  setShouldComplete = (value, data) =>
    this.setState({ shouldComplete: value, completeData: data });

  changeTab = value => this.setState({ tab: value });

  render() {
    return (
      <StateContext.Provider
        value={{
          ...this.state,
          setLogged: this.setLogged,
          getPorte: this.getPorte,
          resetSnackbar: this.resetSnackbar,
          setPorte: this.setPorte,
          addPorte: this.addPorte,
          setShouldEmptyForm: this.setShouldEmptyForm,
          changeTab: this.changeTab,
          setValidate: this.setValidate,
          setError: this.setError,
          setShouldComplete: this.setShouldComplete
        }}
      >
        {this.props.children}
      </StateContext.Provider>
    );
  }
}

const StateConsumer = StateContext.Consumer;

export { StateProvider, StateConsumer };
