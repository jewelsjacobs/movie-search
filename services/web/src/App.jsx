import React, {Component} from 'react'
import { Route, Redirect, Switch, Link } from 'react-router-dom'
import axios from 'axios'
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import FlashMessages from './components/FlashMessages';
import NotFound from './components/NotFound';
import SavedMovies from './components/SavedMovies';
import './App.css';

const API_URL = 'http://www.omdbapi.com/?&s=';

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      movies: [],
      saved: [],
      flashMessages: []
    }
    this.searchMovie('land before time')
    this.deleteFlashMessage = this.deleteFlashMessage.bind(this)
    this.createFlashMessage = this.createFlashMessage.bind(this)
    this.saveMovie = this.saveMovie.bind(this)
    this.getMovies = this.getMovies.bind(this)
  }
  searchMovie(term) {
    axios.get(`${API_URL}${term}&apikey=6a491017`)
    .then((res) => { this.setState({ movies: res.data.Search }); })
    .catch((err) => { console.log(err); })
  }
  createFlashMessage (text, type = 'success') {
    const message = { text, type }
    this.setState({
      flashMessages: [...this.state.flashMessages, message]
    })
  }
  deleteFlashMessage (index) {
    if (index > 0) {
      this.setState({
        flashMessages: [
          ...this.state.flashMessages.slice(0, index),
          ...this.state.flashMessages.slice(index + 1)
        ]
      })
    } else {
      this.setState({
        flashMessages: [...this.state.flashMessages.slice(index + 1)]
      })
    }
  }
  saveMovie (movie) {
    const options = {
      url: 'http://localhost:3000/v1/movies',
      method: 'post',
      data: {
        title: movie
      }
    };
    return axios(options)
    .then((res) => { this.getMovies() })
    .catch((error) => { console.log(error); })
  }
  getMovies() {
    const options = {
      url: 'http://localhost:3000/v1/movies',
      method: 'get'
    };
    return axios(options)
    .then((res) => {
      this.setState({ saved: res.data.data });
    })
    .catch((err) => { console.log(err); })
  }
  render () {
    const {flashMessages} = this.state
    return (
      <div className='App container'>
        <br/>
        <FlashMessages
          deleteFlashMessage={this.deleteFlashMessage}
          messages={flashMessages} />
        <Switch>
          <Route exact path='/' render={() => (
            <div className="container text-center">
                <h1>Movie Search</h1>
                <SearchBar searchMovie={this.searchMovie.bind(this)} />
                &nbsp;<Link to='/collection'>Collection</Link>
                <br/><br/><br/>
                <MovieList
                  movies={this.state.movies}
                  saveMovie={this.saveMovie}
                />
              </div>
          )} />
          <Route path='/collection' render={() => (
            <SavedMovies
              createFlashMessage={this.createFlashMessage}
              saved={this.state.saved} />
          )} />
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

export default App
