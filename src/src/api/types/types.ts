//Response when user merely logs in to check organisations 
export type ResponseTypeSignin = {
  data: {
    orgs: Org[];
  };
  error: string;
};

//Response when user tries to log in with pass
export type ResponseTypeAllesSignIn = {
    data: {
        token: string
    };
    error: string;
}

//Organisation
export type Org = {
    id: string,
    name: string
}