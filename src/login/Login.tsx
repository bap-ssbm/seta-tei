import md5 from "md5";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";

const Login: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hashedPassword = "27c4d32b69fc76d89e0e077c933c85f6";

      console.log(md5(password));
      if (md5(password) === hashedPassword) {
        navigate('/admin');
        window.localStorage.setItem('seta-tei_login', 'logined');
      } else {
        alert('パスワードが間違っています');
      }
  };

    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <form onSubmit={handleSubmit}>
          <input title="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="border border-gray-300 w-full rounded-md p-2" />
          <button type="submit" className="bg-blue-500 mt-5 text-white w-full rounded-md p-2">Login</button>
        </form>
      </div>
  
  );
};

export default Login;
