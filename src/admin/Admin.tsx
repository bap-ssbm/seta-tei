import md5 from "md5";
import { FormEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState<boolean>(false);
  const [date, setDate] = useState<string>("");
  const [lunchBlock, setLunchBlock] = useState<boolean>(false);
  const [dinnerBlock, setDinnerBlock] = useState<boolean>(false);
  const handleLoad = () => {
    const visitedKey = window.localStorage.getItem('seta-tei_login');
    if (visitedKey == 'logined') {
      setLogin(true);
    } else {
      setLogin(false);
      navigate('/login');
    }
};

  useEffect(() => {
    handleLoad();
  }, []);

const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const year = date.split('-')[0];
    const month = date.split('-')[1];
    const day = date.split('-')[2];
    console.log(year, month, day, lunchBlock, dinnerBlock);
    const data =  { year: year, month: month, day: day, lunch: !lunchBlock, dinner: !dinnerBlock };
}


    return (
      <div className=" h-screen">
     {
        login && (
            <div>
                <h1 className="text-medium font-bold">予約修正</h1>
                <form className="flex flex-col gap-2 mt-5" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                    <input className="border border-gray-300 rounded-md p-2" title="date" name="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <input type="checkbox" name="lunchBlock" id="lunchBlock" checked={lunchBlock} onChange={(e) => setLunchBlock(e.target.checked)} />
                            <label htmlFor="lunchBlock">ランチブロック</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" name="dinnerBlock" id="dinnerBlock" checked={dinnerBlock} onChange={(e) => setDinnerBlock(e.target.checked)} />
                            <label htmlFor="dinnerBlock">ディナーブロック</label>
                        </div>
                    </div>
                    <button className="bg-blue-500 text-white rounded-md p-2" type="submit">submit</button>
                </form>
                <div>
                    <h2 className="text-medium font-bold">予約リスト、取り消し</h2>
                    
                </div>
            </div>
        ) 
     }
      </div>
  
  );
};

export default Login;
