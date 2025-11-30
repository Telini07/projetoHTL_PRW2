export const isValidCPFFormat = (cpf: string): boolean => {
  if (!cpf) return true;
  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  return cpfRegex.test(cpf);
};

export const formatCPF = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  
  if (numbers.length > 11) return value;
  
  if (numbers.length <= 3) {
    return numbers;
  } else if (numbers.length <= 6) {
    return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
  } else if (numbers.length <= 9) {
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
  } else {
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9)}`;
  }
};

export const isValidPhoneFormat = (phone: string): boolean => {
  if (!phone) return true;
  const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
  return phoneRegex.test(phone);
};

export const formatPhone = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  
  if (numbers.length > 11) return value;
  
  if (numbers.length <= 2) {
    return numbers.length > 0 ? `(${numbers}` : '';
  } else if (numbers.length <= 6) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  } else if (numbers.length <= 10) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
  } else {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
  }
};

export const validateCPFAndPhone = (cpf: string, phone: string): { cpf: string[]; phone: string[] } => {
  const messages = { cpf: [] as string[], phone: [] as string[] };

  if (cpf && !isValidCPFFormat(cpf)) {
    messages.cpf.push('CPF deve estar no formato: XXX.XXX.XXX-XX');
  }

  if (phone && !isValidPhoneFormat(phone)) {
    messages.phone.push('Telefone deve estar no formato: (XX) 9XXXX-XXXX ou (XX) XXXX-XXXX');
  }

  return messages;
};
