import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReelViewer from '../../components/ReelViewer';

const demoSavedReels = [
  {
    _id: '1',
    name: "Pizza Palace",
    description: "Best wood-fired pizzas in town!",
    video: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=60",
    foodPartner: "ajhndfjn"
  },
  {
    _id: '2',
    name: "Sushi Master",
    description: "Fresh sushi rolls crafted with passion.",
    video: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=60",
    foodPartner: "ajhndfjn"
  }
];

const SavedReels = () => {

  const [videos, setVideos] = useState(demoSavedReels)
  const [selectedReel, setSelectedReel] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/api/food/save", { withCredentials: true })
      .then(response => {
        setVideos(response.data.savedFoods)
        console.log("respon of saved ", response.data.savedFoods)
      })
      .catch(() => {})
  }, [])

  return (
    <div className="saved-page">
      <div className="saved-header">
        <h2>Saved Reels</h2>
      </div>

      <div className="saved-grid">
        {videos.map((item) => (
          <div key={item._id} className="saved-card" onClick={() => setSelectedReel(item)}>
            <video
              src={item.video}
              muted
              loop
              playsInline
              preload="metadata"
              className="saved-card-video"
            />
            <div className="saved-card-info">
              <span className="saved-card-name">{item.name}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Reel Viewer Modal */}
      {selectedReel && (
        <ReelViewer
          reel={selectedReel}
          onClose={() => setSelectedReel(null)}
        />
      )}

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <button className="bottom-nav-btn" onClick={() => navigate('/')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span>Home</span>
        </button>
        <button className="bottom-nav-btn active" onClick={() => navigate('/saved')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
          <span>Saved</span>
        </button>
      </nav>
    </div>
  );
};

export default SavedReels;
