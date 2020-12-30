/* eslint-disable react/react-in-jsx-scope */
import MainPage from './pages/MainPage';
import Background from './components/Background';

function App() {
  return (
    <>
      <Background style={{ zIndex: 0 }} />
      <MainPage key="main-page" />
    </>
  );
}

export default App;
