import './App.css';

import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";

import Navbar from './navbar/Navbar';
import ImageSlider from './recipe-full-view/image-slider/ImageSlider';

const slides = [
    {url: "./image-01.jpg"},
    {url: "./image-02.jpg"},
    {url: "./image-03.jpg"},
    {url: "./image-04.jpeg"}
]

function App() {
  return (
    <div>
      <Navbar/>
      <HashRouter>
        <ImageSlider slides={slides}/>
      </HashRouter>
    </div>
  );
}

export default App;
