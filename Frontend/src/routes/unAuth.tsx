import { Navigate, useRoutes } from "react-router-dom";
import { HomePage } from "./Elements";

export default function unAuth() {
    return useRoutes([
        {
            path : "/",
            element : <HomePage/>
        },
        {
            path: '*',
            element: <Navigate to="/" replace />,
          },
    ])
}