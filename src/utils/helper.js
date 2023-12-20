export const separateResponsesData = (responsesArray) => {
    const extractedObject = {};
    responsesArray.forEach((response) => {
        extractedObject[response.data.items[0].collectionName] =
            response.data.items;
    });

    return extractedObject;
};
