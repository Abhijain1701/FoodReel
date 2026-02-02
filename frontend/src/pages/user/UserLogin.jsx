import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import AuthLayout from '../../components/AuthLayout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useUserAuth } from '../../context/UserAuthContext';

function UserLogin() {

  const navigate=useNavigate();
  const [error, setError] = useState("");
  const { login } = useUserAuth();

  const handleSubmit=async (e)=>{
    e.preventDefault();
    setError("");

    const email=e.target.email.value;
    const password=e.target.password.value;

    try {
      const response=await axios.post("http://localhost:3000/api/auth/user/login",{
           email,
           password
      },{
        withCredentials:true
      });
      console.log(response.data)
      login(response.data.user || response.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Wrong email or password");
    }
  };
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to continue ordering delicious food"
      userType="User"
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email"
          icon={Mail}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          icon={Lock}
        />



        <Button type="submit">Sign In</Button>

      



        <p className="auth-footer">
          Don't have an account?{' '}
          <Link to="/user/register">Sign up</Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default UserLogin;
