import { Link } from 'react-router-dom';
import { Store, Mail, Lock, Phone, MapPin } from 'lucide-react';
import AuthLayout from '../../components/AuthLayout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { API_URL } from '../../config/api';

function FoodPartnerRegister() {

  const navigate=useNavigate();

  const handleSubmit=async (e)=>{
    e.preventDefault();

    const businessName=e.target.businessName.value;
  
    const phone =e.target.phone.value;
    const email=e.target.email.value;
    const password=e.target.password.value;
    const address=e.target.address.value;

    try {
      const response=await axios.post(`${API_URL}/api/auth/food-partner/register`,{
        name: businessName,
      
        phone,
        email,
        password,
        address
      },{
        withCredentials: true
      })
      console.log(response.data);
      navigate("/create-food");
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
    }

  }
  return (
    <AuthLayout
      title="Register Restaurant"
      subtitle="Join our network of partner restaurants"
      userType="Food Partner"
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <Input
          label="Business Name"
          type="text"
          name="businessName"
          placeholder="Enter restaurant name"
          icon={Store}
        />

        <Input
          label="Business Email"
          type="email"
          name="email"
          placeholder="Enter business email"
          icon={Mail}
        />

        <Input
          label="Phone Number"
          type="tel"
          name="phone"
          placeholder="Enter contact number"
          icon={Phone}
        />

        <Input
          label="Restaurant Address"
          type="text"
          name="address"
          placeholder="Enter full address"
          icon={MapPin}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Create a password"
          icon={Lock}
          />





        <Button type="submit">
          <Store size={20} />
          Register Restaurant
        </Button>

        <div className="info-box-gray">
          <h3>What happens next?</h3>
          <ol>
            <li>Submit your registration</li>
            <li>Our team will verify your details</li>
            <li>Set up your menu and start receiving orders</li>
          </ol>
        </div>

        <p className="auth-footer">
          Already registered?{' '}
          <Link to="/food-partner/login">Sign in</Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default FoodPartnerRegister;
