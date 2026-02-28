import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { login, loading } = useContext(AuthContext)!;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigate("/dashboard"); // ⭐ navigate after login
    } catch {
      alert("Login failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Please wait..." : "Login"}
        </button>

        <p className="text-center mt-4 text-gray-700 dark:text-gray-300">
          Don’t have an account?
          <Link to="/register" className="text-blue-500 ml-1">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;