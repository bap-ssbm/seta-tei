import { useTranslation } from 'react-i18next';
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './styles/hover.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import { BiLoaderAlt } from 'react-icons/bi'

const Email: React.FC = () => {
    const { t , i18n} = useTranslation();
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

   
   // Specific days that are completely off
const fullyBlockedDates = [
    { year: 2025, month: 4, day: 20 }, // April 20, 2025
    { year: 2025, month: 6, day: 14 }, // June 14, 2025
    { year: 2025, month: 7, day: 8 },  // July 8, 2025
    { year: 2025, month: 8, day: 24 }, // August 24, 2025
    { year: 2025, month: 9, day: 14 }, // September 14, 2025
    { year: 2025, month: 8, day: 15 }, 
    { year: 2025, month: 11, day: 24 }, 
    { year: 2025, month: 11, day: 11 }, 
        { year: 2025, month: 11, day: 29 }, 
  ];
  
  // Ranges of days that are off
  const blockedRanges = [
    {
      start: new Date(2025, 7, 27), // Aug 27, 2025
      end: new Date(2025, 8, 6),    // Sep 6, 2025
    }
  ];
  
  // Dates with only lunch/dinner allowed
  const specialDates = [
    { year: 2025, month: 9, day: 12, lunchOnly: true, dinnerOnly: false },
    { year: 2025, month: 9, day: 14, lunchOnly: true, dinnerOnly: false },
    { year: 2025, month: 9, day: 14, lunchOnly: true, dinnerOnly: true },
    { year: 2025, month: 11, day: 23, lunchOnly: true, dinnerOnly: false },
    { year: 2025, month: 11, day: 29, lunchOnly: true, dinnerOnly: false },
    { year: 2025, month: 12, day: 6, lunchOnly: true, dinnerOnly: false },
  ];
  
    function matchesDate(date: Date, target: { year: number; month: number; day: number }) {
        return (
          date.getFullYear() === target.year &&
          date.getMonth() === target.month - 1 &&
          date.getDate() === target.day
        );
      }
      
      function isInBlockedRange(date: Date) {
        return blockedRanges.some(r => date >= r.start && date <= r.end);
      }
      
      function getSpecialDateRule(date: Date) {
        return specialDates.find(d => matchesDate(date, d));
      }
      
    const filterPassedTime = (time: Date) => {
        const selectedDate = startDate || new Date();
        const hour = time.getHours();
        const minute = time.getMinutes();
      
        const isLunchTime =
          (hour === 11 && minute >= 30) ||
          hour === 12 ||
          (hour === 13 && minute <= 30);
      
        const isDinnerTime =
          (hour === 17 && minute >= 30) ||
          hour === 18 ||
          (hour === 19 && minute <= 30);
      
        const rule = getSpecialDateRule(selectedDate);
      
        if (rule) {
          if (rule.lunchOnly && !rule.dinnerOnly) return isLunchTime;
          if (!rule.lunchOnly && rule.dinnerOnly) return isDinnerTime;
          if (rule.lunchOnly && rule.dinnerOnly) return isLunchTime || isDinnerTime;
        }
      
        // Default rules (example: Mon/Tue lunch only)
        if (selectedDate.getDay() === 1 || selectedDate.getDay() === 2) {
          return isLunchTime;
        }
      
        return isLunchTime || isDinnerTime;
      };
      

    
    

      const isOff = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
      
        const year = today.getFullYear();
        const exclusionStart = new Date(year, 11, 27); // Dec 27
        const exclusionEnd = new Date(year + 1, 0, 5); // Jan 5
      
        const isDecember25 =
          date.getFullYear() === year &&
          date.getMonth() === 11 &&
          date.getDate() === 25;
      
        // Check if date is fully blocked
        if (fullyBlockedDates.some(d => matchesDate(date, d)) || isInBlockedRange(date)) {
          return false;
        }
      
        return (
          date >= today &&
          (!isDecember25 && date.getDay() !== 3 && date.getDay() !== 4) && // no Wed/Thu except Dec 25
          (!(date >= exclusionStart && date <= exclusionEnd) || isDecember25)
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
            
            <button className={'w-full flex gap-2 items-center text-lg justify-center bg-blue-950 text-white py-3 hover:opacity-60 duration-300' + (loading?' pointer-events-none':'')}>
            {loading ? (<BiLoaderAlt className='animate-spin' />) : t('homePage.form.reserveBtn')}
            </button>
            <p className='text-sm'>
            {t('homePage.form.reserveNotice')}<br/>{t('homePage.form.reserveNotice2')}<br/>
            {i18n.language === "ja" ? (
  <>※当店からのメール（<a className='underline' href="mailto:setatei0077@gmail.com">setatei0077@gmail.com</a>）が迷惑メールや着信拒否などにならないような設定をお願い致します。</>
) : (
  <>*Please set up your email settings so that emails from our restaurant( <a className='underline' href="mailto:setatei0077@gmail.com">setatei0077@gmail.com</a>) are not blocked as spam or rejected.</>
)}<br/>{t('homePage.form.reserveNotice3')}
            </p>
            {(sent != 'notSent')&&
            <p className='text-red-800 text-center'>
            {sent=='sent'? t('homePage.form.sentMessage'):t('homePage.form.errorMessage') }
            </p>
            }
        </form>
    );
};

export default Email;
