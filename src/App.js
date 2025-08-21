import { useState, useEffect } from "react";
import "@fontsource/figtree"; // Defaults to weight 400
import "@fontsource/figtree/400.css"; // Specify weight
import "@fontsource/figtree/400-italic.css"; // Specify weight and style
import CustomRouter from "router/customRouter";
import { Loader } from "@bsf/force-ui";


const App = () => {
    const [loaded, setLoaded] = useState(false);
    const [showTopBar, setShowTopBar] = useState(true); // State to manage the visibility of the top bar

    // scroll top on route change
    window.onhashchange = () => {
        window.scrollTo(0, 0);
    };

    // Simulate loading (replace with actual loading logic if needed)
    useEffect(() => {
        setTimeout(() => {
            setLoaded(true);
        }, 1000); // Simulating a load delay of 1 second
    }, []);

    if (!loaded) {
        return (
            <div
                className="loading-spinner flex items-center justify-center h-screen"
                style={{ background: "#F9FAFB" }}
            >
                <Loader icon={null} size="lg" variant="primary" />
            </div>
        );
    }

    return (
        <div className="app-container font-figtree">
            <CustomRouter />
        </div>
    );
};

export default App;
