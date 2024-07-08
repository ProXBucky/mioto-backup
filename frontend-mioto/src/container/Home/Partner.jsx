import React, { useState } from 'react';
import Slider from 'react-slick';

function Partner() {

    const images = [
        '/partner1.jpg',
        '/partner2.jpg',
        '/partner3.jpg',
        '/partner4.jpg',
    ];

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToScroll: 1,
        slidesToShow: 4,
        responsive: [
            {
                breakpoint: 1025, // laptop and larger
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1024, // tablet
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 640, // smartphone
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <div className="sm:px-5 md:px-5 lg:px-16 xl:px-32 py-20 bg-gray-100">
            <div className='text-center mb-20'>
                <h1 className='h-12 sm:text-2xl md:text-4xl lg:text-5xl xl:text-5xl font-bold'>Hành Trình Của Bạn Luôn Được Bảo Vệ</h1>
            </div>
            <Slider {...settings}>
                {images &&
                    images.map((item, index) => (
                        <div key={index} className='overflow-hidden outline-none'>
                            <img loading="lazy" src={item} className='mx-auto cursor-pointer sm:h-[160px] md:h-[130px] lg:h-[130px] xl:h-[150px] sm:w-[320px] md:w-[230px] lg:w-[250px] xl:w-[300px] bg-white border-2 border-gray-200 rounded-xl' alt={`Image ${index}`} />
                        </div>
                    ))}
            </Slider>
        </div>
    )

}

export default Partner