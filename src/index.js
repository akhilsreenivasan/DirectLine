import React from "react"
import ReactDom from "react-dom"
import { BrowserRouter } from "react-router-dom"
import store from "./store";
import { Provider } from "react-redux";
import App from "./components/App"

ReactDom.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('app'))
if (module.hot) {
    module.hot.accept()
}

