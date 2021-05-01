import React from 'react';
import { shallow } from 'enzyme';
import ErrorBoundary from './ErrorBoundary';

const Something = () => null;

describe('ErrorBoundary', () => {
  it('Test error state', () => {
    const wrapper = shallow(
      <ErrorBoundary>
        <Something />
      </ErrorBoundary>
    );

    const error = new Error('test');
    wrapper.find(Something).simulateError(error);
  });
});
