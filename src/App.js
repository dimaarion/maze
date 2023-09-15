import logo from './logo.svg';
import './App.css';

import Level from './components/Level';
import scena_1 from "./asset/scena/scena.json";
function App() {

  return (
    <div className="App">
    <Level scena = {scena_1}/>
    </div>
  );
}

export default App;
