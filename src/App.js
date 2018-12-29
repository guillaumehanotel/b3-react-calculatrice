import React, {Component} from 'react'
import './App.css'
import Calculator from './Calculator'

class App extends Component {


   render(){
       return(
           <div>
               <Calculator/>
               <Calculator/>
           </div>
       )
   }
}

export default App
