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

export const createFetchUrlWithFilters = (
    base,
    filters = {},
    searchFields = [],
    searchQuery = ""
) => {
    let url = base;
    for (const key in filters) {
        if (!filters[key]) {
            delete filters[key];
        }
    }

    // If filters empty and no search query
    const arrayOfObject = Object.keys(filters);
    if (!arrayOfObject.length && !searchFields.length) {
        return url;
    }
    url = url + "&&filter=(";

    // if filters empty but search query exist
    if (!arrayOfObject.length && searchFields.length) {
        url = searchFields.reduce((acc, searchField, index) => {
            if (index === 0) {
                return acc.concat(`${searchField}~'${searchQuery}'`);
            } else {
                return acc.concat("%7C%7C", `${searchField}~'${searchQuery}'`);
            }
        }, url);
    }

    // if filter exist
    if (arrayOfObject.length) {
        url = arrayOfObject.reduce((acc, key, index) => {
            if (index === 0) {
                return acc.concat(`${key}='${filters[key]}'`);
            } else {
                return acc.concat(" %26%26 ", `${key}='${filters[key]}'`);
            }
        }, url);

        // add search query
        if (searchFields.length) {
            const query = `(${searchFields.reduce((acc, searchField, index) => {
                if (index === 0) {
                    return acc.concat(`${searchField}~'${searchQuery}' `);
                } else {
                    return acc.concat(
                        "%7C%7C ",
                        `${searchField}~'${searchQuery}'`
                    );
                }
            }, "")})`;
            url = url.concat(" %26%26 ", query);
        }
    }

    return url + ")";
};

export function debounce(func, delay = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}
