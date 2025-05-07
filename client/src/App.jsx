import React from 'react';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <h1>E-commerce Site - Home Page</h1>
      <Routes>
        <Route path="/" element={<div>Welcome to the E-commerce Site</div>} />
      </Routes>
    </div>
  );
}

export default App;
