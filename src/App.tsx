import React, { Suspense } from 'react';
import { RouterProvider, useNavigate } from 'react-router-dom';
import router from './router';
import FallBack from './components/fallBack/fallBack';
import { useUser } from './providers/UserProvider';
import { UrlPages } from './globals/urlPages';

function App() {
  return (
    <Suspense fallback={<FallBack />}>
      <RouterProvider router={router} fallbackElement={<FallBack />} />
    </Suspense>
  );
}

export default App;
