import { Button, Checkbox, Input, Space, Typography } from "antd";
import AllgemeinComponent from "../allgemein-component/AllgemeinComponent";
import React from "react";

function EmailComponent() {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  return (
    <AllgemeinComponent>
      <Space direction="vertical" className="mt-3 mb-14 p-3">
        <Typography.Text className="font-bold" style={{ fontSize: 20 }}>
          1. Melde dich an, um fortzufahren.
        </Typography.Text>
        <div className="mt-4 w-full text-start">
          <Typography.Text style={{ fontSize: 12 }}>
            E-Mail-Adresse {email}
          </Typography.Text>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Deine E-Mail"
          />
        </div>
        <Button
          loading={loading}
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

export default EmailComponent;
