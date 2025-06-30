import { useTranslation } from 'react-i18next';
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './styles/hover.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import { BiLoaderAlt } from 'react-icons/bi'

const Email: React.FC = () => {
    const { t } = useTranslation();
    const form = useRef<HTMLFormElement | null>(null);
    const [sent, setSent] = useState<string>("notSent")
    const [name, setName] = useState<string>("")
    const [error, setError] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [tel, setTel] = useState<string>("")
    const [num, setNum] = useState<string>("")
    const [parking, setParking] = useState<string>("")
    const [menu, setMenu] = useState<string>("")
    const [other, setOther] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

   
 const filterPassedTime = (time: Date) => {
    const selectedDate = startDate || new Date();
    const day = selectedDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const date = selectedDate.getDate();
    const month = selectedDate.getMonth(); // 0 = Jan, ..., 11 = Dec
    const year = selectedDate.getFullYear();
    const hour = new Date(time).getHours();
    const minute = new Date(time).getMinutes();

    const isThisYear = year === new Date().getFullYear();

    // Special dates: December 23, 24, 25 — allow lunch + dinner
    const isSpecialDate = month === 11 && (date === 23 || date === 24 || date === 25);

    // April 20 — block all times
    const isBlockedApril20 = isThisYear && month === 3 && date === 20;

    // April 26 — allow lunch only
    const isApril26LunchOnly = isThisYear && month === 3 && date === 26;

    // July 11, 2025 — allow lunch only (block dinner)
    const isJuly11LunchOnly = year === 2025 && month === 6 && date === 11;

    const isLunchTime =
        (hour === 11 && minute >= 30) ||
        hour === 12 ||
        (hour === 13 && minute <= 30);

    const isDinnerTime =
        (hour === 17 && minute >= 30) ||
        hour === 18 ||
        (hour === 19 && minute <= 30);

    if (isBlockedApril20) {
        return false; // no time allowed
    }

    if (isApril26LunchOnly || isJuly11LunchOnly) {
        return isLunchTime; // only lunch allowed
    }

    if (isSpecialDate) {
        return isLunchTime || isDinnerTime;
    }

    if (day === 1 || day === 2) {
        return isLunchTime;
    }

    return isLunchTime || isDinnerTime;
};

    
    

const isOff = (date: Date) => {
    const day = date.getDay();
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to midnight for comparison

    const year = today.getFullYear();
    const exclusionStart = new Date(year, 11, 27); // December 27 of this year
    const exclusionEnd = new Date(year + 1, 0, 5); // January 5 of next year

    const isDecember25 =
        date.getFullYear() === year &&
        date.getMonth() === 11 && // December
        date.getDate() === 25;

    const isApril20 =
        date.getFullYear() === year &&
        date.getMonth() === 3 && // April
        date.getDate() === 20;

    const isJune14 =
        date.getFullYear() === 2025 &&
        date.getMonth() === 5 && // June
        date.getDate() === 14;

    const isJuly8 =
        date.getFullYear() === 2025 &&
        date.getMonth() === 6 && // July
        date.getDate() === 8;

    const isAugust24 =
        date.getFullYear() === 2025 &&
        date.getMonth() === 7 && // August
        date.getDate() === 24;

    // Block April 20, June 14, July 8, and August 24
    if (isApril20 || isJuly8 || isAugust24) return false;

    return (
        date >= today &&
        (!isDecember25 && day !== 3 && day !== 4) && // Restrict Wednesday/Thursday except December 25
        !(date >= exclusionStart && date <= exclusionEnd) || // Restrict exclusion range except December 25
        isDecember25 // Explicitly allow December 25
    );
};


    
    
    
  
    const catchName = (e : React.ChangeEvent<HTMLInputElement>)=>{
        setName(e.target.value)
      }
    const catchEmail = (e : React.ChangeEvent<HTMLInputElement>)=>{
        setEmail(e.target.value)
      }
      const catchTel = (e : React.ChangeEvent<HTMLInputElement>)=>{
        setTel(e.target.value)
      }
    const catchNum = (e : React.ChangeEvent<HTMLInputElement>)=>{
        setNum(e.target.value)
      }
      const catchParking = (e : React.ChangeEvent<HTMLSelectElement>)=>{
        setParking(e.target.value)
      }
    const catchMenu = (e : React.ChangeEvent<HTMLTextAreaElement>)=>{
        setMenu(e.target.value)
      }
      const catchOther = (e : React.ChangeEvent<HTMLTextAreaElement>)=>{
        setOther(e.target.value)
      }


    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
            if (form.current) {
            console.log(form.current)
            emailjs
                .sendForm('service_iw4ecbq', 'template_n4pbk3q', form.current, process.env.REACT_APP_EMAIL_CODE)
                .then(
                    () => {
                        setSent('sent')
                        setLoading(false);
                    },
                    (error) => {
                        setSent('error');
                        console.log(error);
                        setLoading(false);
                    }
                );
        }
    };
    const classes = {
        label :'text-s block mb-2',
    }

    return (
        
        <form className='flex flex-col w-full gap-5' ref={form} onSubmit={sendEmail}>
            <h3 className='text-[23px] italic tracking-[2px]'>
                Online Reservation
            </h3>
            <div className='w-full'>
                <label className={classes.label}>{t('homePage.form.name.name')}</label>
                <input required onChange={catchName} className='w-full border block px-2 py-2' type="text" placeholder={t('homePage.form.name.placeholder') + ''} name="name" />
                {error=='name'&&<p className='text-sm text-pink-700'>
                    {t('homePage.form.reserveBtn')}
                </p>}
            </div>
            <div>
                <label className={classes.label}>{t('homePage.form.email.name')}</label>
                <input required onChange={catchEmail} className='w-full block border px-2 py-2' type="email" placeholder={t('homePage.form.email.placeholder') + ''}  name="email" />
            </div>
            <div className='flex gap-5 flex-wrap'>
                <div>
                    <label className={classes.label}>{t('homePage.form.tel.name')}</label>
                    <input onChange={catchTel} className='w-full block border px-2 py-2' type="tel" placeholder={t('homePage.form.tel.placeholder') + ''}  name="tel" />
                </div>
                <div className=''>
                    <label className={classes.label}>{t('homePage.form.time.name')}</label>
                    <DatePicker 
                            name='date'
                            showTimeSelect
                            className='border px-2 py-2 block'
                            selected={startDate} 
                            dateFormat="yyyy/MM/dd HH:mm"
                            filterDate={isOff}
                            filterTime={filterPassedTime}
                            onChange={(date) => setStartDate(date)}
                            timeFormat="HH:mm"
                             popperPlacement="bottom-end"
                    />
                    
                </div>
                <div>
                    <label  className={classes.label}>{t('homePage.form.num.name')} </label>
                    <input required onChange={catchNum} className='max-w-20 block border px-2 py-2'  type="number" placeholder='2' name="num" />
                 </div>
                <div>
                    <label  className={classes.label}>{t('homePage.form.parking.name')}</label>
                    <select onChange={catchParking} className='border w-fit px-2 py-2 block' name="parking">
                        <option value="無し">{t('homePage.form.parking.option1')}</option>
                        <option value="有り">{t('homePage.form.parking.option2')}</option>
                    </select>
                 </div>
            </div>
           
            <div>
                <label className={classes.label}>{t('homePage.form.menu.name')}</label>
                <textarea onChange={catchMenu} className='border px-2 py-2 block w-full min-h-10' placeholder={t('homePage.form.menu.placeholder') + ''} name="menu" />
            </div>
            <div>
                <label className={classes.label}>{t('homePage.form.other.name')}</label>
                <textarea onChange={catchOther} placeholder={t('homePage.form.other.placeholder') + ''} className='border px-2 py-2 block w-full' name="other" />
            </div>
            <p className=''>
            {t('homePage.form.reserveNotice')}<br/>{t('homePage.form.reserveNotice2')}
            </p>
            <button className={'w-full flex gap-2 items-center text-lg justify-center bg-blue-950 text-white py-3 hover:opacity-60 duration-300' + (loading?' pointer-events-none':'')}>
            {loading ? (<BiLoaderAlt className='animate-spin' />) : t('homePage.form.reserveBtn')}
            </button>
            {(sent != 'notSent')&&
            <p className='text-red-800 text-center'>
            {sent=='sent'? t('homePage.form.sentMessage'):t('homePage.form.errorMessage') }
            </p>
            }
        </form>
    );
};

export default Email;
