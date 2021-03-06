import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Routes from "./Routes";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./Context/Theme-Context";
import { TodoProvider } from "./Context/TodoContext";
import { ShortLinkProvider } from "./Context/shortLink-context";
import { AuthProvider } from "./Context/Auth-Context";
import { NoteProvider } from "./Context/NoteContext";
import { ProjectsProvider } from "./Context/ProjectsContext";
import { ProjectTodoProvider } from "./Context/ProjectTodoContext";
import {
  ResourceProvider,
} from "./Context/ResourceContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <ProjectsProvider>
            <ProjectTodoProvider>
              <ResourceProvider>
                <NoteProvider>
                  <TodoProvider>
                    <ShortLinkProvider>
                      <Routes />
                    </ShortLinkProvider>
                  </TodoProvider>
                </NoteProvider>
              </ResourceProvider>
            </ProjectTodoProvider>
          </ProjectsProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
