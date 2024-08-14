import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { AppDispatch } from "../../store/store";
import { RegisterAction } from "../../store/slices/authSlice";
import Loader from "../Loader";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !username || !password) {
      return toast.error("All fields are required");
    }
    setLoading(true);
    dispatch(RegisterAction(email, password, username)).finally(() => {
      setLoading(false);
    });
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="w-[400px] max-w-[90vw] space-y-4"
      >
        <h1 className="font-extrabold text-xl">Create an Account</h1>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="username">* Username</label>
          <input
            className="border border-gray-300 p-3 rounded"
            type="text"
            placeholder="Enter your username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
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
        <button
          disabled={loading}
          type="submit"
          className="bg-black w-full text-white p-3 rounded"
        >
          {loading ? <Loader /> : "Register"}
        </button>
        <p className="text-xs">
          Alredy a user?{" "}
          <Link className="text-blue-500 hover:underline" to={"/auth/login"}>
            login now
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
