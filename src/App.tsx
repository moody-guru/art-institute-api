import ArtTable from "./components/ArtTable";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-5">
      <div className="container mx-auto">
        <header className="mb-6">
          <h1 className="text-center text-4xl font-bold text-gray-800">
            Art Institute of Chicago Gallery
          </h1>
        </header>
        <main>
          <ArtTable />
        </main>
      </div>
    </div>
  );
}

export default App;
