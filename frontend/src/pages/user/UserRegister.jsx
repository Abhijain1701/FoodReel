import { Link } from 'react-router-dom';
import { User, Mail, Lock } from 'lucide-react';
import AuthLayout from '../../components/AuthLayout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { API_URL } from '../../config/api';

function UserRegister() {

  const navigate=useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();

    const fullName=e.target.fullName.value;
    const email=e.target.email.value;
    const password=e.target.password.value;

    console.log("full",fullName);

    try {
      const response=await axios.post(`${API_URL}/api/auth/user/register`,{
        fullName,
        email,
        password
      },{
        withCredentials: true
      })

      console.log("this resp",response.data);
      alert("Registration successful!");
      navigate("/user/login")
    } catch (error) {
      console.log("Error:", error.response?.data);
      alert(error.response?.data?.message || "Registration failed");
    }
  };
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join us to discover amazing food near you"
      userType="User"
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <Input
        id="firstName"
          label="Full Name"
          type="text"
          name="fullName"
          placeholder="Enter your full name"
          icon={User}
        />

        <Input
        id="email"
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email"
          icon={Mail}
        />

        <Input
        id="password"
          label="Password"
          type="password"
          name="password"
          placeholder="Create a password"
          icon={Lock}
        />

  

     

        <Button type="submit">Create Account</Button>




        <p className="auth-footer">
          Already have an account?{' '}
          <Link to="/user/login">Sign in</Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default UserRegister;
