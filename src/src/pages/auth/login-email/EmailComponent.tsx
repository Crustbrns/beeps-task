import { Button, Checkbox, Input, Select, Space, Typography } from "antd";
import AllgemeinComponent from "../allgemein-component/AllgemeinComponent";
import React from "react";
import validator from "validator";
import ErrorMessage from "../../../components/error/ErrorMessage";
import { RequestEmail } from "../../../api/fetchdata";
import axiosClient from "../../../api/axios";
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined } from "@ant-design/icons";
import { Org, ResponseTypeSignin } from "../../../api/types/types";

function EmailComponent() {
  const [step, setStep] = React.useState(0);
  const [email, setEmail] = React.useState("");
  const [orgs, setOrgs] = React.useState(Array<Org>());
  const [choosedOrg, setChoosedOrg] = React.useState('');
  const [passwort, setPasswort] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setEmail(e.target.value);
  };

  const handlePasswortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswort(e.target.value);
    setError('');
  };

  const handlePasswort = async () => {
      if(passwort.length > 0) {
      setLoading(true);
    }
    else {
    setLoading(false);
    setError("Ungültiges Passwort")
  }
}

    const handleKeyPress = (e : React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin()
    }
  }

  const handleKeyPressPasswort = (e : React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handlePasswort()
    }
  }
  
  const handleLogin = async () => {
    if (validator.isEmail(email)) {
      setLoading(true);

      const data: RequestEmail = {
        email: email,
      };

      axiosClient.post("/SignInOrgs", data).then(
        (response) => {
          console.log(response);
          const data: ResponseTypeSignin = response.data;
          if (data !== null && data.data.orgs.length == 0) {
            setError('E-Mail nicht gefunden');
          } else {
            setOrgs(data.data.orgs);
            setChoosedOrg(data.data.orgs[0].id);
            setStep(1);
          }
          setLoading(false);
        },
        (error) => {
          setError(error);
        }
      );
    } else setError("Ungültige E-Mail-Adresse");
  };

  const StepEmail = () => {
    return (
    <AllgemeinComponent>
      <Space direction="vertical" className="mt-3 mb-14 p-3">
        <Typography.Text className="font-bold" style={{ fontSize: 20 }}>
          1. Melde dich an, um fortzufahren.
        </Typography.Text>
        <div className="mt-4 w-full text-start">
          <Typography.Text style={{ fontSize: 12 }}>
            E-Mail-Adresse
          </Typography.Text>
          <Input
            value={email}
            onChange={(e) => handleEmailChange(e)}
            onKeyDown={handleKeyPress}
            placeholder="Deine E-Mail"
          />
          <ErrorMessage text={error} />
        </div>
        <Button
          disabled={loading}
          loading={loading}
          onKeyDown={e => e.key === 'Enter' ? handleLogin : ''}
          onClick={handleLogin}
          className="w-full mt-4"
          style={{ backgroundColor: "#15cdb9", height: 40 }}
        >
          Weiter zum Passwort
        </Button>
        <Space className="w-full">
          <Checkbox></Checkbox>
          <Typography.Text>Angemeldet bleiben</Typography.Text>
        </Space>
      </Space>
    </AllgemeinComponent>
    )
  }

  const StepOrg = () => {
    return (
    <AllgemeinComponent>
      <Space direction="vertical" className="mt-3 mb-14 p-3">
        <Typography.Text className="font-bold" style={{ fontSize: 18 }}>
        {orgs.length > 1 ? "2. Mit welcher Organisation meldest du dich an?" :"2. Gebe dein Passwort ein, um dich anzumelden."}
        </Typography.Text>
        <div className="mt-4 w-full text-start">
         <div className="mb-2">
         {orgs.length > 1 && <Select 
         placeholder="Organisation auswählen" 
         className="w-full" 
         value={choosedOrg}
         onChange={(e)=>setChoosedOrg(e)}
         options={orgs.map((org)=>({ value: org.id, label: <span>{org.name}</span> }))} />}
         </div>
        <Typography.Text style={{ fontSize: 12 }}>
            Passwort
          </Typography.Text>
          <Input.Password
            onKeyDown={handleKeyPressPasswort}
            value={passwort}
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            onChange={(e) => handlePasswortChange(e)}
            placeholder="Dein Passwort"
          />
          <ErrorMessage text={error} />
        </div>
        <Button
          disabled={loading}
          loading={loading}
          onClick={handlePasswort}
          className="w-full mt-4"
          icon={<LockOutlined/>}
          style={{ backgroundColor: "#15cdb9", height: 40 }}
        >
          Anmelden
        </Button>
        <Space className="w-full">
          <Checkbox></Checkbox>
          <Typography.Text>Angemeldet bleiben</Typography.Text>
        </Space>
      </Space>
    </AllgemeinComponent>
    )
  }

  return (<>
    {/* {StepEmail()} */}
    {step === 0 ? StepEmail(): StepOrg()}
    </>
  )
}

export default EmailComponent;
