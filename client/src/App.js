import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import { accessToken, logout, getCurrentUserProfile } from './spotify';
import { catchErrors } from './utils';
import { GlobalStyle } from './styles';
import styled from 'styled-components/macro';

const StyledLoginButton = styled.a`
  background-color: var(--green);
  color: var(--white);
  padding: 10px 20px;
  margin: 20px;
  border-radius: 30px;
  display: inline-block;
`

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  // Scroll to the top when changing routes
  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname])

    return null;
  }

  useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();
      // console.log(data);
      setProfile(data);
    };
    catchErrors(fetchData());
  }, [])

  return (
    <div className="App">
      <GlobalStyle />
      <header className="App-header">
        {!token ? (
          <StyledLoginButton
            href="http://localhost:8888/login"
          >
            Log in to Spotify
          </StyledLoginButton>
        ) : (
          <Router>
            <ScrollToTop />
            <Switch>
              <Route path="/top-artists">
                <h1>Top Artists</h1>
              </Route>
              <Route path="/top-tracks">
                <h1>Top Tracks</h1>
              </Route>
              <Route path="/playlists/:id">
                <h1>Playlist</h1>
              </Route>
              <Route path="/playlists">
                <h1>Playlists</h1>
              </Route>

              <Route path="/">
                <>
                  <button onClick={logout}>Log Out</button>
                  {profile && (
                    <div>
                      <h1>{profile.display_name}</h1>
                      <p>{profile.followers.total} Followers</p>
                      {profile.images.length && profile.images[0].url && (
                        <img src={profile.images[0].url} alt="Avatar" />
                      )}
                    </div>
                  )}
                </>
              </Route>
            </Switch>
          </Router>
        )}
      </header>
    </div>
  );
}

export default App;
