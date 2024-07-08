import React, { useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';
import { getListCarByCity } from '../../api/carAPI';
import { useParams } from 'react-router-dom';
import Banner from '../Home/Banner';
import CarList from '../../features/car/carList';
import Other from '../Home/Other';
import Blog from '../Home/Blog';
import ReviewByCity from './ReviewByCity';
import { getAllReviewByCity } from '../../api/appAPI';
import { useSelector } from 'react-redux';
import { locationCodeSelector, userIdSelector } from '../../redux/selector';


function CarByCity({ handleOpenDateModal, handleOpenLocationModal }) {
    const locationCode = useSelector(locationCodeSelector)
    const userId = useSelector(userIdSelector)
    const [carArray, setCarArray] = useState([])
    const [allReview, setAllReview] = useState([])
    let { city } = useParams('city')

    const cityBackgrounds = {
        haNoi: 'Hà Nội',
        hoChiMinh: 'Hồ Chí Minh',
        binhDuong: 'Bình Dương',
        lamDong: 'Lâm Đồng',
        haiPhong: 'Hải Phòng',
        khanhHoa: 'Khánh Hòa',
        kienGiang: 'Kiên Giang',
        daNang: 'Đà Nẵng'
    };
    const citys = cityBackgrounds[city];

    const fetchListCarByCity = async () => {
        let res = await getListCarByCity(city, userId, 8)
        if (res && res.length > 0) {
            setCarArray(res)
        } else {
            setCarArray([])
        }
    }

    const fetchAllReviewByCity = async () => {
        let res = await getAllReviewByCity(locationCode)
        if (res && res.length > 0) {
            setAllReview(res)
        } else {
            setAllReview([])
        }
    }

    useEffect(() => {
        fetchListCarByCity()
        fetchAllReviewByCity()
    }, [])


    return (
        <>
            <LazyLoad height={200}>
                <Banner city="city" cityName={citys} handleOpenDateModal={handleOpenDateModal} handleOpenLocationModal={handleOpenLocationModal} />
            </LazyLoad>
            <LazyLoad height={200}>
                <CarList city="city" cityName={citys} isHiddenTitle={false} carArray={carArray} />
            </LazyLoad>
            <LazyLoad height={200}>
                <ReviewByCity cityName={citys} allReview={allReview} />
            </LazyLoad>
            <LazyLoad height={200}>
                <Other />
            </LazyLoad>
            <LazyLoad height={200}>
                <Blog />
            </LazyLoad>
        </>
    );
}

export default (CarByCity);
