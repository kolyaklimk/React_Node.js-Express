import React from 'react';
import { useRoutes } from "./routes";

function App() {
    const routes = useRoutes();
    return (
            <div>
                <h1>Hello</h1>
                {routes}
            </div>
    );
}

export default App;
