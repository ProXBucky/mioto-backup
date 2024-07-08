import React, { useEffect, useState } from 'react';
import { format, differenceInDays } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
const pastMonth = new Date()
import viLocale from 'date-fns/locale/vi';
import "../../assets/css/datePicker.css"


function DatePicker({ setBeDate, setEnDate }) {
    const [range, setRange] = useState([]);

    const today = new Date()

    let totalDays = 0;
    let footer = <p>Hãy chọn ngày đi và ngày về</p>;
    if (range?.from) {
        const beginDate = format(range.from, 'dd/MM/yyyy'); // Định dạng ngày thành chuỗi
        setBeDate(beginDate);
        if (!range.to) {
            footer = <p>{format(range.from, 'P', { locale: viLocale })}</p>;
        } else if (range.to) {
            const endDate = format(range.to, 'dd/MM/yyyy'); // Định dạng ngày thành chuỗi
            setEnDate(endDate);
            footer = (
                <p>
                    {format(range.from, 'P', { locale: viLocale })} – {format(range.to, 'P', { locale: viLocale })}
                </p>
            );
            totalDays = differenceInDays(range.to, range.from);
        }
    }

    //responsive
    const [numberOfMonths, setNumberOfMonths] = useState(2);
    useEffect(() => {
        const updateNumberOfMonths = () => {
            if (window.innerWidth <= 1023) {
                setNumberOfMonths(1);
            } else {
                setNumberOfMonths(2);
            }
        };
        updateNumberOfMonths();
    }, [])


    return (
        <div>
            <DayPicker
                className='h-80'
                numberOfMonths={numberOfMonths}
                id="test"
                mode="range"
                defaultMonth={pastMonth}
                selected={range}
                onSelect={setRange}
                locale={viLocale}
                disabled={{ before: today }}
            />
            <div className='sm:px-5'>
                <div className='text-lg font-semibold'>{footer}</div>
                <div>Số ngày thuê: {totalDays} ngày</div>
            </div>
        </div>
    );
}

export default DatePicker