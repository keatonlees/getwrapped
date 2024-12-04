"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
} from "react-firebase-hooks/auth";

import { auth } from "@/lib/firebase/config";

const Register = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  useEffect(() => {
    if (user) return router.push("/wraps");
  }, [user, router]);

  const handleRegister = async () => {
    try {
      const res = await createUserWithEmailAndPassword(email, password);

      if (res) {
        sessionStorage.setItem("user", res.user.uid);
        router.push("/login");
        setEmail("");
        setPassword("");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-center h-[100dvh] bg-base-100">
      <div className="bg-gray-800 flex flex-col items-center p-6 gap-2 rounded-lg shadow-xl w-[90%] md:w-[25%]">
        <h1 className="font-yeseva text-4xl mb-4">Register</h1>

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
        <button onClick={handleRegister} className="btn btn-primary w-full">
          Create Account
        </button>

        <div className="flex justify-center gap-1 mt-4">
          Already have an account?
          <button onClick={handleLogin} className="underline">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
