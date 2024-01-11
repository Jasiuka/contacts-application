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

export const createFetchUrlWithFiltersAndSearch = (
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

export const addPaginationDataToUrl = (url, perPage, page) => {
    return `${url}&&perPage=${perPage}&&page=${page}`;
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

export const setLocalStorage = (key, value) => {
    const localStorageObj = {
        [key]: value,
    };
    localStorage.setItem(
        "contacts-application",
        JSON.stringify(localStorageObj)
    );
};

export const getFromLocalStorage = (key) => {
    const objectFromLocalStorage = JSON.parse(
        localStorage.getItem("contacts-application")
    );
    if (objectFromLocalStorage) {
        if (objectFromLocalStorage[key]) {
            return objectFromLocalStorage[key];
        }
    } else {
        return null;
    }
};

export const createStructureStringForWhat = (structure) => {
    if (structure === "offices") return "ofisą";
    if (structure === "divisions") return "padalinį";
    if (structure === "departments") return "skyrių";
    if (structure === "groups") return "grupę";

    return "Nėra struktūros";
};

export const createStructureStringForName = (structure) => {
    if (structure === "offices") return "Ofisas";
    if (structure === "divisions") return "Padalinio pavadinimas";
    if (structure === "departments") return "Skyriaus pavadinimas";
    if (structure === "groups") return "Grupės pavadinimas";

    return "Nėra struktūros";
};

export const createHigherStructureObject = (structure) => {
    if (structure === "offices") {
        return {
            nameInLT: "Įmonė",
            structureName: "company_id",
            placeholder: "įmonę",
            urlName: "companies",
        };
    }
    if (structure === "divisions") {
        return {
            nameInLT: "Ofisas",
            structureName: "office_id",
            placeholder: "ofisą",
            urlName: "offices",
        };
    }
    if (structure === "departments") {
        return {
            nameInLT: "Padalinys",
            structureName: "division_id",
            placeholder: "padalinį",
            urlName: "divisions",
        };
    }
    if (structure === "groups") {
        return {
            nameInLT: "Skyrius",
            structureName: "department_id",
            placeholder: "skyrių",
            urlName: "departments",
        };
    }

    return { error: "Nėra struktūros" };
};
