import { useTranslation } from 'react-i18next'
const LanguageBtn = ({ }) => {
    const {i18n} = useTranslation()
    return (
        <button className=' z-[100] bg-black text-white py-3 px-5 hover:scale-105 duration-300 shadow-md fixed bottom-0 right-0' onClick={() => i18n.changeLanguage(i18n.language === "ja" ? "en" : "ja")}>
            En/Jp
        </button>
    )
}
export default LanguageBtn