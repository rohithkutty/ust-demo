import React from 'react';
import { mount } from 'enzyme';
import IframePortal from './IframePortal';

describe('iframe portal', () => {
  let component;

  it('should render properly', () => {
    document.body.innerHTML =
      '<iframe id="ust_iframe" title="iframe"><!DOCTYPE html><html><body><p>This is iframe</p></body></html></iframe>';
    component = mount(<IframePortal />, { attachTo: document.body });
    expect(component).toHaveLength(1);
  });
});
