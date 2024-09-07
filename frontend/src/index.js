import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';
import 'bulma/css/bulma.css';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import axios from 'axios';
import { PostContextProvider } from './context/PostContext';
import { CategoryContextProvider } from './context/CategoryContext';
import { CommentContextProvider } from './context/CommentContext';

axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <CategoryContextProvider>
          <PostContextProvider>
            <CommentContextProvider>
              <App />
            </CommentContextProvider>
          </PostContextProvider>
        </CategoryContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
