import "./App.css";

import { Header } from "./stickyElements/Header";
import { Footer } from "./stickyElements/Footer";
import { Home } from "../routes/HomeRoute/Home";
import { Lists } from "../routes/ListsRoute/Lists";
import { List } from "../routes/List";
import { Focus } from "../routes/Focus";
import { Login } from "../routes/Login";

import {
  Routes,
  Route,
} from "react-router-dom";

export function App() {
  return (
    <div>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lists" element={<Lists />} />
          <Route path="/list" element={<List />} />
          <Route path="/focus" element={<Focus />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      <Footer />
    </div>
  );
}
