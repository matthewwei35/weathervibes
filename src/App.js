import './App.scss';
import Weather from './components/Weather/Weather';
import MoodInput from './components/MoodInput/MoodInput';

function App() {
  return (
    <div className="App">
      <Weather />
      <MoodInput />
    </div>
  );
}

export default App;
