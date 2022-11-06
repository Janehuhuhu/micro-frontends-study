import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './public-path'


function render(props = {}) {
  const { container } = props;
  const root = ReactDOM.createRoot(container ? container.querySelector('#root') : document.querySelector('#root'))

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}


export async function bootstrap() {
  console.log('[react16] react app bootstraped');
}
export async function mount(props) {
  console.log('[react16] props from main framework', props);
  render(props);
}
export async function unmount(props) {
  const { container } = props;
  ReactDOM.unmountComponentAtNode(container ? container.querySelector('#root') : document.querySelector('#root'));
}
