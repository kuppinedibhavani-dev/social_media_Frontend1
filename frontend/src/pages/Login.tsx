import { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // 👁️ eye icons

const Login = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await auth?.login(email, password);

    if (success) {
      navigate("/dashboard"); // 🔥 redirect
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-xl shadow-md max-w-sm w-full"
      >
        <h2 className="text-2xl font-bold text-center mb-5">Login</h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email address"
          className="border p-3 rounded w-full mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password field with eye toggle */}
        <div className="relative mb-4">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Password"
            className="border p-3 rounded w-full pr-12"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="button"
            className="absolute top-3 right-3 text-gray-600"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Login button */}
        <button
          type="submit"
          className="bg-blue-600 text-white p-3 rounded w-full font-semibold"
        >
          Login
        </button>

        {/* Sign up link */}
        <p className="text-center mt-4 text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 font-medium">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;