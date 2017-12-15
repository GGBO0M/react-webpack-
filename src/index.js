import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './components/app.js';


ReactDOM.render(<App />,document.getElementById('root'));

// const render = Component => {
//   ReactDOM.render(
//     <AppContainer>
//       <Component />
//     </AppContainer>,
//     document.getElementById('root'),
//   )
// }

// render(App)
// if (module.hot) {
//   module.hot.accept('./components/app.js', () => { render(App) })
// }


// ReactDOM.render(
//   <AppContainer>
//     <App />
//   </AppContainer>, 
//   document.getElementById('root')
// );

// if (module.hot) {
//   module.hot.accept('./components/app.js', () => {
//     const NextApp = require('./components/app.js').default;
//     ReactDOM.render(
//       <AppContainer>
//         <NextApp/>
//       </AppContainer>,
//       document.getElementById('root')
//     );
//   });
// }