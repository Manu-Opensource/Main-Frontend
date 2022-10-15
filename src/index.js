import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Routes, Route, BrowserRouter} from "react-router-dom";
import Home from './pages/home';
import Courses from './pages/courses';
import Course from './pages/course';
import Lesson from './pages/lesson';
import Signup from './pages/signup';
import Signin from './pages/signin';
import "./index.css"



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <ThemeProvider theme={createTheme({
            palette: {
                mode: 'dark',
            },
            typography: {
                fontFamily: "Ubuntu"
            },
        })}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/courses" element={<Courses/>}/>
                <Route path="/courses/:courseId" element={<Course/>}/>
                <Route path="/lessons/:lessonId" element={<Lesson/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/signin" element={<Signin/>}/>
            </Routes>
        </BrowserRouter>
      </ThemeProvider>
  </React.StrictMode>
);

