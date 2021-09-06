import { Home } from './components/home/index.js';
import { Loader } from './components/loader/loader.js';

function App() {
  return (
      <section>
          <Loader/>
          <Home />
      </section>
  );
}

export default App;
