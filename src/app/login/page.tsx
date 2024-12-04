"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";

import { auth } from "@/lib/firebase/config";

const Login = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  useEffect(() => {
    if (user) return router.push("/wraps");
  }, [user, router]);

  const handleLogin = async () => {
    try {
      const res = await signInWithEmailAndPassword(email, password);

      if (res) {
        sessionStorage.setItem("user", res.user.uid);
        router.push("/wraps");
        setEmail("");
        setPassword("");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleRegister = () => {
    router.push("/register");
  };

  return (
    <div className="flex items-center justify-center h-[100dvh] bg-base-100">
      <div className="bg-gray-800 flex flex-col items-center p-6 gap-2 rounded-lg shadow-xl w-[90%] md:w-[25%]">
        <h1 className="font-yeseva text-4xl mb-4">Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          className="input input-bordered w-full"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          className="input input-bordered w-full"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} className="btn btn-primary w-full">
          Login
        </button>

        <div className="flex justify-center gap-1 mt-4">
          No account?
          <button onClick={handleRegister} className="underline">
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
