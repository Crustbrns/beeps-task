//Response when user logs in
export type ResponseTypeSignin = {
  data: {
    orgs: Org[];
  };
  error: string;
};

//Organisation
export type Org = {
    id: string,
    name: string
}