import './App.css';
import Navbar from './component/Navbar/Navbar';
import Segment from './component/Segment/Segment';

function App() {
  return (
    <div className="App">
       <Navbar message={"View Audience"}/>
       <div className='segment'>
          <Segment/>
       </div>
    </div>
  );
}

export default App;
