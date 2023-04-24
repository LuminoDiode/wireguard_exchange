import axios from 'axios';
import ExchangeHeader from './UI/ExchangeHeader/ExchangeHeader';
import ConfigGenerator from './UI/ConfigGenerator/ConfigGenerator';
import nodes from "./config/nodes.json"
import NodeInfo from './models/NodeInfo';
import cl from "./App.module.css";

function App() {
  const locations = nodes as NodeInfo[];
  axios.defaults.timeout = 5000;

  return (
    <span
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        alignSelf: "center"
      }}>

      <span className={cl.app}>
        <ExchangeHeader />
        <ConfigGenerator locationsList={locations} />
      </span>
    </span>
  );
}

export default App;
