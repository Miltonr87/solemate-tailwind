import axios from "axios";

export const validateCep = (value) => {
  const sanitized = value.replace(/\D/g, "");
  return /^\d{8}$/.test(sanitized);
};

export const fetchCepData = async (cep) => {
  const sanitized = cep.replace(/\D/g, "");

  if (!validateCep(sanitized)) {
    throw new Error("Invalid CEP format");
  }

  try {
    const response = await axios.get(
      `https://viacep.com.br/ws/${sanitized}/json/`,
    );

    if (response.data.erro) {
      throw new Error("CEP not found");
    }

    return response.data;
  } catch {
    throw new Error("Error fetching CEP data");
  }
};
