import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CreateProposal, CreateProposal2, Home, Proposal } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:proposalAddress" element={<Proposal />} />
        <Route path="/create-proposal" element={<CreateProposal2 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
