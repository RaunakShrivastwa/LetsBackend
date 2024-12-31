import formidable from "formidable";

const requestBody = (req) => {
  return new Promise((resolve, reject) => {
    const form = formidable();
    const parsedFields = {};

    form.on("field", (name, value) => {
      parsedFields[name] = value;
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject({ message: "Error parsing form data", error: err });
      }
      resolve({ fields: { ...fields, ...parsedFields }, files });
    });
  });
};

export default requestBody;
