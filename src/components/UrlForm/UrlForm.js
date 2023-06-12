import React, { Component } from 'react';

class UrlForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      title: '',
      long_url: '',
      error: '',
    };
  }

  handleNameChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { title, long_url } = this.state;
    if (title && long_url) {
      const url = { title, long_url };
      this.props.postUrl(url);
      this.clearInputs();
    } else {
      this.setState({ error: 'Please fill out all fields' });
    }
  };

  clearInputs = () => {
    this.setState({ title: '', long_url: '', error: '' });
  };

  render() {
    return (
      <form>
        <input
          type='text'
          placeholder='Title...'
          name='title'
          value={this.state.title}
          onChange={this.handleNameChange}
        />

        <input
          type='text'
          placeholder='URL to Shorten...'
          name='long_url'
          value={this.state.long_url}
          onChange={this.handleNameChange}
        />

        {this.state.error && <p>{this.state.error}</p>}

        <button onClick={this.handleSubmit}>
          Shorten Please!
        </button>
      </form>
    );
  }
}

export default UrlForm;
