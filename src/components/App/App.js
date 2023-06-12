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
      error: "",
    };
  }

  componentDidMount() {
    this.fetchUrls();
  }
  fetchUrls = () => {
    getUrls()
      .then(res => {
        this.setState({
          urls: res.urls,
          error: "",
        });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  };
  
  postUrl = (url) => {
    return fetch("http://localhost:3001/api/v1/urls", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        long_url: url.long_url,
        title: url.title
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Please try again later");
        }
        return response.json();
      })
      .then(res => {
        this.setState({ urls: [...this.state.urls, res], error: "" });
      })
      .catch((error) => {
        this.setState({ error: error.message });
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
