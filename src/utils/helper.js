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

export const createValuesArrayFromNodeList = (nodeList, ...exceptions) => {
    const inputValues = [];
    nodeList.forEach((node) => {
        if (!exceptions.includes(node.name)) {
            inputValues.push(node.value);
        }
    });
    return inputValues;
};

export const createObjectWithOldAndNewValues = (
    inputsNodeList,
    obj,
    customInputs
) => {
    const nObj = {};

    inputsNodeList.forEach((node) => {
        nObj[node.name] = {
            newVal: node.value,
            oldVal: obj[node.name],
        };
    });

    customInputs.forEach((input) => {
        nObj[input.name] = {
            newVal: input.value,
            oldVal: obj[input.name],
        };
    });

    return nObj;
};

export const createStructureObject = (structureArray, structureName) => {
    if (structureArray) {
        const fixedStructure = structureArray.map((structure) => {
            return {
                name: structure.expand[`${structureName}_id`].name,
                id: structure.expand[`${structureName}_id`].id,
            };
        });
        return fixedStructure;
    } else {
        return [];
    }
};

export const createFetchUrlWithFilters = (base, filters = {}) => {
    let url = base;
    for (const key in filters) {
        if (!filters[key]) {
            delete filters[key];
        }
    }
    const arrayOfObject = Object.keys(filters);
    if (!arrayOfObject.length) {
        return url;
    }
    url = url + "&&filter=(";

    url = arrayOfObject.reduce((acc, key, index) => {
        if (index === 0) {
            return acc.concat(`${key}='${filters[key]}'`);
        } else {
            return acc.concat(" %26%26 ", `${key}='${filters[key]}'`);
        }
    }, url);

    return url + ")";
};
