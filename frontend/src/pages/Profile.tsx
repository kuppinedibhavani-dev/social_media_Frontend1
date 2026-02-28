import { useContext, useState, useRef } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Pencil } from "lucide-react";
import axios from "axios";

const API_URL = "http://localhost:5000";

const Profile = () => {
  const { user, updateUser } = useContext(AuthContext)!;

  const [preview, setPreview] = useState<string | null>(null);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEditClick = () => fileInputRef.current?.click();

  // Avatar Upload
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("userId", user?.id || "");

    try {
      const res = await axios.post(`${API_URL}/api/avatar/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      updateUser(res.data.user);
    } catch (err) {
      console.error("Avatar upload failed:", err);
    }
  };

  // SAVE CHANGES HANDLER
  const handleSaveChanges = async () => {
    try {
      const res = await axios.put(`${API_URL}/api/avatar/update-profile`, {
        userId: user?.id,
        name,
        email,
        password
      });

      updateUser(res.data.user);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Profile update failed:", err);
      alert("Failed to update profile.");
    }
  };

  const defaultAvatar = user?.avatar_url
    ? user.avatar_url
    : `https://ui-avatars.com/api/?name=${user?.name}&background=random`;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Profile Settings</h1>

      <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-6">

        {/* Avatar */}
        <div className="flex flex-col items-center mb-6 relative">
          <img
            src={preview || defaultAvatar}
            alt="avatar"
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-300 dark:border-gray-700"
          />

          <button
            onClick={handleEditClick}
            className="absolute bottom-2 right-36 bg-blue-600 p-2 rounded-full shadow-lg hover:bg-blue-700 transition"
          >
            <Pencil color="white" size={18} />
          </button>

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {/* Form Inputs */}
        <div className="space-y-4">
          <div>
            <label className="text-gray-700 dark:text-gray-300 font-medium">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 p-2 border rounded bg-gray-100 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="text-gray-700 dark:text-gray-300 font-medium">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 border rounded bg-gray-100 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="text-gray-700 dark:text-gray-300 font-medium">
              New Password
            </label>
            <input
              type="password"
              value={password}
              placeholder="Enter new password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 border rounded bg-gray-100 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <button
            onClick={handleSaveChanges}
            className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
};

export default Profile;