import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  getDocs,
  doc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { auth } from "../../firebase";

interface Anime {
  id: string;
  title: string;
  status: string;
  type: string;
  episodes: number;
  synopsis: string;
  currentEpisode: number;
}

function Profile() {
  const [watchlist, setWatchlist] = useState<Anime[]>([]);
  const [expandedSynopsisId, setExpandedSynopsisId] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const firestoreInstance = getFirestore();
        const user = auth.currentUser;
        const q = query(
          collection(firestoreInstance, "users", user.uid, "watchlist")
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Anime[];
        setWatchlist(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWatchlist();
  }, []);

  const handleRemoveFromWatchlist = async (id: string) => {
    try {
      const firestoreInstance = getFirestore();
      const user = auth.currentUser;
      const docRef = doc(firestoreInstance, "users", user.uid, "watchlist", id);
      await deleteDoc(docRef);
      setWatchlist((prevWatchlist) =>
        prevWatchlist.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleSynopsisToggle = (id: string) => {
    setExpandedSynopsisId((prevId) => (prevId === id ? null : id));
  };

  const handleEpisodeChange = async (id: string, newEpisode: number) => {
    try {
      const firestoreInstance = getFirestore();
      const user = auth.currentUser;
      const docRef = doc(firestoreInstance, "users", user.uid, "watchlist", id);
      await setDoc(docRef, { currentEpisode: newEpisode }, { merge: true });

      setWatchlist((prevWatchlist) =>
        prevWatchlist.map((item) =>
          item.id === id ? { ...item, currentEpisode: newEpisode } : item
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center flex-column">
      <h3>Current Watchlist</h3>
      <div className="row row-cols-5">
        {watchlist.length > 0 ? (
          watchlist.map((anime) => (
            <div key={anime.id} className="col mb-2">
              <div className="card">
                <img
                  className="card-img-top"
                  src={anime.image}
                  alt={anime.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{anime.title}</h5>
                  <p className="card-text">Status: {anime.status}</p>
                  <p className="card-text">Type: {anime.type}</p>
                  <p className="card-text">Episodes: {anime.episodes}</p>
                  <p className="card-text">
                    {expandedSynopsisId === anime.id ? anime.synopsis : ""}
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleSynopsisToggle(anime.id)}
                  >
                    {expandedSynopsisId === anime.id
                      ? "Hide Summary"
                      : "Summary"}
                  </button>
                  <div className="d-flex align-items-center">
                    <label htmlFor={`episode-${anime.id}`} className="me-2">
                      Current Episode:
                    </label>
                    <input
                      type="number"
                      id={`episode-${anime.id}`}
                      className="form-control"
                      min={1}
                      max={anime.episodes}
                      value={anime.currentEpisode || ""}
                      onChange={(e) =>
                        handleEpisodeChange(anime.id, Number(e.target.value))
                      }
                    />
                  </div>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemoveFromWatchlist(anime.id)}
                  >
                    Remove from Watchlist
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No items in watchlist</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
