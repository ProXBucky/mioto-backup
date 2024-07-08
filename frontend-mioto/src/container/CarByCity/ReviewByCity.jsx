import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { locationSelector } from '../../redux/selector';
import Rating from 'react-rating';
import { format } from 'date-fns';

function ReviewByCity({ cityName, allReview }) {
    const location = useSelector(locationSelector)
    return (
        <div className={`sm:px-5 md:px-5 lg:px-16 xl:px-32 py-10 bg-gray-50 `}>
            <div className='text-center sm:mb-5 md:mb-20 lg:mb-20 xl:mb-20'>
                <h1 className='h-12 sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-bold'>Những nhận xét tại</h1>
                <h1 className='h-12 sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-bold'>{cityName}</h1>
            </div>
            <div className="flex flex-wrap gap-3 mt-3 justify-center">
                {
                    allReview && allReview.length > 0 ?
                        allReview.map((item, index) => {
                            return (
                                <div className="rounded-lg border border-gray-500 p-4 flex justify-between sm:w-full md:w-[48%] lg:w-[32.3%] xl:w-[32.3%] bg-white" key={index}>
                                    <div className="w-full">
                                        <div className="flex flex-row sm:gap-2 md:gap-3 lg:gap-3 xl:gap-4">
                                            <img loading="lazy" src={item.user && item.user.avatarImage ? item.user.avatarImage : "/avaMale.png"} className="rounded-full h-20 border" />
                                            <div className="flex flex-col justify-center gap-2">
                                                <h2 className="sm:text-base md:text-lg lg:text-xl xl:text-xl font-semibold">{item.user && item.user.fullname}</h2>
                                                <div>
                                                    <Rating
                                                        initialRating={item.reviewScore && item.reviewScore}
                                                        fractions={2}
                                                        emptySymbol={<i className="fas fa-star" style={{ color: '#dcdcdc', fontSize: '16px' }}></i>}
                                                        fullSymbol={<i className="fas fa-star" style={{ color: '#ffd700', fontSize: '16px' }}></i>}
                                                        readonly={true}
                                                        direction="ltr"
                                                    />
                                                </div>
                                                <div className="w-full flex items-center text-gray-500 text-md">
                                                    <span>{format(item.reviewDate && item.reviewDate, 'dd/MM/yyyy')}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-3 text-gray-500">
                                            {item.content && item.content}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        :
                        <div className="w-full">
                            <p className="text-center font-semibold text-3xl">Hệ thống chưa ghi nhận câu nhận xét nào tại khu vực này</p>
                        </div>

                }
            </div>


        </div>

    );
}

export default (ReviewByCity);
