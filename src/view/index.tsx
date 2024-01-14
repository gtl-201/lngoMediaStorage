import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { firestore } from "../firebase";
import ReactPlayer from 'react-player'

export const View = () => {

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            firestore.getByDoc('data', id).then(data => {
                setData(data);
            })
        }
    }, [id]);

    const [data, setData] = useState<any>(null);
    if (!data) {
        return <div>Không có dữ liệu...</div>
    }
    return <div style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 10
    }}>
        {
            data.type === 'photos'
                ?
                (
                    <img src={data.src} alt="" />
                )
                : (
                    <ReactPlayer url={data.src} controls autoPlay></ReactPlayer>
                )
        }

        <a href={data.src} download>{data.name}</a>
    </div>
}