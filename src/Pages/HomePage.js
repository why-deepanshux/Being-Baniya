import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Home from '../assets/home.svg'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
const HomePage = () => {
    const navigate = useNavigate();

    function signUpClick(){
        navigate("/SignUp", { state: { myValue: false } });
    }
    function logInClick(){
        navigate("/SignUp", { state: { myValue: true } });
    }
  return (
    <div>
      <Header />
      <div class="home-wrapper">
        <div class="home-text">
          <div class="tag-line">Simplify Your Expenses</div>
          <div class="tag-line-text">
            Track, Split, and Visualize Your Expenses with Ease!
          </div>
          <div class="home-buttons">
            <Button text={"Sign Up"} onClick={signUpClick} blue={true} />
            <Button text={"Login"} onClick={logInClick} blue={true} />
          </div>
        </div>
        <div class="home-img">
          <img src={Home} alt="" class="image" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage
