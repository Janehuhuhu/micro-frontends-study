import './public-path'
import './public-path'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


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
  console.log('==== react 卸载 ====', container ? container.querySelector('#root') : document.querySelector('#root'))
  // 不注释时会导致卸载失败
  // ReactDOM.unmountComponentAtNode(container ? container.querySelector('#root') : document.querySelector('#root'));
}
