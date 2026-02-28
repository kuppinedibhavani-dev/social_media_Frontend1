import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const { register, loading } = useContext(AuthContext)!;
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("All fields are required!");
      return;
    }

    const success: boolean = await register(name, email, password);

    if (success === true) {
      navigate("/dashboard");
    } else {
      alert("Registration failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-sm bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white">
          Register
        </h2>

        {/* Full Name */}
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-2 mb-3 border rounded bg-gray-50 dark:bg-gray-700 
          text-gray-900 dark:text-white outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded bg-gray-50 dark:bg-gray-700
          text-gray-900 dark:text-white outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password with Show/Hide */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700
            text-gray-900 dark:text-white outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2 text-gray-600 dark:text-gray-300"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {loading ? "Please wait..." : "Create Account"}
        </button>

        <p className="text-center mt-4 text-gray-700 dark:text-gray-300">
          Already have an account?
          <Link to="/login" className="text-blue-500 ml-1">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;