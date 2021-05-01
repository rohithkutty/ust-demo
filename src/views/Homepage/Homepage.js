import React, { useState } from 'react';
import IframePortal from '../../components/IframePortal';

const Homepage = () => {
  const [userName, setUserName] = useState('');
  const [btnClicks, setBtnClicks] = useState(0);

  window.addEventListener('message', (event) => {
    if (event.data.event_id === 'ust_message') {
      setUserName(event.data.name);
    }

    if (event.data.event_id === 'btn_click') {
      setBtnClicks(btnClicks + 1);
    }
  });
  return (
    <div>
      <h1>Homepage</h1>
      <h2>Welcome to the Portal!</h2>
      <h2>Name from iFrame: {userName}</h2>
      <h2>No of button clicks: {btnClicks}</h2>
      <IframePortal id='ust_iframe'>
        <p>This content is loading from an iframe</p>
        <p>Please enter the name to view it in the Root Component.</p>
        <input
          type='text'
          placeholder='Enter Text'
          name='user'
          id='user'
          onChange={() => {
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
        />{' '}
        <button
          onClick={() =>
            window.postMessage(
              { event_id: 'btn_click' },
              'http://localhost:5000'
            )
          }
        >
          Click me
        </button>
      </IframePortal>
    </div>
  );
};

export default Homepage;
