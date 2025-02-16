import { Button, Checkbox, Input, Space, Typography } from 'antd';
import React from 'react';
import AllgemeinComponent from '../../allgemein-component/AllgemeinComponent';
import ErrorMessage from '../../../../components/error/ErrorMessage';

export type EmailProps = {
    email:string,
    handleEmailChange:(e: React.ChangeEvent<HTMLInputElement>) => void,
    handleKeyPress: (e: React.KeyboardEvent) => void,
    handleLogin: () => Promise<void>, 
    error: string,
    loading: boolean,
}

function Email({email, handleEmailChange, handleKeyPress, handleLogin, error, loading} : EmailProps) {
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
              onKeyDown={(e) => (e.key === "Enter" ? handleLogin : "")}
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
      );
}

export default Email;