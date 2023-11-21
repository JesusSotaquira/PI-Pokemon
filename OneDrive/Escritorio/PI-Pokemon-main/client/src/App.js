import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import HomePage from './components/Home/Home';
import Detail from './components/Detail/Detail';
import PokemonForm from './components/PokemonForm/PokemonForm';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/create-pokemon" component={PokemonForm} />
          <Route exact path="/" component={Landing} />
          <Route path="/home" component={HomePage} />
          <Route path="/pokemons/:id" component={Detail} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
