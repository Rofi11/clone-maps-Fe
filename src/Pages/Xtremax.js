import React, {useEffect, useState} from 'react';
import axios from "axios";
import browser from '../Assets/Images/1-browser.png'
import suggest from '../Assets/Images/2-suggest.png'
import videos from '../Assets/Images/3-videos.png'
import blog from '../Assets/Images/4-blog.png'
import about from '../Assets/Images/5-about.png'
import option from '../Assets/Images/6-option.png'
import question from '../Assets/Images/7-question.png'
import close from '../Assets/Images/8-close.png'
import point from '../Assets/Images/9-point-red.png'
import pointBiru from '../Assets/Images/titik-blue50.png'
import '../Style/Map.css';
import "bootstrap/dist/css/bootstrap.css"
import { MapContainer, Marker, Popup, TileLayer, L} from 'react-leaflet'
import { API_URL } from '../Constants/API';

function Map(){
    const [Map,setMap] = useState([])
    const [namePlace, setNamePlace] = useState("Merlion")
    const [point, setPoint] = useState([1.28692, 103.85457])
    const [image, setImage] = useState(point)
    const [information, setInformation] = useState()
    const [address, setAddress] = useState()
    const [web, setWeb] = useState()
    const [block, setBlock] = useState(false)
    const [anggka, setAnggka] = useState(0)

    // get data from json server
    const fetchMap = () => {
        axios.get(`${API_URL}/map`)
        .then((res) => {
            setMap(res.data)
        })
        .catch((err) => {
            console.log(err);
        })
    }

    //for handle input change place
    const inputHandler = (latitude, longitude, name, image, information , address, web) => {
        setPoint([latitude, longitude])
        setNamePlace(name)
        setImage(image)
        setInformation(information)
        setAddress(address)
        setWeb(web)
        setBlock(true)
    } 

    // loop data from json
    const loopDataMap = () => {
        return Map.map((val) => {
            return (
                <div className='text-sidebar' onClick={(e) => inputHandler(val.latitude, val.longitude, val.name, val.image, val.information, val.address, val.web)}>
                    {val.name}
                </div>
            )
        })
    }

    useEffect(() => {
        fetchMap()
    }, [point])

    // for close button
    const handlerClose = () => {
        setBlock(false)
    }

    const handlerMove = (val , field) => {
        let angka = anggka
        let data = {}
        if(field === "next"){
            if(angka >= 0 && angka <= 9){
                angka += val
                data = Map[anggka]
                setAnggka(angka)
                setPoint([data.latitude, data.longitude])
                setNamePlace(data.name)
                setInformation(data.information)
                setAddress(data.address)
                setBlock(true)
                setImage(data.image)
                setWeb(data.web)
            } else {
                setAnggka(0)
                data = Map[anggka]
                setPoint([data.latitude, data.longitude])
                setNamePlace(data.name)
                setInformation(data.information)
                setAddress(data.address)
                setBlock(true)
                setImage(data.image)
                setWeb(data.web)
            }
        } else if(field === "previous"){
            if(angka <= 9 && angka >= 0){
                angka -= val
                data = Map[anggka]
                setAnggka(angka)
                setPoint([data.latitude, data.longitude])
                setNamePlace(data.name)
                setInformation(data.information)
                setAddress(data.address)
                setBlock(true)
                setImage(data.image)
                setWeb(data.web)
            } else {
                setAnggka(9)
                data = Map[anggka]
                setPoint([data.latitude, data.longitude])
                setNamePlace(data.name)
                setInformation(data.information)
                setAddress(data.address)
                setBlock(true)
                setImage(data.image)
                setWeb(data.web)
            }
        }
    }


    return(
        <div className='contain'>
            {/* part navbar icon */}
            <div className='container-nav-icon'>
                <div className='kotak'>
                    <img src={browser} alt='browser'/>
                    <p className="text">Browse</p>
                </div>
                <div className='kotak'>
                    <img src={suggest} alt='suggest'/>
                    <div>
                        <p className="text">
                            suggestion<br/>
                            Attraction
                        </p>
                    </div>
                </div>
                <div className='kotak'>
                    <img src={videos} alt='suggest'/>
                    <p className="text">Videos</p>
                </div>
                <div className='kotak'>
                    <img src={blog} alt='suggest'/>
                    <p className="text">Blog</p>
                </div>
                <div className='kotak'>
                    <img src={about} alt='suggest'/>
                    <p className="text">About</p>
                </div>
            </div>

            {/* part filter and data place */}
            <div className='contain-text'>
                <div className='text-filter'>
                    Filter by Favorite
                </div>
                {/* data loop from axios */}
                {loopDataMap()}
            </div>

            {/* part maps*/}
            <div className='image-maps'>
                <div className='top-images d-flex justify-content-between'>
                    <p>TOP-RATED TOURIST ATTRACTION IN SINGAPORE</p>
                    <div className='top-icon'>
                        <img src={option} alt="option"/>
                        <img src={question} alt="question"/>
                        <img src={close} alt="close" onClick={handlerClose}/>
                    </div>
                </div>
                <div className='map'>
                    <MapContainer center={point} zoom={15} scrollWheelZoom={false} style={{width : "1160px", height: "810px"}}>
                        <TileLayer
                            attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                            url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=I9lnhWmK34S4TUFb2QDK"
                        />
                        <Marker position={point} className="location-point">
                            <Popup>
                                {namePlace}
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
            {/* bagian pop-up */}
            <div className='pop-up' style={{display : block ? "block" : "none"}}>
                <div className='pop-up-image'>
                    <img src={image} alt='foto'/>
                </div>
                <div className='pop-up-name'>
                    {namePlace}
                </div>
                {/* ulasan singkat location */}
                <div className='pop-up-information'>
                    {information}
                </div>
                {/* alamat */}
                <div className='pop-up-information'>
                    <span className='point-biru'><img src={pointBiru}/></span>
                    <span>{address}</span>
                </div>
                {/* web place nya */}
                <div className='pop-up-information'>
                    <span className='browser'><img src={browser}/></span>
                    <span>{web}</span> 
                </div>
            </div>

            {/* for half cicrcle */}
            <div className='left-circle'>
                <i class="fa-solid fa-chevron-left" onClick={(e) => handlerMove(1, "previous")}></i>
            </div>
            <div className='right-circle'>
                <i className="fa-solid fa-chevron-right" onClick={(e) => handlerMove(1, "next")}></i>
            </div>
        </div>
    )
}

export default Map