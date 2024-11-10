import { useTranslation } from 'react-i18next';
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './styles/hover.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Button from '../Home/components/ui/Button';

const Email: React.FC = () => {
    const { t } = useTranslation();
    const form = useRef<HTMLFormElement | null>(null);
    const [startDate, setStartDate] = useState<Date | null>(new Date());

    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (form.current) {
            emailjs
                .sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
                .then(
                    () => {
                        console.log('SUCCESS!');
                    },
                    (error) => {
                        console.log('FAILED...', error.text);
                    }
                );
        }
    };
    const classes = {
        label :'text-s block mb-2',
    }

    return (
        <form className='flex flex-col w-full gap-5' ref={form} onSubmit={sendEmail}>
            <div className='w-full'>
                <label className={classes.label}>{t('homePage.reservation.form.name.name')}</label>
                <input className='w-full border block px-2 py-2' type="text" placeholder={t('homePage.reservation.form.name.placeholder') + ''} name="user_name" />
            </div>
            <div>
                <label className={classes.label}>{t('homePage.reservation.form.email.name')}</label>
                <input className='w-full block border px-2 py-2' type="email" placeholder={t('homePage.reservation.form.email.placeholder') + ''}  name="user_email" />
            </div>
            <div className='flex gap-5 flex-wrap'>
                <div>
                    <label className={classes.label}>{t('homePage.reservation.form.tel.name')}</label>
                    <input className='w-full block border px-2 py-2' type="tel" placeholder={t('homePage.reservation.form.tel.placeholder') + ''}  name="user_tel" />
                </div>
                <div>
                    <label className={classes.label}>{t('homePage.reservation.form.time.name')}</label>
                    <DatePicker 
                            showTimeSelect
                            className='border px-2 py-2 block'
                            selected={startDate} 
                            dateFormat="Pp"
                            onChange={(date: Date | null) => setStartDate(date)} 
                    />
                    
                </div>
                <div>
                    <label  className={classes.label}>{t('homePage.reservation.form.num.name')} </label>
                    <input className='max-w-20 block border px-2 py-2' type="number" placeholder='2' name="people" />
                 </div>
                <div>
                    <label  className={classes.label}>{t('homePage.reservation.form.parking.name')}</label>
                    <select className='border w-fit px-2 py-2 block' name="parking">
                        <option value="saab" selected>{t('homePage.reservation.form.parking.option1')}</option>
                        <option value="volvo">{t('homePage.reservation.form.parking.option2')}</option>
                    </select>
                 </div>
            </div>
           
            <div>
                <label className={classes.label}>{t('homePage.reservation.form.menu.name')}</label>
                <textarea className='border px-2 py-2 block w-full min-h-10' placeholder={t('homePage.reservation.form.menu.placeholder') + ''} name="menu" />
            </div>
            <div>
                <label className={classes.label}>{t('homePage.reservation.form.other.name')}</label>
                <textarea placeholder={t('homePage.reservation.form.other.placeholder') + ''} className='border px-2 py-2 block w-full' name="message" />
            </div>
            <button className='w-full flex gap-2 items-center justify-center bg-blue-950 text-white py-4 hover:opacity-60 duration-300'>
            {t('homePage.reservation.reserveBtn')}
            </button>
        </form>
    );
};

export default Email;
