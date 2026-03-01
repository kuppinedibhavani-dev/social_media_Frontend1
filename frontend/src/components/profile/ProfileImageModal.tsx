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
  // Hooks MUST be at top level
  const auth = useContext(AuthContext);
  const [image, setImage] = useState<string | null>(null);

  // If no auth → just render nothing (AFTER hooks)
  if (!auth) return null;

  const { user, updateUser } = auth;

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result as string;
      setImage(base64);

      updateUser({
        ...user!,
        avatar_url: base64,
      });
    };

    reader.readAsDataURL(file);
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