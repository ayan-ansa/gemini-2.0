import { useState } from "react";
import Main from "./components/Main/Main";
import Sidebar from "./components/Sidebar/Sidebar";
import "./App.css";

function App() {
  const [isActive, setIsActive] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [itemId, setItemId] = useState("");

  return (
    <>
      <Sidebar
        isActive={isActive}
        setIsActive={setIsActive}
        setFilteredData={setFilteredData}
        setIsShow={setIsShow}
        itemId={itemId}
        setItemId={setItemId}
      />
      <Main
        isActive={isActive}
        setIsActive={setIsActive}
        filteredData={filteredData}
        setFilteredData={setFilteredData}
        isShow={isShow}
        setIsShow={setIsShow}
        setItemId={setItemId}
      />
    </>
  );
}

export default App;
