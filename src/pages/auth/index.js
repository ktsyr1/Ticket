// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
// import { initFirebase } from "@/lib/firebase";

const Home = () => {
    // initFirebase();
    // const provider = new GoogleAuthProvider();
    // const auth = getAuth();
    const router = useRouter();


    // const signIn = async () => {
    // console.log(auth);
    // const result = await signInWithPopup(auth, provider);
    // console.log(result.user);
    // };

    return (
        <div className="text-center flex flex-col gap-4 items-center">
            <div>Please sign in to continue</div>
            {/* <button onClick={signIn}> */}
            <div className="bg-blue-600 text-white rounded-md p-2 w-48">
                Sign In
            </div>
            {/* </button> */}
        </div>
    );
};

export default Home;