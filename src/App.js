import { useState, useEffect } from "react";
import "@fontsource/figtree"; // Defaults to weight 400
import "@fontsource/figtree/400.css"; // Specify weight
import "@fontsource/figtree/400-italic.css"; // Specify weight and style
import CustomRouter from "router/customRouter";
import { LoaderPinwheel } from "lucide-react";
import { Loader } from "@bsf/force-ui";

const App = () => {
    const [loaded, setLoaded] = useState(false);

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
            <div className="loading-spinner flex items-center justify-center h-screen">
                <Loader
                    icon={<LoaderPinwheel className="animate-spin" />}
                    size="md"
                    variant="primary"
                    className="flex items-center justify-center"
                    style={{ background: 'none' }}
                />
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