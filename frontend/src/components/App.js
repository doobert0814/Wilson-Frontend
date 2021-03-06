import React, { Component } from 'react';
import UserContainer from '../Containers/UserContainer'
import MainContainer from './MainContainer'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import Login from './Login'
import Signup from './Signup';
import Play from './Play'
import Welcome from './Welcome';
import Friends from './Friends';
import RandomMovie from '../Containers/RandomMovie';


const API = 'http://localhost:3000'


class App extends Component {

    constructor() {
        super();
            this.state = {
                favorites: [],
                movies: [],
                posters:[],
                user: null,
                userid: null,
                isShown: false
            };
        }

    componentDidMount () {
        fetch(API + `/movies`)
            .then( res => res.json())
            .then( movies => this.setState({ movies: movies.results }))
            .then(user => this.setState({ user }))
        }

    // loginUser = (user) => {
    //     console.log("Log in")
    //     const token = localStorage.getItem('token')
    //     if(token) {
    //         fetch(API + '/user' ,{
    //             method: 'GET',
    //             headers: {
    //                 'Authorization':`Bearer ${token}`
    //             }
    //         })
    //         .then(resp => resp.json())
    //         .then(user => this.setState({user}))
    //     }
    // }

    logoutUser =() => {
        localStorage.removeItem('token')
        this.setState({user: null})
        return <Redirect to='/' />
    }


    handleSubmit = (event) => {
        fetch(API + `/users`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Accept': 'application/json',
            },
            body:JSON.stringify({user: event})
        })
        .then(res => res.json())
        .then(user => console.log(user))
        .then(user => {this.setState({userid: user.id, user: user})})
    }

    filteredMovies = () => {
        return this.state.movies.filter( movie => movie.title.includes(this.state.movieFilter) )
    }

    render(){
        const { movies } = this.state;
        return(
            <div className="App">
                <Router>
                {/* <NavBar user={this.state.user}/> */}
                <div>
                    <Switch>
                        <Route 
                            exact path='/friends' 
                            component={Friends}
                        /> 
                        <Route 
                            exact path='/main' 
                            render={() => (
                            <MainContainer 
                                addToFavorites={this.state.favorites} 
                                movies={this.state.movies}/>)} 
                        />
                        <Route 
                        path='users/:id' 
                        component={UserContainer}
                        />
                        <Route 
                        path='/shuffle' 
                        render={() => (
                            <RandomMovie 
                            movies={this.state.movies}/>)} 
                        />
                        <Route 
                            exact path='/signup' 
                            render={() => (
                            <Signup 
                                sheldon={this.handleSubmit}/>)} 
                        />
                        <Route 
                            exact path='/' 
                            component={Play} 
                            />
                        <Route 
                            path='/login' 
                            component={() => 
                            this.state.user ? 
                            <Redirect 
                                to="/" /> : 
                            <Login 
                            loginUser={this.loginUser}/>} />
                        <Route 
                            path='/logout' 
                            component={() => this.state.user ? this.logoutUser() : 
                        <Redirect to="/" />} 
                        />    
                        <Route 
                            path='/welcome' 
                            render={() => (<Welcome movies={this.state.movies}/>)}
                        />
                    </Switch>
                </div>
                </Router>
            </div>
        )
    }
}

export default App

