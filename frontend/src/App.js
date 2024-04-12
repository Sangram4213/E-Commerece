import { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router,Route } from "react-router-dom";
import Header from "./component/layout/Header/Header";
import WebFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home.js"

function App() {
  useEffect(()=>{
     
    WebFont.load({
      google:{
        families:["Roboto","Droid Sans", "Chilanka"]
      }
    })
  },[]);
  return (
    <Router>
      <Header />
      <Route exact path="/" component={Home}/>
      <Footer/>
    </Router>
  );
}

export default App;
