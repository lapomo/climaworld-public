import { Auth } from "aws-amplify";
import { Amplify } from "aws-amplify";
import config from "../aws-exports";
Amplify.configure(config);

const currentUser = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    console.log("authenticated user");
    // console.log(JSON.stringify(user));
    return user;
  } catch (error) {
    console.log("error getting the current user: ", error);
  }
  return false;
};

const signup = async (username, password, email) => {
  try {
    const result = await Auth.signUp({
      username: username,
      password: password,
      attributes: {
        email: email,
        // preferred_username: prefUsername,
        // phone_number,   // optional - E.164 number convention
        // other custom attributes
      },
      autoSignIn: {
        // optional - enables auto sign in after user is confirmed
        enabled: true,
      },
    });
    console.log(result);
    return result;
  } catch (error) {
    console.log("error signing up:", error);
    throw error;
  }
};

const resendSignup = async (username) => {
  try {
    const result = await Auth.resendSignUp(username);
    console.log("code resent successfully");
    return result;
  } catch (err) {
    console.log("error resending code: ", err);
    throw err;
  }
};

// for confirming mail address
// (username: string, code: string, options?: ConfirmSignUpOptions): Promise<any>
const confirmSignup = async (username, code) => {
  try {
    const result = await Auth.confirmSignUp(username, code);
    
    return result;
  } catch (error) {
    console.log({ error });
    throw error;
  }
};

// (usernameOrSignInOpts: string | SignInOpts, pw?: string, clientMetadata?: ClientMetaData): Promise<CognitoUser | any>
const signin = async (username, password) => {
  try {
    const user = await Auth.signIn(username, password);
    console.log("Successfully logged in");
    // console.log(user);
    return user;
  } catch (error) {
    console.log("error signing in", error);
    throw error;
  }
};

const signout = async () => {
  try {
    await Auth.signOut();
    console.log("signed out");
  } catch (error) {
    console.log("error signing out: ", error);
    throw error;
  }
};

// (username: string, clientMetadata?: ClientMetaData): Promise<any>
const forgotPassword = (username) =>
  Auth.forgotPassword(username)
    .then((data) => {
      console.log("forgot password successful");
      // console.log(data);
      return data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

const forgotPasswordSubmit = (username, code, password) =>
  Auth.forgotPasswordSubmit(username, code, password)
    .then((data) => {
      // console.log(data);
      return data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

const deleteUser = () => {
  try {
    const result = Auth.deleteUser();
    // console.log(result);
    return result;
  } catch (error) {
    console.error('Error deleting user: ', error);
    throw error;
  }
}

// (user: CognitoUser | any, attributes: object, clientMetadata?: ClientMetaData): Promise<string>
const updateUser = (user, attributes) => {
  try {
    return Auth.updateUserAttributes(user, attributes)
  } catch(error) {
    console.error('Error updating user attributes: ', error);
    throw error;
  }
}

// (user: CognitoUser | any, oldPassword: string, newPassword: string, clientMetadata?: ClientMetaData): Promise<"SUCCESS">
const updatePassword = Auth.changePassword;

export const userFunc = {
  currentUser,
  signup,
  resendSignup,
  confirmSignup,
  signin,
  signout,
  forgotPassword,
  forgotPasswordSubmit,
  deleteUser,
  updateUser,
  updatePassword,
};
