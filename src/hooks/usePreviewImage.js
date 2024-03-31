import { useState } from "react"
import useShowToast from "./useShowToast";

const usePreviewImage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const showToast = useShowToast();
  const maxFileSizeInBytes = 4 * 1024 * 1024

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      if (file.size > maxFileSizeInBytes) {
        showToast("File Size Error", "Image must be less than 4MB.", "error");
        setSelectedFile(null);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result);
      }

      reader.readAsDataURL(file);

    } else {
      showToast("File Type Error", "Select an image file", "error");
      setSelectedFile(null);
    }
  }

  return { selectedFile, setSelectedFile, handleImageChange };
}

export default usePreviewImage