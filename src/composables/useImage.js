import { ref, computed } from "vue";
import { useFirebaseStorage } from "vuefire";
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { uid } from "uid";
export default function useImage() {
  const url = ref("");
  const storage = useFirebaseStorage();

  const onFileChange = (e) => {
    const file = e.target.files[0];
    const fileName = uid() + ".jpg";
    const sRef = storageRef(storage, "/products/" + fileName);
    const uploadTask = uploadBytesResumable(sRef, file);
    uploadTask.on(
      "state_changed",
      () => {},
      (error) => console.log(error),
      () => {
        //Upload Complete
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            url.value = downloadURL;
          })
          .catch((error) => console.log(error));
      }
    );
  };
  const isImageUploaded = computed(() => {
    return url.value ? url.value : null;
  });
  return {
    onFileChange,
    url,
    isImageUploaded,
  };
}
