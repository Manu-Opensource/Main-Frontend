import { ThemeProvider, createTheme } from '@mui/material/styles';
import Home from './pages/home';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={createTheme({
            palette: {
                mode: 'dark',
            }
        })}>
            <Home/>
      </ThemeProvider>
    </div>
  );
}

export default App;
