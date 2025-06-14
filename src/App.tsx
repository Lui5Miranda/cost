import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//pages
import { Home } from "./components/pages/Home";
import { Company } from "./components/pages/Company";
import { Contact } from "./components/pages/Contact";
import { NewProject } from "./components/pages/NewProject";
import { Projects } from "./components/pages/Projects";
import { Project } from "./components/pages/Project";

//layout
import { Container } from "./components/layout/Container";
import { NavBar } from "./components/layout/NavBar";
import { Footer } from "./components/layout/Footer";

//styles
import "./styles/global.css";
import "./styles/theme.css";
function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Container customClass="minHeight">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/company" element={<Company />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/newproject" element={<NewProject />} />
            <Route path="/project/:id" element={<Project />} />
          </Routes>
        </Container>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
