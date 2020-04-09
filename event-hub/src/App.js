import React from 'react';

import Layout from './hoc/Layout/Layout';
import Calendar from './components/Calendar/Calendar';

const App = () => {
  return (
    <div className="App">
      <Layout>
        <Calendar />
      </Layout>
    </div>
  );
}

export default App;
