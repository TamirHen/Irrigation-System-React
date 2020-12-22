import { FirebaseDatabaseProvider } from "@react-firebase/database";

import MainPage from './pages/MainPage';

function App() {
  return (
    <MainPage />
  );
}

// function App() {
//   return (
//     <FirebaseDatabaseProvider>
//       <MainPage />
//     </FirebaseDatabaseProvider>
//   );
// }

export default App;
