import React, {ReactNode} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import {AnimatePresence} from "framer-motion";

function LocationProvider({ children }: { children: ReactNode }) {
    return <AnimatePresence>{children}</AnimatePresence>;
}

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route errorElement={<ErrorPage/>}>
            <Route index lazy={() => import("./routes/HomeRoute")}/>
            <Route path='/leaderboard' lazy={() => import("./routes/LeaderboardRoute")}/>
        </Route>
    )
)


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
