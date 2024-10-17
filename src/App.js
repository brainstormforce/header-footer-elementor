import { useState, useEffect } from 'react';
import './styles.css'; 
import CustomRouter from 'router/customRouter';

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
    return <div className="loading-spinner">Loading...</div>;
  }

  return (
    <div className="app-container">
      <CustomRouter />
    </div>
  );
};

export default App;
