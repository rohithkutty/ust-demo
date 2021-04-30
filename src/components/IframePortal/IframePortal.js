import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class IframePortal extends Component {
  constructor(props) {
    super(props);
    this.containerEl = document.createElement('div');
  }

  componentDidMount() {
    this.iframe.contentDocument.body.appendChild(this.containerEl);
  }

  render() {
    return (
      <iframe
        id={this.props.id}
        title='iframe'
        ref={(el) => (this.iframe = el)}
      >
        {ReactDOM.createPortal(this.props.children, this.containerEl)}
      </iframe>
    );
  }
}

export default IframePortal;
