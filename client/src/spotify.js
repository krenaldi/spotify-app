import axios from 'axios';

// Map for localStorage keys
const LOCALSTORAGE_KEYS = {
  accessToken: 'spotify_access_token',
  refreshToken: 'spotify_refresh_token',
  expireTime: 'spotify_token_expire_time',
  timestamp: 'spotify_token_timestamp'
}

// Map to retrieve localStorage values
const LOCALSTORAGE_VALUES = {
  accessToken: localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
  refreshToken: localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
  expireTime: localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
  timestamp: localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
}

/*
Check if the amount of time that has elapsed betewn the timestamp in localStorage
and now is greater than the expiration time of 3600 seconds (1 hr). Return boolean
value whether or not access token has expired
*/
const hasTokenExpired = () => {
  const { accessToken, timestamp, expireTime } = LOCALSTORAGE_VALUES;
  if (!accessToken || !timestamp) {
    return false;
  }
  const millisecondsElapsed = Date.now() - Number(timestamp);
  return (millisecondsElapsed / 1000) > Number(expireTime);
}

/*
Clear out all localStorage items and reload page
*/
export const logout = () => {
  // clear all localStorage items
  for (const property in LOCALSTORAGE_KEYS) {
    localStorage.removeItem(LOCALSTORAGE_KEYS[property])
  }
  // Navigate to the homepage
  window.location = window.location.origin;
}

/*
Use refresh token in localStorage to hit the /refresh_token endpoint in Node app then
update values in localStorage with data from response
*/

const refreshToken = async () => {
  try {
    // Logout if there's np refresh token stored or we've managed to get into a reload infinite loop
    if (!LOCALSTORAGE_VALUES.refreshToken || LOCALSTORAGE_VALUES.refreshToken === 'undefined' ||
      (Date.now() - Number(LOCALSTORAGE_VALUES.timestamp) / 1000) < 1000) {
      console.error('No refresh token available');
      logout();
    }

    // Use /refresh_token endpoint data
    const { data } = await axios.get(`/refresh_token?refresh_token=${LOCALSTORAGE_VALUES.refreshToken}`);

    // Update localStorage values
    localStorage.setItem(LOCALSTORAGE_KEYS.accessToken, data.access_token);
    localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());

    // Reload page for locaStorage updates to be reflected
    window.location.reload();

  } catch (error) {
    console.error(error);
  }
}

const getAccessToken =() => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const queryParams = {
    [LOCALSTORAGE_KEYS.accessToken]: urlParams.get('access_token'),
    [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get('refresh_token'),
    [LOCALSTORAGE_KEYS.expireTime]: urlParams.get('expires_in'),
  };
  const hasError = urlParams.get('error');

  // if there's an error or the token in localStorage has expired, refresh the token
  if (hasError || hasTokenExpired() || LOCALSTORAGE_VALUES.accessToken === 'undefined') {
    refreshToken();
  }

  //if there's a valid access token in localStorage use that
  if (LOCALSTORAGE_VALUES.accessToken && LOCALSTORAGE_VALUES.accessToken !== 'undefined') {
    return LOCALSTORAGE_VALUES.accessToken;
  }

  // if there's a token in the URL query params, user is logging in for first time
  if (queryParams[LOCALSTORAGE_KEYS.accessToken]) {
    // store query params in localStorage
    for (const property in queryParams) {
      localStorage.setItem(property, queryParams[property]);
    }
    // set timestamp
    localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());
    // return access token from query params
    return queryParams[LOCALSTORAGE_KEYS.accessToken]
  }

  return false;
};

export const accessToken = getAccessToken();