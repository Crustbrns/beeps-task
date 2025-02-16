import React, { useContext } from "react";
import validator from "validator";
import { RequestAlles, RequestEmail } from "../../../api/fetchdata";
import axiosClient from "../../../api/axios";
import {
  Org,
  ResponseTypeAllesSignIn,
  ResponseTypeSignin,
} from "../../../api/types/types";
import { AxiosError } from "axios";
import { AuthContext } from "../../../../App";
import Email from "./steps/Email";
import Password from "./steps/Password";

function EmailComponent() {
  const [step, setStep] = React.useState(0);
  const [email, setEmail] = React.useState("");
  const [orgs, setOrgs] = React.useState(Array<Org>());
  const [choosedOrg, setChoosedOrg] = React.useState("");
  const [passwort, setPasswort] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  //To obtain auth context and make changes to token and authorization
  const context = useContext(AuthContext);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setEmail(e.target.value);
  };

  const handlePasswortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswort(e.target.value);
    setError("");
  };

  //Try to sign in to check orgs
  const handleLogin = async () => {
    if (validator.isEmail(email)) {
      setLoading(true);

      const data: RequestEmail = {
        email: email,
      };

      axiosClient.post("/SignInOrgs", data).then(
        (response) => {
          const data: ResponseTypeSignin = response.data;
          if (response.status === 200) {
            setOrgs(data.data.orgs);
            setChoosedOrg(data.data.orgs[0].id);
            setStep(1);
          } else {
            setError("E-Mail nicht gefunden");
          }
          setLoading(false);
        },
        (error) => {
          setLoading(false);
          setError(error);
        }
      );
    } else setError("Ungültige E-Mail-Adresse");
  };

  //Try to sign in with pass
  const handlePasswort = async () => {
    if (passwort.length > 0) {
      setLoading(true);

      const data: RequestAlles = {
        email: email,
        password: passwort,
        orgId: choosedOrg,
      };

      axiosClient.post("/SignIn", data).then(
        (response) => {
          const data: ResponseTypeAllesSignIn = response.data;
          if (response.status === 200) {
            context!.login(data.data.token);
            setStep(3);
          } else {
            setError("Ungültiges Passwort");
          }
          setLoading(false);
        },
        (error: AxiosError) => {
          setLoading(false);
          if (error.status === 401) {
            setError("Ungültiges Passwort");
          } else if (error.status === 502) {
            setError("Server is not responding");
          }
          console.log(error);
        }
      );
    } else {
      setLoading(false);
      setError("Ungültiges Passwort");
    }
  };

  //To sign in with enter btn ;b
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  //The same as upper but for another field
  const handleKeyPressPasswort = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handlePasswort();
    }
  };

  return (
    <>
      {step === 0 ? (
        <Email
          email={email}
          handleEmailChange={handleEmailChange}
          handleKeyPress={handleKeyPress}
          handleLogin={handleLogin}
          error={error}
          loading={loading}
        />
      ) : (
        <Password
          passwort={passwort}
          orgs={orgs}
          choosedOrg={choosedOrg}
          setChoosedOrg={setChoosedOrg}
          handlePasswort={handlePasswort}
          handlePasswortChange={handlePasswortChange}
          handleKeyPressPasswort={handleKeyPressPasswort}
          error={error}
          loading={loading}
        />
      )}
    </>
  );
}

export default EmailComponent;
