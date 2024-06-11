import "./style.scss";
import { SearchBar } from "../../components";


const HomePage = () => {
  return (
    <section className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Cut the Middleman. Connect with owners</h1>
          <p>
            Streamline your real estate search and ditch the agent fees! Our
            platform connects you directly with property owners. Talk directly,
            negotiate terms, and find hidden gems you won't see elsewhere. Save
            money, find the perfect fit, and simplify your journey. Browse
            listings or find your dream place today!
          </p>
          <SearchBar></SearchBar>
          <div className="boxes">
            <div className="box">
                <h1>6+</h1>
                <h2>Years of Experience</h2>
            </div>
            <div className="box">
                <h1>125</h1>
                <h2>Awards earned</h2>
            </div>
            <div className="box">
                <h1>2000+</h1>
                <h2>Property ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt=""></img>
      </div>
    </section>
  );
};

export default HomePage;
