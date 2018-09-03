import React from 'react';
import {
        BrowserRouter as Router,
        Route
    }   from 'react-router-dom';

import Home from './Components/Home';


export default () => <Router>
    <div>
    <Route exact path='/' component={Home}/>
    {/* <Route path='/Coffee' component={Coffee}/> */}
    </div>
    
</Router>

