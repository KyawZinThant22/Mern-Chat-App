import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import { Provider } from 'react-redux';
import store from './store';

function App() {
   return (
      <div className="App">
         <Provider store={store}>
            <Routes>
               <Route path="/" Component={HomePage} />
               <Route path="/chats" Component={ChatPage} />
            </Routes>
         </Provider>
      </div>
   );
}

export default App;
