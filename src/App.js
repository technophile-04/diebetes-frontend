import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CreateProposal, Home, Proposal } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:proposalAddress" element={<Proposal />} />
        <Route path="/create-proposal" element={<CreateProposal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
