import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';
class App extends Component {
  render() {
    let particlesOptions={
                    particles: {
                    value:30,
                    density:{
                      enable:true,
                      value_area:800
                    }
                }
                    }
                
    return (
      <div className="App">
         <Particles className='particles'
                params={particlesOptions} />
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageLinkForm/>
       { 
               
               // <FaceRecognizer/>
             }
      </div>
    );
  }
}

export default App;
