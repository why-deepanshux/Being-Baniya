import React from 'react'
import Header from '../components/Header';
import SignUpSignInComponent from '../components/SignInAndSignUp';
import Footer from '../components/Footer';
const SignUp = () => {
  return (
    <div>
      <Header />
      <div className="wrapper">
        {/* Hello ! this is sign up block */}
        <SignUpSignInComponent />
      </div>
      <Footer />
    </div>
  )
}

export default SignUp
