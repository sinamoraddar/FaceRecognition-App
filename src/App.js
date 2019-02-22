import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceRecognizer from './Components/FaceRecognizer/FaceRecognizer';
import SignIn from './Components/SignIn/SignIn'
import Register from './Components/Register/Register'
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
const app = new Clarifai.App({
 apiKey: 'abedd40f642c492eaec1b1de12d07831'
});

class App extends Component {
  constructor(){
    super();
    this.state={
      input:'',
      imageURL:'',
      box:{},
      route:'signin',
      isSignedIn:false,
    }
  }
  calculateFaceLocation=(input)=>{
    const clarifaiFace=input.outputs[0].data.regions[0].region_info.bounding_box;
    // console.log(clarifaiFace)
    const image=document.getElementById('inputImage');
    const width=Number(image.width);
    const height=Number(image.height);
    return {
        left_col:clarifaiFace.left_col*width,
        right_col:width-(clarifaiFace.right_col*width),
        top_row:clarifaiFace.top_row*height,
        bottom_row:height-(clarifaiFace.bottom_row*height),
    };
  }
  displayFaceBox=(box)=>{
    // console.log(box)
    this.setState({box:box});
  }
  onInputChange=(event)=>{
    this.setState({input:event.target.value});

  }
  onButtonSubmit=()=>{
    this.setState({imageURL:this.state.input});
  app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
  .then((response)=> {
    this.displayFaceBox(
    this.calculateFaceLocation(response)
    );
     
    })
  .catch(error=>console.log(error));
  }
  onRouteChange=(route)=>{
    if(route==='signout'){
      this.setState({isSignedIn:false})
    }else if (route==='home') {

      this.setState({isSignedIn:true})
      
    }
    this.setState({route:route});

  }
  render() {
    const {isSignedIn,route,box,imageURL}=this.state;
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
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
       { (route==='home')? 
       <div>
               <Logo/>
               <Rank/>
               <ImageLinkForm onButtonSubmit={this.onButtonSubmit} onInputChange={this.onInputChange}/>
               <FaceRecognizer box={box} imageURL={imageURL}/>
               </div>:
               ((route==='signin')  ?  
                              <SignIn onRouteChange={this.onRouteChange}/>
                              :
                              <Register onRouteChange={this.onRouteChange}/>
                              )
       }
        

      </div>
    );
  }
}

export default App;
