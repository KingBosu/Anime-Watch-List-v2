import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { auth } from '../../firebase';
import { doc, setDoc, getFirestore } from 'firebase/firestore';

interface Anime {
  _id: string;
  title: string;
  image: string
  ranking: number;
  status: string;
  type: string;
  episodes: number;
  synopsis: string;
}

interface ResultsProps {
  searchTitle: string;
}

function Results() {
  const location = useLocation();
  const { searchTitle } = location.state as ResultsProps;
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);

  const addToWatchList = async (anime: Anime) => {
    const user = auth.currentUser;
    if (user) {
      const db = getFirestore();
      try {
        await setDoc(doc(db, 'users', user.uid, 'watchlist', anime._id), anime);
        console.log('Anime added to watchlist:', anime.title);
      } catch (error) {
        console.error('Error adding anime to watchlist:', error);
      }
    } else {
      console.log('User not logged in');
    }
  };

  const handleShowSummary = (anime: Anime) => {
    setSelectedAnime(anime);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'https://anime-db.p.rapidapi.com/anime';
        const params = new URLSearchParams({
          page: '1',
          size: '10',
          search: searchTitle,
          sortBy: 'ranking',
          sortOrder: 'asc',
        });
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': '53fa483435msha52a2623cd2394dp10c938jsna77e657bc56c',
            'X-RapidAPI-Host': 'anime-db.p.rapidapi.com',
          },
        };

        const response = await fetch(`${url}?${params.toString()}`, options);
        const data = await response.json();
        console.log(data);
        setAnimeList(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (searchTitle) {
      fetchData();
    }
  }, [searchTitle]);

  return (
    <div>
      <br />
      <h2>Results</h2>
      <br />
      <br />
      <div className="row">
        {animeList.length > 0 ? (
          animeList.map((anime) => (
            <div key={anime._id} className="col-md-3 mb-3">
              <div className="card">
                <img className="card-img-top" src={anime.image} alt={anime.title} />
                <div className="card-body">
                  <h5 className="card-title">{anime.title}</h5>
                  <p className="card-text">Ranking: {anime.ranking}</p>
                  <p className="card-text">Status: {anime.status}</p>
                  <p className="card-text">{anime.type}</p>
                  <p className="card-text">Episodes: {anime.episodes}</p>
                  {selectedAnime === anime ? (
                    <>
                      <p className="card-text">Summary: {selectedAnime.synopsis}</p>
                      <button className="btn btn-primary" onClick={() => setSelectedAnime(null)}>
                        Hide Summary
                      </button>
                    </>
                  ) : (
                    <button className="btn btn-primary" onClick={() => handleShowSummary(anime)}>
                      Show Summary
                    </button>
                  )}
                  <button className="btn btn-primary" onClick={() => addToWatchList(anime)}>
                    Add to List
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
      <button className="btn btn-primary" onClick={() => console.log('Button clicked!')}>
        Click Me
      </button>
    </div>
  );
}

export default Results;
