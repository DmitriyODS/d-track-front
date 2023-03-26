import React, { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import FallBack from './components/fallBack/fallBack';

function App() {
  return (
    <Suspense fallback={<FallBack />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
