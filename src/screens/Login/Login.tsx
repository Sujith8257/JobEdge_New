import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCyiHHLJeqygENGGAdKlKL2es3Y7qJ4MNM",
    authDomain: "goaround1-f7a84.firebaseapp.com",
    projectId: "goaround1-f7a84",
    storageBucket: "goaround1-f7a84.appspot.com",
    messagingSenderId: "901999773807",
    appId: "1:901999773807:web:cf07e3deaf7b0f0bef659a",
    measurementId: "G-K182FF54Y9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const Login = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error);
      alert("Invalid email or password");
    }
  };

  // Google Sign-In function
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      alert(`Welcome ${result.user.displayName}`);
      console.log("User Info:", result.user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="bg-white flex flex-row justify-center w-full min-h-screen">
      <div className="bg-white w-full max-w-[1440px] h-[1024px] relative">
        <Card className="w-[550px] absolute top-[187px] left-1/2 -translate-x-1/2 bg-[#d3d3d3] rounded-[5px] border-2 border-solid border-[#323232] shadow-[4px_4px_0px_#323232] p-6">
          <CardContent className="p-0 pt-16">
            <header className="mb-16">
              <h1 className="font-black text-3xl text-[#323232] font-['Roboto',Helvetica] mb-2">
                Welcome,
              </h1>
              <p className="font-bold text-xl text-[#666666] font-['Roboto',Helvetica]">
                sign up to continue
              </p>
            </header>

            <form onSubmit={handleSubmit} className="flex flex-col gap-7">
              <div className="relative">
                <Input
                  className="h-[60px] bg-white rounded-[5px] border-2 border-solid border-[#323232] shadow-[4px_4px_0px_#323232] px-4 py-3 font-bold text-xl text-[#666666] font-['Roboto',Helvetica]"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                />
              </div>

              <div className="relative">
                <Input
                  type="password"
                  className="h-[60px] bg-white rounded-[5px] border-2 border-solid border-[#323232] shadow-[4px_4px_0px_#323232] px-4 py-3 font-bold text-xl text-[#666666] font-['Roboto',Helvetica]"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                />
              </div>

              <div className="flex flex-col items-center gap-4 mt-6">
                <Button
                  type="button"
                  className="w-[60px] h-[60px] rounded-[40px] bg-white border-2 border-solid border-[#323232] shadow-[4px_4px_0px_#323232] p-0 flex items-center justify-center"
                  onClick={loginWithGoogle}
                >
                  <img
                    className="w-6 h-6"
                    alt="Google sign in"
                    src="/layer-1.svg"
                  />
                </Button>

                <Button
                  type="submit"
                  className="w-[181px] h-[67px] bg-white rounded-[5px] border-2 border-solid border-[#323232] shadow-[4px_4px_0px_#323232] font-bold text-3xl text-[#323232] font-['Roboto',Helvetica]"
                >
                  Let's go →
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};