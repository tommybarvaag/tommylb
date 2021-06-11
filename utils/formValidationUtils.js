export function validateEmail(mail) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(mail);
}

export function cleanTelephone(telephone) {
  const matcher = /\s+/g;
  return telephone?.replace(matcher, "");
}

export function validateTelephone(telephone) {
  const re = /^(0047|\+47|47)?[2-9]\d{7}$/;
  return re.test(cleanTelephone(telephone));
}
