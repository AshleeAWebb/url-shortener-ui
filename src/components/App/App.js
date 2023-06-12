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
          urls: res.urls
        });
      })
      .catch((error) => {
        if (error instanceof Error) {
          this.setState({ error: "Server is down" });
        } else {
          this.setState({ error: "Please try again later" });
        }
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
          throw new Error(`Please try again later`);
        } else {
          return response.json();
        }
      })
      .then(res =>
        this.setState({ urls: [...this.state.urls, res] })
      )
      .catch((error) => {
        if (error instanceof Error) {
          this.setState({ error: "Server is down" });
        } else {
          this.setState({ error: "Please try again later" });
        }
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
