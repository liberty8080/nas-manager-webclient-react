import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import './styles/index.css'
import MainPage from './MainPage';
import {Provider} from "react-redux";
import {store} from './store'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Downloads from "./Pages/Downloads";
import Magic from "./Pages/Magic";
import {SnackbarProvider} from "notistack";
import ChanifyPage from "./Pages/ChanifyPage";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <SnackbarProvider maxSnack={3}>
                    <Routes>
                        <Route path="/" element={<MainPage/>}>
                            <Route path="/" element={<Downloads/>}/>
                            <Route path="/downloads" element={<Downloads/>}/>
                            <Route path='/magic' element={<Magic/>}/>
                            <Route path='/chanify' element={<ChanifyPage/>}/>
                        </Route>
                    </Routes>
                </SnackbarProvider>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
