import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Upload, X, Play, ArrowLeft, Lightbulb, LogOut, Home } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './CreateFood.css';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const CreateFood = () => {
  const { user, logout } = useAuth();
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const navigate=useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [dragActive, setDragActive] = useState(false);

 

  // TODO: Add your home navigation logic here
  const handleHome = () => {
    // Write your home navigation logic here
    navigate("/")
    
  };

  // TODO: Add your logout logic here
  const handleLogout = async () => {
    // Write your logout logic here
   try{
     const response=await axios.get("http://localhost:3000/api/auth/food-partner/logout",{withCredentials:true})
    console.log(response)
    logout()
    navigate('/food-partner/login')
   }
   catch(e)
   {
    console.log(e)
   }
  };

  const handleVideoSelect = (file) => {
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) handleVideoSelect(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) handleVideoSelect(file);
  };

  const removeVideo = () => {
    setVideoFile(null);
    setVideoPreview(null);
    setIsPlaying(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Add your submit logic here
    console.log('Name:', name);
    console.log('Description:', description);
    console.log('Video File:', videoFile);
    
    const formData=new FormData();

    formData.append('name',name);
    formData.append('description',description) 
    formData.append('video', videoFile)

    const response=await axios.post("http://localhost:3000/api/food",formData,{
      withCredentials:true,
    })
     console.log(response.data)

     navigate("/")
  };

  return (
    <div className="create-page">
      {/* Header */}
      <header className="create-header">
        <div className="header-inner">
          <Link to={`/food-partner/${user?._id || ''}`} className="back-btn">
            <ArrowLeft size={20} />
          </Link>
          <div className="header-title">
            <h1>Create Reel</h1>
            <p>Share your delicious creation</p>
          </div>
          <button onClick={handleHome} className="back-btn" style={{marginLeft: 'auto'}}>
            <Home size={20} />
          </button>
          <button onClick={handleLogout} className="back-btn" style={{marginLeft: '10px'}}>
            <LogOut size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="create-main">
        <form onSubmit={handleSubmit} className="create-form">

          {/* Left - Video Upload */}
          <div className="form-left">
            <div className="video-card">
              {!videoPreview ? (
                <div
                  className={`upload-zone ${dragActive ? 'drag-active' : ''}`}
                  onClick={() => fileInputRef.current?.click()}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleFileInput}
                    hidden
                  />
                  <div className="upload-icon">
                    <Upload size={32} />
                  </div>
                  <h3>Upload Video</h3>
                  <p>Drag & drop or click to browse</p>
                  <div className="format-badges">
                    <span>MP4</span>
                    <span>MOV</span>
                    <span>WebM</span>
                  </div>
                  <p className="size-hint">Maximum file size: 100MB</p>
                </div>
              ) : (
                <div className="preview-zone">
                  <video
                    ref={videoRef}
                    src={videoPreview}
                    loop
                    playsInline
                    onClick={toggleVideoPlay}
                  />
                  <div
                    className={`play-overlay ${isPlaying ? 'hidden' : ''}`}
                    onClick={toggleVideoPlay}
                  >
                    <button type="button" className="play-btn">
                      <Play size={32} fill="#fff" />
                    </button>
                  </div>
                  <button type="button" className="remove-btn" onClick={removeVideo}>
                    <X size={18} />
                  </button>
                </div>
              )}
            </div>

            {videoFile && (
              <div className="file-info">
                <span className="file-name">{videoFile.name}</span>
                <span className="file-size">{(videoFile.size / (1024 * 1024)).toFixed(1)} MB</span>
              </div>
            )}
          </div>

          {/* Right - Form Fields */}
          <div className="form-right">
            <div className="form-fields">
              {/* Food Name */}
              <div className="field">
                <label htmlFor="name">Food Name</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Butter Chicken, Margherita Pizza"
                  maxLength={100}
                />
                <span className="char-count">{name.length}/100</span>
              </div>

              {/* Description */}
              <div className="field">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell us about your dish - ingredients, preparation, what makes it special..."
                  maxLength={500}
                  rows={5}
                />
                <span className="char-count">{description.length}/500</span>
              </div>

              {/* Tips */}
              <div className="tips-box">
                <h4><Lightbulb size={18} /> Tips for a great reel</h4>
                <ul>
                  <li>Use good natural lighting</li>
                  <li>Keep videos between 15-60 seconds</li>
                  <li>Show the dish from multiple angles</li>
                  <li>Capture textures and steam</li>
                </ul>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="submit-btn"
                disabled={!videoFile || !name.trim() || !description.trim()}
              >
                Post Reel
              </button>
            </div>
          </div>

        </form>
      </main>
    </div>
  );
};

export default CreateFood;
