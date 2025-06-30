import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      // Try different formats for the photo URL to maximize compatibility
      let photoURL = result.user.photoURL;
      console.log("Original Google photoURL:", photoURL);

      if (photoURL) {
        // Remove any size parameters and add a more compatible format
        photoURL = photoURL.split("=")[0] + "=s200-c";
        console.log("Modified photoURL:", photoURL);
      }

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: photoURL,
        }),
      });
      const data = await res.json();
      console.log("Google auth response:", data);
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("could not sign in with google", error);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-80 "
    >
      Continue with google
    </button>
  );
}

export default OAuth;
