import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import Router from './routes';

function App() {
   return (
      <div className="App">
         <Provider store={store}>
           <Router/>
         </Provider>
      </div>
   );
}

export default App;
