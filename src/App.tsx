import './App.css';
import {ReactComponent as Enter} from './assets/enter.svg'

function App() {
  return (
    <div className='chatbox-container'>
      {/* Chatbox */}
      <div className='chat-window'>

      </div>
      {/* Button row */}
      <div className='action-bar'>
        <button className='chat-btn'>
          <Enter />
        </button>
      </div>
    </div>
  );
}

export default App;
