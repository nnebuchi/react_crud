import React, { useEffect, useState } from "react";
import "../styles/gallery.css";

export default function Gallery(){
    const [photos, setPhotos]                   = useState([]);
    const [galley_url, setGalleryUrl]           = useState('');
    // const [gallery_app_url, setGalleryAppUrl]   = useState('');
    const [filter_url, setFilterUrl]            = useState('');
    useEffect(()=>{
        getPhotos()
    }, [])

    const getPhotos = async() => {
        const photoPool = await fetch("http://localhost:8082/api/v0/photos");
        const feedback = await photoPool.json();
        console.log(feedback)
        setGalleryUrl(feedback.url);
        setPhotos(feedback.photos)
        setFilterUrl(feedback.filterUrl);
    }
    return(
        
        <>
        
            <div className="row px-3">
                {photos.map((photo, index)=>(
                    <div key={photo.id} className="col-3 p-2 bg-secondary m-1">
                        <div className="card" style={{width: "100%"}}>
                            <img className="card-img-top" src={photo.signed_url} alt="Card image cap" />
                            <div className="card-body text-center">
                                <a href={`http://${filter_url}?image_url=${photo.signed_url}`} className="btn btn-secondary" target="_blank">Apply Filter</a>
                            </div>
                        </div>
                    </div>  
                ))}
                
            </div>
            
        </>
    );
}