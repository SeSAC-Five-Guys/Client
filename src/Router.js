import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Login } from './pages/login';
import { Join } from './pages/join';
import { Main } from './pages/main';
import { Modify } from './pages/modify';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/main" element={<Main />} />
        <Route path="/modify" element={<Modify />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
