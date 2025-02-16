import { Button, Space, Typography } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import AllgemeinComponent from "../allgemein-component/AllgemeinComponent";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../App";

function LoginCompany() {
  const context = useContext(AuthContext);
  const [loading, setLoading] = useState(false);    

  //clear token and make a person log out
  const handleLogout = () => {
    setLoading(true);
    context!.logout();
    setLoading(false);
  }

  return (
    <AllgemeinComponent> 
        <Space direction="vertical" className="p-4">
            <CheckOutlined className="text-2xl p-3 rounded-full bg-lime-500" style={{color: 'white'}}/>
            <Typography.Text className="font-bold" style={{fontSize: 18}}>
                Du bist erfolgreich abgemeldet.
            </Typography.Text>
            <Button loading={loading} onClick={handleLogout} className="w-full mt-6 mb-16" style={{ backgroundColor: "#15cdb9", height: 40 }} >
                Zum Login
            </Button>
        </Space>
    </AllgemeinComponent>
  );
}

export default LoginCompany;