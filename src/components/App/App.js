import React, { Component } from 'react';
import './App.css';
import { getUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [],
    };
  }

  componentDidMount() {
    this.fetchUrls();
  }

  fetchUrls = () => {
    getUrls()
      .then(res => {
        this.setState({
          urls: res.urls
        });
      })
      .catch(error => {
        throw new Error("Please try again later");
      });
  };

  postUrl = (url) => {
    return fetch("http://localhost:3001/api/v1/urls", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        long_url: url.urlToShorten, 
        title: url.title
      })
    })
    .then(res => res.json())
    .then(res =>
      this.setState({ urls: [...this.state.urls, res] })
    )
    .catch(error => {
      throw new Error("Please try again later");
    });
  };

  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm postUrl={this.postUrl} />
        </header>

        <UrlContainer urls={this.state.urls} />
      </main>
    );
  }
}

export default App;
