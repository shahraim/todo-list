import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TodoList from './Components/Todo';

function App() {
  return (
    <div className="App">
      <TodoList />
      <ToastContainer />
    </div>
  );
}

export default App;
