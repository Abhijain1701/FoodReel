import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './profile.css';
import axios from 'axios';
import ReelViewer from '../../components/ReelViewer';

const FoodPartnerProfile = () => {

  const{id} =useParams()
  const [profile ,setProfile]=useState(null)
  const [videos,setVideos]=useState([])
  const [selectedReel, setSelectedReel] = useState(null)

  useEffect(()=>{
    axios.get(`http://localhost:3000/api/food-partner/${id}`,{
        withCredentials :true
    })
    .then(response=>{
        setProfile(response.data.foodPartner)
        setVideos(response.data.foodPartner.foodItems)
        console.log("response.data.foodPartner")
        console.log("response.data.foodPartner.foodItems",response.data.foodPartner.foodItems)
    })
  },[id])
  const [activeTab, setActiveTab] = useState('reels');

  // Dummy data - replace with actual data from API
  const foodPartner = {
    name: "Pizza Palace",
    address: "123 Food Street, Mumbai",
    avatar: null, // Will show initia+l if null
    bio: "Serving authentic Italian cuisine since 2015. Fresh ingredients, wood-fired perfection.",
    stats: {
      totalMeals: 156,
      customersServed: "12.5K",
      rating: 4.8
    }
  };

  // Dummy food items - replace with actual data
  const foodItems = [
    { _id: 1, name: "Margherita Pizza", video: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400" },
    { _id: 2, name: "Pepperoni Special", video: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400" },
    { _id: 3, name: "Veggie Supreme", video: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400" },
    { _id: 4, name: "BBQ Chicken", video: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400" },
    { _id: 5, name: "Four Cheese", video: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400" },
    { _id: 6, name: "Hawaiian", video: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400" },
  ];

  if (!profile) {
    return (
      <div className="profile-container">
        <div className="profile-scroll-area" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: '#666' }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      {/* Header with back button */}
      <header className="profile-header">
        <Link to="/" className="back-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="header-title">{profile.name}</h1>
        <button className="more-btn">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="5" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="19" r="2" />
          </svg>
        </button>
      </header>

      {/* Scrollable Area */}
      <div className="profile-scroll-area">
      {/* Profile Info Section */}
      <section className="profile-info-section">
        <div className="profile-top">
          {/* Avatar */}
          <div className="profile-avatar-wrapper">
            <div className="profile-avatar">
              {foodPartner.avatar ? (
                <img src={profile.avatar} alt={profile.name} />
              ) : (
                <span className="avatar-initial">{profile.name.charAt(0)}</span>
              )}
            </div>
            <div className="avatar-ring"></div>
          </div>


        </div>

        {/* Name and Bio */}
        <div className="profile-details">
          <h2 className="profile-name">{profile.name}</h2>
          <p className="profile-category">Restaurant</p>
          <p className="profile-bio">{profile.bio}</p>
          <div className="profile-location">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{profile.address}</span>
          </div>
        </div>


      </section>

      {/* Tabs */}
      <div className="profile-tabs">
        <button
          className={`tab-btn ${activeTab === 'reels' ? 'active' : ''}`}
          onClick={() => setActiveTab('reels')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
            <line x1="7" y1="2" x2="7" y2="22" />
            <line x1="17" y1="2" x2="17" y2="22" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <line x1="2" y1="7" x2="7" y2="7" />
            <line x1="2" y1="17" x2="7" y2="17" />
            <line x1="17" y1="17" x2="22" y2="17" />
            <line x1="17" y1="7" x2="22" y2="7" />
          </svg>
          Reels
        </button>
        <button
          className={`tab-btn ${activeTab === 'menu' ? 'active' : ''}`}
          onClick={() => setActiveTab('menu')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
          </svg>
          Menu
        </button>
      </div>

      {/* Content Grid */}
      <div className="profile-content">
        {activeTab === 'reels' && (
          <div className="reels-grid">
            {videos.map((item) => (
              <div key={item._id} className="reel-grid-item" onClick={() => setSelectedReel(item)}>
                <video src={item.video} muted loop playsInline preload="metadata" />
                <div className="reel-overlay-info">
                  <div className="reel-play-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                  <span className="reel-item-name">{item.name}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'menu' && (
          <div className="menu-list">
            {videos.map((item) => (
              <div key={item._id} className="menu-item">
                <video src={item.video} muted loop playsInline className="menu-item-img" />
                <div className="menu-item-info">
                  <h3 className="menu-item-name">{item.name}</h3>
                  <p className="menu-item-desc">{item.description}</p>
                </div>
                <button className="order-item-btn">Order</button>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>{/* End profile-scroll-area */}

      {/* Reel Viewer Modal */}
      {selectedReel && (
        <ReelViewer
          reel={selectedReel}
          onClose={() => setSelectedReel(null)}
        />
      )}
    </div>
  );
};

export default FoodPartnerProfile;
