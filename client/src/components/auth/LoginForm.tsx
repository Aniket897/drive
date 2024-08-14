import { useState } from "react";
import { Link } from "react-router-dom";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { LoginAction } from "../../store/slices/authSlice";
import Loader from "../Loader";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("All fields are required");
    }
    setLoading(true);
    dispatch(LoginAction(email, password)).finally(() => {
      setLoading(false);
    });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="w-[400px] max-w-[90vw] space-y-4"
      >
        <h1 className="font-extrabold text-xl">Welcome Back!</h1>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="email">* Email</label>
          <input
            className="border border-gray-300 p-3 rounded"
            type="text"
            placeholder="Enter your email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="password">* Password</label>
          <input
            className="border border-gray-300 p-3 rounded"
            type="password"
            placeholder="Enter your password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <p className="underline cursor-pointer text-xs">forgot password?</p>
        </div>
        <button
          type="submit"
          className="bg-black w-full text-white p-3 rounded"
        >
          {loading ? <Loader /> : "Login"}
        </button>
        <p className="text-xs">
          Not a user?{" "}
          <Link className="text-blue-500 hover:underline" to={"/auth/register"}>
            register now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
