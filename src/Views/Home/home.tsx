import React, { useEffect, useState } from "react";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { auth } from "../../firebase";
import { Carousel } from "react-bootstrap";


interface Anime {
  _id: string;
  title: string;
  image: string;
}

export default function Home() {

  const [animeList, setAnimeList] = useState<Anime[]>([]);

  async function fetchAnimeData() {
    const url =
      "https://anime-db.p.rapidapi.com/anime?page=1&size=10&sortBy=ranking&sortOrder=asc";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "53fa483435msha52a2623cd2394dp10c938jsna77e657bc56c",
        "X-RapidAPI-Host": "anime-db.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setAnimeList(result.data);
    } catch (error) {
      console.error(error);
    }
  }

  const [message, setMessage] = useState('');


  const addToWatchList = async (anime: Anime) => {
    const user = auth.currentUser;
    if (user) {
      const db = getFirestore();
      try {
        await setDoc(
          doc(db, "users", user.uid, "watchlist", anime._id),
          anime
        );
        console.log("Anime added to watchlist:", anime.title);
        setMessage('Added to Watchlist')  
      } catch (error) {
        console.error("Error adding anime to watchlist:", error);
        setMessage('Error adding anime to watchlist:')
      }
    } else {
      console.log("User not logged in");
      setMessage('Sign in to Add to your watchlist')
    }
    setTimeout(() => {
      setMessage('');
    }, 2000);
  };


  useEffect(() => {
    fetchAnimeData();
  }, []);

  const showNextAnime = () => {
    setAnimeList((prevList) => [...prevList.slice(1), prevList[0]]);
  };

  useEffect(() => {
    const interval = setInterval(showNextAnime, 25000);
    return () => clearInterval(interval);
  }, [animeList]);

  return (
    <div className="d-flex justify-content-center">
      <div className="text-center">
        <h1>Anime Watch List</h1>
        <h4>Sign up or Sign in and keep track of all the anime you are currently watching!</h4>

        <h5>Popular Anime</h5>
        <h6>By Ranking</h6>
        <br />
        <br />
        <Carousel interval={5000} pause="hover">
          {animeList.slice(0, 5).map((anime, index) => (
            <Carousel.Item key={anime._id}>
              <div className="d-flex flex-column align-items-center">
                <img
                  className="mb-3"
                  src={anime.image}
                  alt={anime.title}
                  style={{ maxHeight: "500px" }}
                />
                <h5>{anime.title}</h5>
                <br></br>
                <button
                  className="btn btn-primary"
                  onClick={() => addToWatchList(anime)}
                  style={{ zIndex: 2 }}
                >
                  Add to List
                </button>
                {message && <p style={{ fontWeight: "bold" }}>{message}</p>}
                <br></br>
                <br></br>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
