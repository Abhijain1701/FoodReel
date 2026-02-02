import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../context/UserAuthContext';

const demoReels = [
  {
    id: 1,
    _id: '1',
    name: "Pizza Palace",
    description: "Best wood-fired pizzas in town! Fresh ingredients and authentic Italian recipes.",
    video: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=60",
    foodPartner: "ajhndfjn",
    likeCount:10
  },
  {
    id: 2,
    _id: '2',
    name: "Sushi Master",
    description: "Fresh sushi rolls crafted with passion. 20 years of Japanese culinary excellence.",
    video: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=60",
    foodPartner: "ajhndfjn",
    likeCount:12
  },
  {
    id: 3,
    _id: '3',
    name: "Burger Barn",
    description: "Juicy handcrafted burgers with premium Angus beef and our secret sauce.",
    video: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=60",
    foodPartner: "ajhndfjn",
    likeCount:18
  },
  {
    id: 4,
    _id: '4',
    name: "Taco Fiesta",
    description: "Authentic Mexican street tacos with handmade tortillas and slow-cooked meats.",
    video: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&auto=format&fit=crop&q=60",
    foodPartner: "ajhndfjn",
    likeCount:19

  },
  {
    id: 5,
    _id: '5',
    name: "Curry House",
    description: "Rich and aromatic Indian curries. From butter chicken to lamb biryani.",
    video: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop&q=60",
    foodPartner: "ajhndfjn",
    likeCount:28
  }
];

const Home = () => {
  const [reels, setReels] = useState(demoReels);
  
  const containerRef = useRef(null);

  const {logout}=useUserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try{
      const response = await axios.get("http://localhost:3000/api/auth/user/logout", {withCredentials:true});
      console.log("response", response.data);
      logout();
      navigate("/user/login");
    }
    catch(e)
    {
       console.log(e);
    }
  };

  useEffect(() => {
    axios.get("http://localhost:3000/api/food", { withCredentials: true })
      .then(response => {
        console.log("response of home", response.data.foodItems);
        setReels(response.data.foodItems);
      })
      .catch(() => {});
  }, []);



  async function likeVideo(item){
    try {
      console.log("food id ",item._id)

      const response=await axios.post("http://localhost:3000/api/food/like",{foodId: item._id},{withCredentials:true})

      if(response.data.like){
        console.log("Video liked")
        setReels((prev)=>prev.map((v)=>v._id ===item._id?{...v,likeCount: (v.likeCount || 0)+1 }:v  ))
      }
      else{
        console.log("video unliked ")
        setReels((prev)=>prev.map((v)=>v._id === item._id ? {...v,likeCount: (v.likeCount || 0)-1}:v))
      }
    } catch(error) {
      console.log("Error liking video:", error)
    }
  }

  async function saveVideo(item)
  {
    try {
      console.log("food id ",item._id)
      const response=await axios.post("http://localhost:3000/api/food/save",{foodId: item._id},{withCredentials:  true})

      if(response.data.save){
        console.log("video bookmarked");
        setReels((prev)=>prev.map((v)=>v._id===item._id?{...v,saveCount: (v.saveCount || 0)+1}:v))
      }
      else
      {
        console.log("unbooked")
        setReels((prev)=>prev.map((v)=>v._id===item._id?{...v,saveCount: (v.saveCount || 0)-1}:v))
      }
    } catch(error) {
      console.log("Error saving video:", error)
    }
  }

  return (
    <div className="home-page">
      <div className="reels-container" ref={containerRef}>
        {reels.map((item) => (
          <div key={item._id} className="reel-item">
            <div className="reel-background">
              <video
                src={item.video}
                autoPlay
                loop
                muted
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div className="reel-overlay"></div>
            </div>

            {/* Actions */}
            <div className="reel-actions">
              <div className="reel-action-group">
                <button onClick={()=>likeVideo(item)} className="reel-action-btn" aria-label="Like">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
                <span className="reel-action-count">{item.likeCount?? item.like??0}</span>
              </div>
         
              <div className="reel-action-group">
                <button className="reel-action-btn" onClick={()=>saveVideo(item)} aria-label="Save">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                  </svg>  
                </button>
                <span className="reel-action-count">{item.saveCount?? item.bookmarks??item.save}</span>
              </div>
            </div>

            {/* Comment Panel */}
 

            {/* Content */}
            <div className="reel-content">
              <div className="reel-header">
                <div className="restaurant-avatar">{item.name.charAt(0)}</div>
                <div className="restaurant-info">
                  <h3 className="restaurant-name">{item.name}</h3>
                  <div className="restaurant-meta"></div>
                </div>
              </div>

              <p className="reel-description">{item.description}</p>

              <div className="reel-footer">
                <div className="delivery-info">
                  <Link to={"/food-partner/" + item.foodPartner} className="order-btn">Visit Store</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <button className="bottom-nav-btn active" onClick={() => navigate('/')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span>Home</span>
        </button>
        <button className="bottom-nav-btn" onClick={() => navigate('/saved')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
          <span>Saved</span>
        </button>
        <button className="bottom-nav-btn" onClick={handleLogout}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default Home;
