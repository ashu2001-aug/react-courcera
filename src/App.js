import { Navbar, NavbarBrand} from "reactstrap";
import './App.css';
import Menu from './components/MenuComponents';
import{DISHES} from "./shared/dishes"
import { Component } from 'react/cjs/react.production.min';
import { render } from '@testing-library/react';
import Main from "./components/MainComponent";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore();



class App extends Component {
  
  render(){
  return (
    <Provider store={store}>
    <BrowserRouter>
      <div className="App">
        <Main />
      </div>
    </BrowserRouter>
  </Provider>
    
  );
}
}

export default App;
