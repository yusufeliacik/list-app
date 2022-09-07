import { Route, Routes } from "react-router";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
