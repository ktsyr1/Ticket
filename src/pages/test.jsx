import { useState } from 'react';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { Storage } from '@/lib/firebase';

const UploadImage = () => {
    const [image, setImage] = useState(null);

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const uploadImage = async () => {
        console.log("start uploadImage");
        if (!image) return
        let a = await Storage.addOne(image)
        console.log("end uploadImage");
        console.log({ a });
        // let storage = getStorage()
        // let ref = ref(storage, `images/${image.name}`)
        // let url = getDownloadURL(ref)
        // console.log(url);

        // const imageRef = firebase.storage().ref('images/' + image.name);
        // const uploadTask = imageRef.put(image);

        // uploadTask.on('state_changed', async (snapshot) => {
        //     console.log(snapshot.state);

        //     if (snapshot.state === 'completed') {
        //         const downloadUrl = await imageRef.getDownloadURL();
        //         console.log(downloadUrl);
        //     }
        // });
    };

    return (
        <div className="box col w-300 space h-100 m-a">
            <input type="file" name="image" onChange={handleImageChange} />
            <button onClick={uploadImage}>Upload Image</button>
        </div>
    );
};

export default UploadImage;
