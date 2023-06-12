import React, { Component } from 'react';
import './App.css';
import { getUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [],
    }
  }

  componentDidMount() {
    this.fetchUrls()
  }

  fetchUrls = () => {
    getUrls()
      .then(res => {
        this.setState({
          urls: res.urls
        });
      })
      .catch(error => {
        console.log('Error fetching URLs:', error);
      });
  };

  postUrl = (url) => {
    return fetch ("http://localhost:3001/api/v1/urls", )

  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm />
        </header>

        <UrlContainer urls={this.state.urls}/>
      </main>
    );
  }
}

export default App;

