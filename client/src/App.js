import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoutes } from './components';
import { Error, Landing, Register } from './pages';
import {
  AllJobs,
  Profile,
  Stats,
  AddJob,
  SharedLayout,
} from './pages/dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoutes>
              <SharedLayout />
            </ProtectedRoutes>
          }
        >
          <Route index element={<Stats />} />
          <Route path='all-jobs' element={<AllJobs />} />
          <Route path='add-job' element={<AddJob />} />
          <Route path='Profile' element={<Profile />} />
        </Route>
        <Route path='/landing' element={<Landing />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
