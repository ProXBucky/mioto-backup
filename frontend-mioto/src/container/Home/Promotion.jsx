import React, { useState } from 'react';
import Slider from 'react-slick';

const SamplePrevArrow = (props) => {
    const { style, onClick } = props;
    return (
        <div
            className="absolute"
            style={{ ...style, zIndex: "1", left: "-23px", top: "42%", cursor: "pointer", borderRadius: "50%", border: "1px solid #d8dae5", backgroundColor: "#f6f6f6" }}
            onClick={onClick}
        >
            <i className="fa-solid fa-chevron-left fa-sm text-black py-[26px] px-4"></i>
        </div>
    );
}

const SampleNextArrow = (props) => {
    const { style, onClick } = props;
    return (
        <div
            className="absolute"
            style={{ ...style, zIndex: "1", right: "-23px", top: "42%", cursor: "pointer", borderRadius: "50%", border: "1px solid #d8dae5", backgroundColor: "#f6f6f6" }}
            onClick={onClick}
        >
            <i className="fa-solid fa-chevron-right fa-sm text-black py-[26px] px-4"></i>
        </div>
    );
}

const SamplePrevArrowSmall = (props) => {
    const { style, onClick } = props;
    return (
        <div
            className="absolute"
            style={{ ...style, zIndex: "1", left: "-10px", top: "42%", cursor: "pointer", borderRadius: "50%", border: "1px solid #d8dae5", backgroundColor: "#f6f6f6" }}
            onClick={onClick}
        >
            <i className="fa-solid fa-chevron-left fa-xs text-black py-[18px] px-3"></i>
        </div>
    );
}

const SampleNextArrowSmall = (props) => {
    const { style, onClick } = props;
    return (
        <div
            className="absolute"
            style={{ ...style, zIndex: "1", right: "-10px", top: "42%", cursor: "pointer", borderRadius: "50%", border: "1px solid #d8dae5", backgroundColor: "#f6f6f6" }}
            onClick={onClick}
        >
            <i className="fa-solid fa-chevron-right fa-xs text-black py-[18px] px-3"></i>
        </div>
    );
}


