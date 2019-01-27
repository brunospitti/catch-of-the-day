import React from 'react';
import { render } from 'react-dom';
import './css/style.css';

import Router from './components/Router';

// only Render is needed to render, since it's the component that renders everything else
render(<Router/>, document.querySelector('#main'));