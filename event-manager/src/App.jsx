import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import EventDetails from './pages/EventDetails/EventDetails';
import EventList from './pages/EventList/EventList';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Feedback from './pages/Feedback/Feedback';
import NotFound from './pages/NotFound/NotFound';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import CreateEvent from './pages/CreateEvent/CreateEvent';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/create-event" element={
            <ProtectedRoute role="Admin">
              <CreateEvent />
            </ProtectedRoute>
          } /> */}
           <Route path="/" element={<ProtectedRoute />}></Route>
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/events/:id" element={<EventDetails />} />
          {/* <Route path="/dashboard" element={
            <ProtectedRoute role="Admin">
              <Dashboard />
            </ProtectedRoute>
          } /> */}
          <Route path="/feedback/:eventId" element={<Feedback />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
