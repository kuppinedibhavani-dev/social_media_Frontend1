import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";

const ProfileImageModal = () => {
  const auth = useContext(AuthContext);
  const [image, setImage] = useState<string | null>(null);

  if (!auth) return null;

  const { user, updateUser } = auth;

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview
    const preview = URL.createObjectURL(file);
    setImage(preview);

    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("userId", user!.id);

    // 🔥 Correct backend URL
    const res = await fetch(
      "https://social-media-backend1-1.onrender.com/api/avatar/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    console.log("UPLOAD RESPONSE:", data);

    if (data.avatar_url) {
      // Update global state
      updateUser({
        ...user!,
        avatar_url: data.avatar_url,
      });
    } else {
      alert("Upload Failed: " + data.error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Upload Photo</Button>
      </DialogTrigger>

      <DialogContent className="p-6">
        <DialogHeader>
          <DialogTitle>Upload Profile Picture</DialogTitle>
        </DialogHeader>

        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="mt-4"
        />

        {image && (
          <img
            src={image}
            alt="Preview"
            className="w-24 h-24 rounded-full mt-4 border shadow"
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProfileImageModal;