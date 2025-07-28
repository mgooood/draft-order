import { useState } from 'react'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="p-6">
        <h1 className="text-3xl font-bold text-center text-purple-400">
          DraftOrder
        </h1>
        <p className="text-center text-slate-300 mt-2">
          Fantasy Football Draft Position Selection
        </p>
      </header>
      
      <main className="container mx-auto px-4">
        {/* App content will go here */}
        <div className="text-center py-12">
          <p className="text-slate-400">Ready to build something awesome!</p>
        </div>
      </main>
    </div>
  );
}

export default App;
