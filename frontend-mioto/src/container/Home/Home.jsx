import React, { memo, useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';
import Banner from './Banner';
import Promotion from './Promotion';
import CarList from '../../features/car/carList';
import City from './City';
import Advantage from './Advantage';
import Partner from './Partner';
import Help from './Help';
import Other from './Other';
import Service from './Service'
import Blog from './Blog'
import ModalPromotionComponent from '../Common/ModalPromotionComponent';
import { getListCarByCity } from '../../api/carAPI';
import { useSelector } from 'react-redux';
import { locationCodeSelector, userIdSelector } from '../../redux/selector';


function Home({ handleOpenDateModal, handleOpenLocationModal }) {
    const cityCode = useSelector(locationCodeSelector)
    const userId = useSelector(userIdSelector)
    const [showModal, setShowModal] = useState(false);
    const [imageURL, setImageUrl] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [carArray, setCarArray] = useState([])

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleOpenModal = (img, tit, cont) => {
        setShowModal(true);
        setImageUrl(img)
        setTitle(tit)
        setContent(cont)
    };

    const fetchListCarByCity = async () => {
        let res = await getListCarByCity(cityCode, userId, 8)
        if (res && res.length > 0) {
            setCarArray(res)
        } else {
            setCarArray([])
        }
    }

    useEffect(() => {
        fetchListCarByCity()
    }, [])

    useEffect(() => {
        fetchListCarByCity()
    }, [cityCode])

    return (
        <>
            <LazyLoad height={200}>
                <Banner city="common" handleOpenDateModal={handleOpenDateModal} handleOpenLocationModal={handleOpenLocationModal} />
            </LazyLoad>
            <LazyLoad height={200}>
                <Promotion handleOpenModal={handleOpenModal} />
            </LazyLoad>
            <LazyLoad height={200}>
                <CarList isHiddenTitle={false} carArray={carArray} />
            </LazyLoad>
            <LazyLoad height={200}>
                <City />
            </LazyLoad>
            <LazyLoad height={200}>
                <Advantage />
            </LazyLoad>
            <LazyLoad height={200}>
                <Partner />
            </LazyLoad>
            <LazyLoad height={200}>
                <Service />
            </LazyLoad>
            <LazyLoad height={200}>
                <Help />
            </LazyLoad>
            <LazyLoad height={200}>
                <Other />
            </LazyLoad>
            <LazyLoad height={200}>
                <Blog />
            </LazyLoad>

            <ModalPromotionComponent
                showModal={showModal}
                handleClose={handleCloseModal}
                imageURL={imageURL}
                title={title}
                content={content}
            />
        </>
    );
}

export default (Home);
