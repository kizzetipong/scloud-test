/* eslint-env jest */

import React from 'react';
import { render } from 'react-testing-library';
import { Box } from '@material-ui/core'

describe('With React Testing Library', () => {
  it('Display default text', () => {
    const { queryByText } = render(<Box>Hello world!</Box>);

    expect(queryByText('Hello world!')).toBeDefined();
  });
});
