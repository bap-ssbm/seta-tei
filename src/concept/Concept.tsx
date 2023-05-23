import ConceptIntro from './components/ConceptIntro';
import Appeal from './components/ConceptAppeal';

const Concept = () => {
    return (
        <div className=' grid place-content-center px-[3%] pt-10 pb-20'>
            <div className=' flex flex-col gap-10 items-center'>
                <ConceptIntro/>
                <Appeal/>
            </div>
        </div>
    )
}

export default Concept