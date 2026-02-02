import { Link } from 'react-router-dom';
import { Mail, Lock, Store } from 'lucide-react';
import AuthLayout from '../../components/AuthLayout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { API_URL } from '../../config/api';

function FoodPartnerLogin() {

  const navigate=useNavigate();
  const [error, setError]=useState("");
  const { login } = useAuth();

  const handleSubmit=async(e)=>{

    e.preventDefault();
    setError("")
    const email=e.target.email.value;
    const password=e.target.password.value;

    try{

      const response=await axios.post(`${API_URL}/api/auth/food-partner/login`,{
        email,
        password
      },{
        withCredentials:true
      });
      login(response.data.user || response.data);
      navigate("/create-food")
    }
    catch(err)
    {
       setError(err.response?.data?.message || "Wrong email or password");
    }
  }
  return (
    <AuthLayout
      title="Partner Login"
      subtitle="Access your restaurant dashboard"
      userType="Food Partner"
    >
      <form className="auth-form" onSubmit={ handleSubmit}>
         {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
        <Input
          label="Business Email"
          type="email"
          name="email"
          placeholder="Enter your business email"
          icon={Mail}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          icon={Lock}
        />

        <div className="checkbox-row">
          <label className="checkbox-label">
            <input type="checkbox" />
            <span>Remember me</span>
          </label>
          <Link to="/food-partner/forgot-password">Forgot password?</Link>
        </div>

        <Button type="submit">
          <Store size={20} />
          Access Dashboard
        </Button>

        <div className="info-box">
          <h3>Why partner with us?</h3>
          <ul>
            <li>Reach millions of hungry customers</li>
            <li>Easy-to-use restaurant dashboard</li>
            <li>Real-time order management</li>
          </ul>
        </div>

        <p className="auth-footer">
          New to ZomatoReel?{' '}
          <Link to="/food-partner/register">Register your restaurant</Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default FoodPartnerLogin;
