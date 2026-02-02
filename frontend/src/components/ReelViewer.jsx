import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ReelViewer.css';
import { API_URL } from '../config/api';

const ReelViewer = ({ reel, onClose, onLike, onSave }) => {

  const handleLike = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/api/food/like`,
        { foodId: reel._id },
        { withCredentials: true }
      );
      if (onLike) onLike(response.data.like);
    } catch (error) {
      console.log("Error liking:", error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/api/food/save`,
        { foodId: reel._id },
        { withCredentials: true }
      );
      if (onSave) onSave(response.data.save);
    } catch (error) {
      console.log("Error saving:", error);
    }
  };

  if (!reel) return null;

  return (
    <div className="reel-viewer">
      <div className="reel-viewer-content">
        {/* Video */}
        <video
          src={reel.video}
          autoPlay
          loop
          muted
          playsInline
          className="reel-viewer-video"
        />
        <div className="reel-viewer-overlay"></div>

        {/* Close button */}
        <button className="reel-viewer-close" onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Actions */}
        <div className="reel-viewer-actions">
          <div className="reel-action-group">
            <button onClick={handleLike} className="reel-action-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
            <span className="reel-action-count">{reel.likeCount || 0}</span>
          </div>
          <div className="reel-action-group">
            <button onClick={handleSave} className="reel-action-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
            </button>
            <span className="reel-action-count">{reel.saveCount || 0}</span>
          </div>
        </div>

        {/* Info */}
        <div className="reel-viewer-info">
          <div className="reel-header">
            <div className="restaurant-avatar">{reel.name?.charAt(0)}</div>
            <h3 className="restaurant-name">{reel.name}</h3>
          </div>
          <p className="reel-description">{reel.description}</p>
          {reel.foodPartner && (
            <Link to={"/food-partner/" + reel.foodPartner} className="order-btn">
              Visit Store
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReelViewer;
