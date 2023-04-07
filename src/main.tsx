import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter(
    createRoutesFromElements(

        <Route errorElement={<ErrorPage/>}>
            <Route index lazy={() => import("./pages/MainMenuPage")}/>
            <Route path='/leaderboard' lazy={() => import("./pages/LeaderboardPage")}/>

            <Route path='/game' lazy={() => import("./pages/GamePage")}/>
        </Route>
    )
)


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
