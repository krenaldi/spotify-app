import { useState, useEffect } from 'react';
import axios from 'axios';
import { getCurrentUserPlaylists } from '../spotify';
import { catchErrors } from '../utils';
import { SectionWrapper, PlaylistsGrid, Loader } from '../components'

const Playlists = () => {
  const [playlistsData, setPlaylistsData] = useState(null);
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getCurrentUserPlaylists();
      setPlaylistsData(data)
    }
    catchErrors(fetchData());
  }, []);

  // When playlistsData updated, check if there are more playlists to fetch then update the state variable
  useEffect(() => {
    if (!playlistsData) {
      return;
    }

    // // Since playlist endpoint only returns 20 playlists at a time, we need to make surewe get ALL playlists by fetching the next set of 20
    const fetchMoreData = async () => {
      if (playlistsData.next) {
        const { data } = await axios.get(playlistsData.next);
        setPlaylistsData(data);
      }
    };

    // Functional update to update playlists state variable to avoid including playlists as a dependency for this hook and creating an infinite loop
    setPlaylists(playlists => ([
      ...playlists ? playlists : [],
      ...playlistsData.items
    ]));

    // Fetch next set of playlists as needed
    catchErrors(fetchMoreData());
  }, [playlistsData])

  return (
    <main>
      <SectionWrapper title="Public Playlists" breadcrumb={true}>
        {playlists ? (
          <PlaylistsGrid playlists={playlists} />
        ) : (
          <Loader />
        )}
      </SectionWrapper>
    </main>
  )
}

export default Playlists
