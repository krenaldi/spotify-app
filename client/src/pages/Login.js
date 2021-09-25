import styled from 'styled-components/macro';

const LoginContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const LoginButton = styled.a`
  display: inline-block;
  background-color: var(--green);
  color: var(--white);
  border-radius: var(--border-radius-pill);
  font-weight: 700;
  font-size: var(--fz-lg);
  padding: var(--spacing-sm) var(--spacing-xl);

  &:hover,
  &:focus {
    text-decoration: none;
    filter: brightness(1.1);
  }
`

const LOGIN_URI = process.env.NODE_ENV !== 'production' ? 'http://localhost:8888/login' : 'https://coffecakes-spotify-app.herokuapp.com/login'

const Login = () => (
  <LoginContainer>
    <LoginButton href={LOGIN_URI}>
      Log in to Spotify
    </LoginButton>
  </LoginContainer>
)

export default Login;