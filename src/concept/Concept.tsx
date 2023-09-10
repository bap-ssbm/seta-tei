import ConceptIntro from './components/ConceptIntro';
import Appeal from './components/ConceptAppeal';
import Showcase from './components/Showcase';

const Concept = () => {
    return (
        <div className=' grid place-content-center px-[3%] pt-10 pb-20'>
            <div className=' flex flex-col gap-10 items-center'>
                <ConceptIntro/>
                <Appeal/>
                <Showcase/>
            </div>
        </div>
    )
}

export default Concept