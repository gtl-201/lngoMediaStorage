/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { firestore } from '../firebase';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const Home = () => {


    useEffect(() => {
        firestore.get('data').then((data) => {
            setPhotos(data)
        });
    }, []);

    const navigate = useNavigate();

    const [photos, setPhotos] = useState<{ id: string, src: string, type: string, name: string, createdDate: number }[]>([]);

    return (
        <div className="App">
            <div id="main-content" className="file_manager">
                <div className="container">
                    <div className="row clearfix" style={{ padding: 10 }}>
                        {
                            photos?.map((photo) => {
                                return (
                                    <div className="col-lg-3 col-md-4 col-sm-12" key={photo.id}>

                                        <div className="card">
                                            <div className="file">
                                                <div onClick={() => {
                                                    navigate(`/view/${photo.id}`)
                                                }}>
                                                    {/* <div className="hover">
                                                    <button type="button" className="btn btn-icon btn-danger">
                                                        <i className="fa fa-trash"></i>
                                                    </button>
                                                </div> */}
                                                    <div className="image">
                                                        {
                                                            photo.type === 'videos' ? (
                                                                <video src={photo.src} controls={false} width={'100%'} height={180} className='img-fluid' />
                                                            ) : (
                                                                <img src={photo.src} alt="img" className="img-fluid" />
                                                            )
                                                        }
                                                    </div>
                                                    <div className="file-name">
                                                        <p className="m-b-5 text-muted text-truncate" title={photo.name}>{photo.name}</p>
                                                        <small><span className="date text-muted p-b-4">{(new Date(photo.createdDate).toISOString().replace(/T(.*?)Z$/i, ''))}</span></small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            )
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}

// <div style={{
//     overflow: 'hidden'
// }}>
//     {
//         photo.type === 'videos' ? (<video onClick={() => {
//             navigate(`/view/${photo.id}`)
//         }} src={photo.src} controls={false} width={200} height={200} />) : (<img style={{
//             objectFit: 'cover',
//             width: 200,
//             height: 200,
//             cursor: 'pointer',
//             // height: 400,
//         }} src={photo.src} alt={photo.id}
//             onClick={() => {
//                 navigate(`/view/${photo.id}`)
//             }}
//         />)
//     }

//     <div>{photo.name}</div>
// </div>
