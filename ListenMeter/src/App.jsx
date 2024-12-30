import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './features/home/Home';
import NotFound from './features/NotFound/NotFound';
import Survey from './features/survey/Survey';
import Tutorial from './features/tutorial/Tutorial';
import { EmailProvider } from './context/EmailContext';
import Result from './features/result/Result';

function App() {
  return (
    <div>
      <EmailProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/tutorial' element={<Tutorial />} />
            <Route path='/survey' element={<Survey />} />
            <Route path='/result' element={<Result />} />
            <Route path='/*' element={<NotFound />} />
          </Routes>
        </Router>
      </EmailProvider>
    </div>
  );
}

export default App;
