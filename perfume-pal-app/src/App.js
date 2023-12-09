import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import NotePage from './NotePage';

const App = () => {
  return (
    <div>
      {/* Your other components */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/notes" element={<NotePage />} />
        {/* Add other routes as needed */}
      </Routes>
    </div>
  );
};

export default App;
