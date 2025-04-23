
import React, { useEffect, useState } from 'react'
import axios from "axios";




// const { Service_id } = useParams();
//     const filteredProject = ServicesData.find(item => item.Service_id === Service_id)

const WebDevelopmentBackend = ({ data }) => {
    const [leftImage, setLeftImage] = useState('/images/default-image.jpg');
    const [rightImage, setRightImage] = useState('/images/default-image.jpg');

    useEffect(() => {
        const fetchImages = async () => {
            try {
                if (data?.leftimageId) {
                    const response = await axios.get(`http://localhost:5300/Image/get/${data.leftimageId}`);
                    setLeftImage(response.data.Image?.image || leftImage);
                }
                if (data?.rightimageId) {
                    const response = await axios.get(`http://localhost:5300/Image/get/${data.rightimageId}`);
                    setRightImage(response.data.Image?.image || rightImage);
                }
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };

        fetchImages();
    }, [data]);
    const isValid =
    data &&
    (data.lefttext || data.righttext || data.leftimageId || data.rightimageId);

if (!isValid) return null;

    return (
        <>
       
        <div className='web-development-sec my-36'>
            <div className="container mx-auto ">
                <div className="web-dev-wrapper grid grid-cols-12 gap-10 ">
                    <div className=' col-span-6' >
                        <h2 className='text-3xl font-bold leading-11 ' >{data.lefttext}</h2>
                    </div>
                    <div className="col-span-6 flex">
                        <div className="img-wrapper ml-auto ">
                            {data?.rightimageId && (
                                <div className="  rounded-lg overflow-hidden mb-8">
                                    <img
                                        src={rightImage.startsWith('http') ? rightImage : `http://localhost:5300${rightImage}`}
                                        alt="Right content"
                                        className=" object-cover"
                                        onError={(e) => {
                                            e.target.src = '/images/default-image.jpg';
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                    </div>
                </div>
                <div className="web-dev-wrapper grid grid-cols-12 gap-10 mt-12 ">
                    <div className=' col-span-7' >
                        <div className="img-wrapper ml-auto w-full">
                            {data?.leftimageId && (
                                <div className=" rounded-lg overflow-hidden">
                                    <img
                                        src={leftImage.startsWith('http') ? leftImage : `http://localhost:5300${leftImage}`}
                                        alt="Left content"
                                        className="w-full object-cover"
                                        onError={(e) => {
                                            e.target.src = '/images/default-image.jpg';
                                        }}
                                    />
                                </div>
                            )}

                            {/* <img src={img_2} alt="" className='w-full' /> */}
                        </div>
                    </div>
                    <div className="col-span-5 flex items-end justify-end">
                        <h3 className='text-xl font-bold  max-w-[570px] ' >{data.righttext}</h3>
                    </div>
                </div>
            </div>
        </div>
                        
                        </>
    )
}

export default WebDevelopmentBackend