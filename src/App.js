import logo from './logo.svg';
import './App.css';

import Level from './components/Level';
import scena_1 from "./asset/scena/scena.json";
import Button from './components/Button';
import { useState } from 'react';
function App() {
const[mousePress,setMousePress] = useState(0);
  return (
    <div className="App">
    <Level press = {mousePress} scena = {scena_1}/>
    <Button setPress = {setMousePress} />
    </div>
  );
}

export default App;
