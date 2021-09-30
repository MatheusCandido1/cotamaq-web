export const isValidCPF = (value) => {
  if (!value) return false;
  const str = value.toString();
  let strCpf = str.replace(/[-./]/g, "");

  if (!/[0-9]{11}/.test(strCpf)) return false;
  if (strCpf === "00000000000") return false;
  if (strCpf === "11111111111") return false;
  if (strCpf === "22222222222") return false;
  if (strCpf === "33333333333") return false;
  if (strCpf === "44444444444") return false;
  if (strCpf === "55555555555") return false;
  if (strCpf === "66666666666") return false;
  if (strCpf === "77777777777") return false;
  if (strCpf === "88888888888") return false;
  if (strCpf === "99999999999") return false;

  let sum = 0;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(strCpf.substring(i - 1, i)) * (11 - i);
  }

  let rest = sum % 11;

  if (rest === 10 || rest === 11 || rest < 2) {
    rest = 0;
  } else {
    rest = 11 - rest;
  }

  if (rest !== parseInt(strCpf.substring(9, 10))) {
    return false;
  }

  sum = 0;

  for (let i = 1; i <= 10; i++) {
    sum += parseInt(strCpf.substring(i - 1, i)) * (12 - i);
  }
  rest = sum % 11;

  if (rest === 10 || rest === 11 || rest < 2) {
    rest = 0;
  } else {
    rest = 11 - rest;
  }

  if (rest !== parseInt(strCpf.substring(10, 11))) {
    return false;
  }

  return true;
};

export const isValidCNPJ = (value) => {
  if (!value) return false;
  const str = value.toString();
  let cnpj = str.replace(/[-./]/g, "");

  if (cnpj === "") return false;
  if (cnpj.length !== 14) return false;
  if (
    cnpj == "00000000000000" ||
    cnpj == "11111111111111" ||
    cnpj == "22222222222222" ||
    cnpj == "33333333333333" ||
    cnpj == "44444444444444" ||
    cnpj == "55555555555555" ||
    cnpj == "66666666666666" ||
    cnpj == "77777777777777" ||
    cnpj == "88888888888888" ||
    cnpj == "99999999999999"
  )
    return false;

  let size = cnpj.length - 2;
  let numbers = cnpj.substring(0, size);
  let digits = cnpj.substring(size);
  let sum = 0;
  let pos = size - 7;
  for (let i = size; i >= 1; i--) {
    sum += numbers.charAt(size - i) * pos--;
    if (pos < 2) pos = 9;
  }
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result != digits.charAt(0)) return false;

  size = size + 1;
  numbers = cnpj.substring(0, size);
  sum = 0;
  pos = size - 7;
  for (let i = size; i >= 1; i--) {
    sum += numbers.charAt(size - i) * pos--;
    if (pos < 2) pos = 9;
  }
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result != digits.charAt(1)) return false;

  return true;
};
