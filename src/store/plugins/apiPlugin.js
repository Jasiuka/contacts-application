import axios from "axios";

export default function (store) {
    store.server = axios.create({ baseURL: SERVER_ADDRESS });

    store.dataGet = async function (path) {
        try {
            const response = await this.server.get(path);
            return response;
        } catch (error) {
            throw new Error(
                "There was an error while fetching data from the server"
            );
        }
    };

    store.dataPost = async function (path, dataToPost) {
        try {
            const response = await this.server.post(path, dataToPost);
            return response;
        } catch (error) {
            throw new Error(
                "There was an error while posting data to the server"
            );
        }
    };

    store.dataPatch = async function (path, dataToUpdateId, updatedData) {
        try {
            const response = await this.server.patch(
                `${path}/${dataToUpdateId}`,
                updatedData
            );
            return response;
        } catch (error) {
            throw new Error("There was an error while updating data");
        }
    };

    store.dataDelete = async function (path, dataToDeleteId) {
        try {
            const response = await this.server.delete(
                `${path}/${dataToDeleteId}`
            );
            return response;
        } catch (error) {
            throw new Error("There was an error while deleting data");
        }
    };
}
