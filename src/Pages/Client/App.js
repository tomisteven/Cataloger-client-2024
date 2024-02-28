import Navbar from "./components/Navbar/Navbar";
import Intro from "./components/Intro/Intro";
/* import Services from "./components/Services/Services"; */
import "./App.css";
import Experience from "./components/Experience/Experience";
import Works from "./components/Works/Works";
import Portfolio from "./components/Portfolio/Portfolio";
import Footer from "./components/Footer/Footer";

import { useContext } from "react";
import { themeContext } from "./Context";





function App({user}) {

  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  //console.log(user);

  return (

    <div
      className="App"
      style={{
        backgroundColor: darkMode ? "#222" : "white",
        color: darkMode && "white",
      }}
    >
      <Navbar />
      <Intro user={user} />
      <Experience />
      <Portfolio products={user.products}  />
      <Works />
      <Footer />
    </div>
  );
}

export default App;
