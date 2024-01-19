export function validateEmail(email) {
    // TODO: remove white spaces before check
    let res = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return res.test(email);
  }

export function validatePassword(password) {
  if(password.length >= 8){
    let res = /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/
    return res.test(password)
  } else {
    return false
  }
}