function Promotion({ handleOpenModal }) {

    const images = [
        {
            url: '/slider1.jpg',
            title: 'ĐẶT XE ĐI CHƠI LỄ 30/4 - 1/5 NGAY HÔM NAY ĐỂ NHẬN ƯU ĐÃI 140K',
            content: `
            🎉 Lễ này bạn đã dự định đi đâu chưa?
            🍃 Khám phá núi rừng hay dạo biển đổi gió thì thuê ngay xe tự lái trên Mioto. Tự do làm chủ hành trình, chu du khắp nơi ngắm muôn vàn cảnh đẹp.
            🚗 Thuê sớm chơi lễ, chọn xe thêm dễ. Thuê xe ngay hôm nay để nhận ưu đãi 140k khi nhập mã MI34, áp dụng cho chuyến đi ngày 30/4 - 01/05/2024, và đăt cọc sớm trước ngày 25/04/2024.
            📱 Ưu đãi đang có, xe đã sẵn sàng, mở Mioto thuê ngay!`
        },
        {
            url: '/slider2.jpg',
            title: '💥 ĐẶT XE NGAY HÔM NAY ĐỂ NHẬN ƯU ĐÃI 120K',
            content: `
            🌆 Nghỉ ngắn ngày - Tìm an yên. Lên lịch du lịch ngày Giỗ Tổ để sạc lại năng lượng sau một tuần tất bật với deadline.
            🚕 Thuê xe hơi, vui lễ thảnh thơi. Chuyến đi thêm trọn vẹn khi có Mioto kề bên.
            🎊 Nhập mã MI103 - giảm ngay 120k, áp dụng cho những chuyến xe đặt đi ngày 18-20/04/2024 và đặt cọc trước ngày 16/04/2024.
            📱 Thuê xe sớm, chớp ưu đãi, Mioto ngay!`
        },
        {
            url: '/slider3.jpg',
            title: '🎁 GIẢM 8% KHI ĐẶT XE - NHẬP MÃ HEVE ĐỂ NHẬN NGAY ƯU ĐÃI',
            content: `
            💫 Tháng tư là lời nói dối nhưng Mioto có ưu đãi thì không thể chối.
            🚘 Tháng mới mã mới, nhập mã HEVE - nhận ngay ưu đãi 8 % (tối đa 80k) khi thuê xe tại Mioto.Ưu đãi được áp dụng đến hết ngày 30 /04 / 2024.
            ⚡️ Ưu đãi đã có, mở app đặt xe ngay!`
        },
        {
            url: '/slider4.jpg',
            title: '🎁 NHẬN NGAY ƯU ĐÃI 120K CHO LẦN ĐẦU THUÊ XE 7 CHỖ TRÊN ỨNG DỤNG',
            content: `
            👨‍👩‍👧‍👦 Công việc có bận rộn cũng không thể bỏ lỡ những khoảnh khắc ấm áp bên người thân. Hành trình khám phá trở nên ý nghĩa hơn khi có gia đình kề bên. 
            🚙 Mở Mioto chọn ngay dòng xe 7 chỗ rộng rãi, cả nhà thoải mái tận hưởng trọn vẹn chuyến đi chơi cuối tuần.
            💥 Đặc biệt, Mioto giảm ngay 120K cho lần đầu thuê xe 7 chỗ trên ứng dụng. 
            * Ưu đãi áp dụng đến hết 30 /04 / 2024.
            📲 7 chỗ đi muôn nơi, cả nhà trọn niềm vui.Đặt xe ngay!`
        },
        {
            url: '/slider5.jpg',
            title: '⚡️ ƯU ĐÃI 100K KHI ĐẶT XE MINI NGAY HÔM NAY',
            content: `
            ✨ Nếu bạn đang tìm kiếm một chiếc ô tô nhỏ gọn, tiết kiệm nhiên liệu để di chuyển trong thành phố, hoặc trong những con đường hẹp, thì dòng xe ô tô mini sẽ là lựa chọn hoàn hảo cho bạn.
            🚕 Với thiết kế nhỏ gọn nhưng không kém phần đẹp mắt, phân khúc xe mini hiện đang có nhiều mẫu xe cho bạn dễ lựa chọn.
            Đặc biệt, Mioto giảm ngay 100k khi lần đầu đặt xe tại Mioto, bạn có thể thỏa sức trải nghiệm các mẫu xe mini bạn thích, ưu đãi áp dụng đến hết tháng 04.
            🎁 Nhanh tay mở app đặt xe để nhận ưu đãi liền tay!`
        },
        {
            url: '/slider6.jpg',
            title: '⚡️ GIẢM NGAY 120K KHI TRẢI NGHIỆM XE ĐIỆN TẠI MIOTO',
            content: `
            🚙 Xe điện là lựa chọn hoàn hảo cho tín đồ đam mê công nghệ và yêu môi trường xanh.
            🔋 Chỉ với một lần sạc cho quãng đường 400km giúp bạn di chuyển dễ dàng khắp các ngõ phố.
            🌟 Chọn ngay xe điện để thỏa sức trải nghiệm để nhận ngay ưu đãi giảm 120k cho dòng xe điện tại Mioto, ưu đãi được áp dụng đến hết tháng 04.
            📲 Xe điện hiện đại, không ngại đường xa, đặt xe ngay!`
        },

    ];

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToScroll: 1,
        slidesToShow: 3,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1025, // laptop and larger
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1024, // tablet
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    nextArrow: <SampleNextArrowSmall />,
                    prevArrow: <SamplePrevArrowSmall />,
                }
            },
            {
                breakpoint: 640, // smartphone
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    nextArrow: <SampleNextArrowSmall />,
                    prevArrow: <SamplePrevArrowSmall />,
                }
            }
        ]
    };

    return (
        <div className="sm:px-5 md:px-5 lg:px-16 xl:px-32 sm:py-48 md:py-36 lg:py-20 xl:py-20 h-[620px]">
            <div className='text-center mb-20'>
                <h1 className='sm:h-18 md:h-12 lg:h-12 xl:h-12 sm:text-2xl md:text-4xl lg:text-5xl xl:text-5xl font-bold'>Chương Trình Khuyến Mãi</h1>
                <h2 className='h-6 sm:text-lg md:text-2xl lg:text-2xl xl:text-2xl font-medium sm:mt-4 md:mt-4 lg:mt-5 xl:mt-5'>Nhận nhiều ưu đãi hấp dẫn từ Mioto</h2>
            </div>
            <Slider {...settings}>
                {images &&
                    images.map((item, index) => (
                        <div key={index} className='sm:h-[250px] md:h-[250px] lg:h-[235px] xl:h-[275px] px-2 overflow-hidden outline-none border-none' onClick={() => handleOpenModal(item.url, item.title, item.content)}>
                            <img loading="lazy" src={item.url} className='rounded-xl sm:h-[250px] md:h-[250px] lg:h-[235px] xl:h-[275px] cursor-pointer' alt={`Image ${index}`} />
                        </div>
                    ))}
            </Slider>
        </div>
    )

}

export default Promotion

