import React, { useState } from 'react';
import IframePortal from '../../components/IframePortal';

const Homepage = () => {
  const [userName, setUserName] = useState('');

  window.addEventListener('message', (event) => {
    console.log(event);
    if (event.data.event_id === 'ust_message') {
      setUserName(event.data.name);
    }
  });
  return (
    <div>
      <h1>Homepage</h1>
      <h2>Welcome to the Portal!</h2>
      <h2>{userName}</h2>
      <IframePortal id='ust_iframe'>
        <p>This content is loading from an iframe</p>
        <p>Please enter the name to view it in the Root Component.</p>
        <input type='text' name='user' id='user' />
        <button
          onClick={() => {
            const name = document
              .getElementById('ust_iframe')
              ?.contentWindow?.document?.getElementById('user').value;
            window.postMessage(
              {
                event_id: 'ust_message',
                name,
              },
              'http://localhost:5000'
            );
            return false;
          }}
        >
          Click me
        </button>
      </IframePortal>
    </div>
  );
};

export default Homepage;
