import Nav from "./components/layout/Nav";
import AlgoRouter from "./router/AlgoRouter";
;

function App() {
  return (
    <main className="grid grid-rows-6 h-screen bg-gray-100 w-screen">
      <Nav />
      <AlgoRouter />
    </main>
  );
}

export default App;
