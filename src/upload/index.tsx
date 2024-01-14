import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { firestore, storage } from "../firebase";

export const Upload = () => {
    const [fileUpload, setFile] = useState<any>(null);
    const [name, setName] = useState('');
    const navigate = useNavigate();

    function handleUpload() {
        const type = fileUpload.type.includes('image') ? 'photos' : 'videos';
        storage.upload(`${type}/${new Date().getTime()}-${fileUpload.name}`, fileUpload).then((fileSrc) => {
            firestore.add('data', { name, src: fileSrc, type, createdDate: new Date().getTime() }).then(({ id }) => {
                navigate(`/view/${id}`);
            })
        })
    }

    return (
        <div style={{
            padding: 20,
            gap: 20,
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{
                display: 'flex',
                gap: 10
            }}>
                <input type="text" placeholder="Tên File" value={name} onChange={({ target: { value } }) => { setName(value) }} />
                <input type="file" accept="video/*,image/*" onChange={({ target: { files: [file] } }: any) => {
                    setFile(file);
                    if (name === '') {
                        setName(file.name)
                    }
                    if (file.type.includes('image')) {
                        const url = URL.createObjectURL(file);
                        document.querySelectorAll('#preview').forEach((elm: any) => {
                            elm.src = url;
                        })
                    }
                }} />
                <button disabled={name === '' || !fileUpload} onClick={handleUpload}>Tải lên</button>
            </div>
            <img src="" alt="" id='preview' />
        </div>
    )
}