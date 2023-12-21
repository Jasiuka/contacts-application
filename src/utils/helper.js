export const separateResponsesData = (responsesArray) => {
    const extractedObject = {};
    responsesArray.forEach((response) => {
        extractedObject[response.data.items[0].collectionName] =
            response.data.items;
    });

    return extractedObject;
};

export const createObjectFromInputsArray = (inputsArray) => {
    const obj = {};
    Array.from(inputsArray).forEach((input) => {
        if (input.value && input.value !== "0") {
            obj[input.name] = input.value;
        }
    });

    return obj;
};

export const createFormDataFromInputsArray = (inputsArray) => {
    const formData = new FormData();
    Array.from(inputsArray).forEach((input) => {
        if (input.value && input.value !== "0") {
            if (input.name === "photo") {
                formData.append(input.name, input.files[0]);
            } else {
                formData.append(input.name, input.value);
            }
        }
    });

    return formData;
};
