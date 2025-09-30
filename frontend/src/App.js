import React from "react";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Services />
    </div>
  );
}

export default App;