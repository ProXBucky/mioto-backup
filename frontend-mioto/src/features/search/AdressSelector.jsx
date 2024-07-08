import React, { useState, useEffect } from 'react';
import City from '../../container/Home/City';
import { convertCityName } from '../../utils/convertCityName';

function AddressSelector({ handleChangeAddress }) {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);



    useEffect(() => {
        // Fetch provinces/cities data
        const fetchProvinces = async () => {
            try {
                const response = await fetch('https://vapi.vnappmob.com/api/province');
                const data = await response.json();
                setProvinces(data.results);
            } catch (error) {
                console.error('Error fetching provinces:', error);
            }
        };
        fetchProvinces();
    }, []);

    const handleProvinceChange = async (e) => {
        try {
            const [provinceId, provinceName] = e.target.value.split(',');
            const response = await fetch(`https://vapi.vnappmob.com/api/province/district/${provinceId}`);
            const data = await response.json();
            setDistricts(data.results);
            handleChangeAddress('city', provinceName);
            const shortCity = convertCityName(provinceName);
            handleChangeAddress('location', shortCity);
        } catch (error) {
            console.error('Error fetching districts:', error);
        }
    };

    const handleDistrictChange = async (e) => {
        try {
            const [districtId, districtName] = e.target.value.split(',');
            const response = await fetch(`https://vapi.vnappmob.com/api/province/ward/${districtId}`);
            const data = await response.json();
            setWards(data.results);
            handleChangeAddress('district', districtName);
        } catch (error) {
            console.error('Error fetching wards:', error);
        }
    };

    const handleWardChange = (e) => {
        handleChangeAddress('ward', e.target.value);
    };

    const handleChange = (e) => {
        let { value } = e.target
        handleChangeAddress('streetAddress', value);
    }

    return (
        <>
            <div className="flex sm:flex-col md:flex-row lg:flex-row xl:flex-row sm:gap-3 justify-between">
                <div className='sm:w-full md:w-1/4 lg:w-1/4 xl:w-1/4'>
                    <label className="text-gray-500 font-semibold">Tỉnh/T.phố</label>
                    <select onChange={(e) => handleProvinceChange(e)} className="w-full block px-2 py-2 bg-white border rounded-md focus:outline-none">
                        <option value="">Chọn tỉnh/tphố</option>
                        {provinces.map((province) => (
                            <option key={province.province_id} value={`${province.province_id},${province.province_name}`}>{province.province_name}</option>
                        ))}
                    </select>
                </div>
                <div className='sm:w-full md:w-1/4 lg:w-1/4 xl:w-1/4'>
                    <label className="text-gray-500 font-semibold">Quận/huyện</label>
                    <select onChange={(e) => handleDistrictChange(e)} className="w-full block px-2 py-2 bg-white border rounded-md focus:outline-none">
                        <option value="">Chọn quận/huyện</option>
                        {districts.map((district) => (
                            <option key={district.district_id} value={`${district.district_id},${district.district_name}`}>{district.district_name}</option>
                        ))}
                    </select>
                </div>
                <div className='sm:w-full md:w-1/4 lg:w-1/4 xl:w-1/4'>
                    <label className="text-gray-500 font-semibold">Phường/xã</label>
                    <select onChange={(e) => handleWardChange(e)} className="w-full block px-2 py-2 bg-white border rounded-md focus:outline-none">
                        <option value="">Chọn phường/xã</option>
                        {wards.map((ward) => (
                            <option key={ward.ward_id} value={ward.ward_name}>{ward.ward_name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <label className='text-gray-500 font-semibold mt-3'>Địa chỉ</label>
            <input placeholder='Nhập số nhà, tên đường' className='border p-2 w-full rounded-md' name="streetAddress" onChange={handleChange} />
        </>
    );
};

export default AddressSelector;
