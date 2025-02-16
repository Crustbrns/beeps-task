import { Button, Image, Space } from "antd";
import logo from "../../../assets/logo.svg";
import { useNavigate } from "react-router-dom";


function HeaderComponent() {
  const navigate = useNavigate();
  const redirect = (path: string) => {
    navigate(path);
  };

  return (
    <>
    <div className="flex justify-between items-center p-4 bg-neutral-900">
        <Image src={logo}></Image>
        <Space className="flex items-center justify-center">
            <Button onClick={() => {redirect('/sign')}}>Anmelden</Button>
            <Button onClick={() => {redirect('/')}}>Registrieren</Button>
        </Space>
    </div>
    {/* <Outlet/> */}
    </>
  );
}

export default HeaderComponent;
