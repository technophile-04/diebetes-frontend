import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Proposal } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:proposalAddress" element={<Proposal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
