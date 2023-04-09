import Lazyload from "./components/img-lazyload/index";
import icon from "./components/img-lazyload/image/1.png";

function App() {
  return (
    <div className="App">
        <Lazyload src={icon}/>
    </div>
  );
}

export default App;
