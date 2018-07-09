import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Home from '../routes/Home/loadable';
import About from '../routes/About';
import Article from '../routes/Article/loadable';
import Relative from '../routes/Relative/loadable';
import Header from './Header';
import Footer from './Footer';

class App extends React.PureComponent {

    render() {
        return (
            <BrowserRouter>
                <div className='app'>
                    <Header />
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/tag/:tagName' component={Relative}/>
                        <Route path='/article/:articleId' component={Article}/>
                        <Route path='/about' component={About} />
                    </Switch>
                    <Footer />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
