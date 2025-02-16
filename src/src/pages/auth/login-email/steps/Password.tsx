import { Button, Checkbox, Input, Select, Space, Typography } from 'antd';
import React from 'react';
import AllgemeinComponent from '../../allgemein-component/AllgemeinComponent';
import ErrorMessage from '../../../../components/error/ErrorMessage';
import {
    EyeInvisibleOutlined,
    EyeTwoTone,
    LockOutlined,
  } from "@ant-design/icons";
import { Org } from '../../../../api/types/types';

type EmailProps = {
    passwort: string,
    orgs: Array<Org>,
    choosedOrg: string,
    setChoosedOrg: React.Dispatch<React.SetStateAction<string>>,
    handlePasswortChange:(e: React.ChangeEvent<HTMLInputElement>) => void,
    handleKeyPressPasswort: (e: React.KeyboardEvent) => void,
    handlePasswort: () => Promise<void>, 
    error: string,
    loading: boolean,
}

//and this is a second step when the person has to enter a password and if required - to pick an org
function Password({passwort, orgs, choosedOrg, setChoosedOrg, handlePasswortChange, handleKeyPressPasswort, handlePasswort, error, loading} : EmailProps) {
    return (
        <AllgemeinComponent>
          <Space direction="vertical" className="mt-3 mb-14 p-3">
            <Typography.Text className="font-bold" style={{ fontSize: 18 }}>
              {orgs.length > 1
                ? "2. Mit welcher Organisation meldest du dich an?"
                : "2. Gebe dein Passwort ein, um dich anzumelden."}
            </Typography.Text>
            <div className="mt-4 w-full text-start">
              <div className="mb-2">
                {orgs.length > 1 && (
                  <Select
                    placeholder="Organisation auswählen"
                    className="w-full"
                    value={choosedOrg}
                    onChange={(e) => setChoosedOrg(e)}
                    options={orgs.map((org) => ({
                      value: org.id,
                      label: <span>{org.name}</span>,
                    }))}
                  />
                )}
              </div>
              <Typography.Text style={{ fontSize: 12 }}>Passwort</Typography.Text>
              <Input.Password
                onKeyDown={handleKeyPressPasswort}
                value={passwort}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
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
              icon={<LockOutlined />}
              style={{ backgroundColor: "#15cdb9", height: 40 }}
            >
              Anmelden
            </Button>
            <div className="w-full">
              <div className="flex flex-1 w-full items-center justify-between">
                <div className="flex items-center gap-2"> 
                    <Checkbox></Checkbox>
                    <div style={{fontSize: 12}}>Angemeldet bleiben</div>
                </div>
                    <div style={{fontSize: 12, textDecoration: 'underline'}}>Passwort vergessen?</div>
              </div>
            </div>
          </Space>
        </AllgemeinComponent>
      );
}

export default Password;