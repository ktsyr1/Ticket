// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBT2yYj7Bbs1D0qcm65llx8kL6HQTL6b9M",
    authDomain: "ticket-e67c3.firebaseapp.com",
    projectId: "ticket-e67c3",
    storageBucket: "ticket-e67c3.appspot.com",
    messagingSenderId: "711252939152",
    appId: "1:711252939152:web:77dc10f276b20aef45a315",
    measurementId: "G-VDN4MX1VL3"
};
const app = initializeApp(firebaseConfig);
export class Storage {
    static async add(images) {
        images = Array.from(images)
        try {
            if (images.length > 0)
                return await Promise.all(images.map(async image => {
                    let storage = await getStorage(app)
                    let imageRef = await ref(storage, `images/${image.name}`)
                    await uploadBytes(imageRef, image)
                    let url = await getDownloadURL(imageRef)
                    return url
                }))
        } catch (error) { console.log(error); }
    }
}
// Initialize Firebase