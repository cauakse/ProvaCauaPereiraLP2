import FormCadastro from './telas/telaCadastro';
import { BrowserRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import TelaBatepapo from './telas/telaBatepapo';
import TelaMain from './telas/telaMain';
import store from '../src/redux/store'
function App() {
  return (
    <>
      <Provider store={store}>
          <BrowserRouter>
          <Routes>
            <Route path="/cadastro" element={
              <FormCadastro/>
            }>
            </Route>
            <Route path="/batepapo" element={
              <TelaBatepapo/>
            }>
            </Route>
            <Route path="/" element={
              <TelaMain/>
            }>
            </Route>
            </Routes>
          </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
