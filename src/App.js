import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  CreateProposal,
  CreateProposal2,
  Home,
  Proposal,
  Proposal2,
} from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:proposalAddress" element={<Proposal2 />} />
        <Route path="/create-proposal" element={<CreateProposal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
