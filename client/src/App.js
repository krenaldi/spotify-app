import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import { accessToken, logout } from './spotify';
import { GlobalStyle } from './styles';
import { Login, Profile, TopArtists, TopTracks, Playlists } from './pages';
import styled from 'styled-components/macro';

const LogoutButton = styled.button`
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-md);
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: rgba(0,0,0,.7);
  color: var(--white);
  font-size: var(--fz-sm);
  font-weight: 700;
  border-radius: var(--border-radius-pill);
  z-index: 10;
  @media (min-width: 768px) {
    right: var(--spacing-lg);
  }
`

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname])

  return null;
};

function App() {
  const [token, setToken] = useState(null);

  // Scroll to the top when changing routes

  useEffect(() => {
    setToken(accessToken);
  }, [])

  return (
    <div className="App">
      <GlobalStyle />
      {!token ? (
        <Login />
      ) : (
        <>
          <LogoutButton onClick={logout}>
            Log Out
          </LogoutButton>
          <Router>
            <ScrollToTop />
            <Switch>
              <Route path="/top-artists">
                <TopArtists />
              </Route>
              <Route path="/top-tracks">
                <TopTracks />
              </Route>
              <Route path="/playlists/:id">
                <h1>Playlist</h1>
              </Route>
              <Route path="/playlists">
                <Playlists />
              </Route>
              <Route path="/">
                <Profile />
              </Route>
            </Switch>
          </Router>
        </>
      )}
    </div>
  );
}

export default App;
