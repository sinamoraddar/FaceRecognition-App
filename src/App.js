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

const initialState={
   input:'',
      imageURL:'',
      box:{},
      route:'signin',
      isSignedIn:false,
      user:{
          id:'',
    name:'',
    email:'',
    entries:0,
    joined:'',
      },
}

class App extends Component {
  constructor(){
    super();
    this.state=initialState;
  }
  
alculateFaceLocation=(input)=>{
    const clarifaiFace=input.outputs[0].data.regions[0].region_info.bounding_box;
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
  updateUser = (user)=>{
    this.setState({user:{
         id:user.id,
    name:user.name,
    email:user.email,
    entries:user.entries,
    joined:user.joined,
    }})
  }
  displayFaceBox=(box)=>{
    this.setState({box:box});
  }
  onInputChange=(event)=>{
    this.setState({input:event.target.value});

  }
  onButtonSubmit=()=>{
    this.setState({imageURL:this.state.input});
  fetch('https://sheltered-harbor-27049.herokuapp.com/imageurl',{
        method:'post',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(
        {
          input:this.state.input,
        })})
        .then(response=>response.json())
  .then((response)=> {
     if(response){
      fetch('https://sheltered-harbor-27049.herokuapp.com/image',{
        method:'put',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(
        {
          id:this.state.user.id,
        })
      })
      .then(response=>response.json())
      .then(entries=>{
        this.setState(Object.assign(this.state.user,{entries:entries}))})
      .catch(console.log('not able to get entries'))
     }
    this.displayFaceBox(
    this.calculateFaceLocation(response)
    );

     
    })
  .catch(error=>console.log(error))
  }
  onRouteChange=(route)=>{
    if(route==='signout'){
      this.setState(initialState)
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
               <Rank name={this.state.user.name} entries={this.state.user.entries}/>
               <ImageLinkForm onButtonSubmit={this.onButtonSubmit} onInputChange={this.onInputChange}/>
               <FaceRecognizer box={box} imageURL={imageURL}/>
               </div>:
               ((route==='signin')  ?  
                              <SignIn onRouteChange={this.onRouteChange} updateUser={this.updateUser}/>
                              :
                              <Register onRouteChange={this.onRouteChange} updateUser={this.updateUser}/>
                              )
       }
        

      </div>
    );
  }
}

export default App;
