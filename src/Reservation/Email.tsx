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
                <div>
                    <label className={classes.label}>{t('homePage.form.time.name')}</label>
                    <DatePicker 
                            name='date'
                            showTimeSelect
                            className='border px-2 py-2 block'
                            selected={startDate} 
                            dateFormat="Pp"
                            onChange={(date: Date | null) => setStartDate(date)} 
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
            <button className={'w-full flex gap-2 items-center justify-center bg-blue-950 text-white py-4 hover:opacity-60 duration-300' + (loading?' pointer-events-none':'')}>
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
