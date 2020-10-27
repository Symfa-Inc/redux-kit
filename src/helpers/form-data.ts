import FormData from 'form-data';

export const getFormData = (body: any) => {
  const formData = new FormData();

  Object.keys(body).forEach(key => {
    const isArray = Array.isArray(body[key]);
    if (isArray) {
      body[key].forEach((i: any) => formData.append(`${key}[]`, i));
    }
    return typeof body[key] !== 'undefined' && !isArray && formData.append(key, body[key]);
  });

  return formData;
};
