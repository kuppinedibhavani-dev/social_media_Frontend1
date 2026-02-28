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
  const { user, login } = useContext(AuthContext);
  const [image, setImage] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result as string);

      // Save inside AuthContext + localStorage
      login({
        ...user!,
        profileImage: reader.result as string,
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