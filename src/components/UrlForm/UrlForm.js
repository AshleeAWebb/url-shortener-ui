import React, { Component } from 'react';

class UrlForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      title: '',
      long_url: ''
    };
  }

  handleNameChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { title, long_url } = this.state;
    const url = { title, long_url };
    this.props.postUrl(url);
    this.clearInputs();
  }
  clearInputs = () => {
    this.setState({ title: '', long_url: '' });
  }

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

        <button onClick={this.handleSubmit}>
          Shorten Please!
        </button>
      </form>
    )
  }
}

export default UrlForm;
