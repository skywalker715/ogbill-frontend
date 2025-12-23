import React from 'react';
import { BillProvider } from './context/BillContext';
import { Layout } from './components/Layout';
import { FileUpload } from './components/FileUpload';
import { ItemManager } from './components/ItemManager';
import { PeopleManager } from './components/PeopleManager';
import { SummaryView } from './components/SummaryView';

function App() {
  return (
    <BillProvider>
      <Layout>
        <FileUpload />
        <PeopleManager />
        <ItemManager />
        <SummaryView />
      </Layout>
    </BillProvider>
  );
}

export default App;
