import "./layout.scss";
import { Navbar } from "./components";
import { HomePage } from "./pages";

function App() {
  return (
    <main className="layout">
      <div className="navbar">
      <Navbar></Navbar>
      </div>
      <div className="content">
        <HomePage></HomePage>
      </div>
    </main>
  );
}

export default App;
