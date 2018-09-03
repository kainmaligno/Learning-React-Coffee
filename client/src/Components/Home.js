import React, { Component } from 'react';
import axios from 'axios';
import { Link }  from 'react-router-dom'

class Home extends Component{

    state={
        coffees:[]
    }

     async componentDidMount(){
        try{
      const coffees = await  axios.get(`http://localhost:3000/api/coffees`)

        this.setState({
            coffees: coffees.data
        })
      } catch(error){
          console.log(error)
      }
       
    }

render(){
    return(
        <div>
            <div className="app-wrapper">
        <h1>Coffee List</h1>
        <span>Click on any to see more info about it!</span>
        <ul>
          {
            this.state.coffees.map((coffee, idx) => {
                return <Link to={`/coffee/${coffee._id}`} key={idx}>
                  <li>{coffee.name}</li>
                </Link>
            })
          }
        </ul>
      </div>
        </div>
    )
}
}

export default Home
