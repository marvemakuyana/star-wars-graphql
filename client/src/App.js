import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';

import PeopleList from './components/Home';
import ViewPersonDetails from './components/PersonDetails';
import './App.css';

const engine = new Styletron();

function App() {
  return (
    <StyletronProvider value={engine}>
      <Router>
        <Routes>
          <Route path='/' exact element={<PeopleList />} />
          <Route path="/:personId" element={<ViewPersonDetails />} />
        </Routes>
      </Router>
    </StyletronProvider>
  );
}

export default App;
