import axios from "axios";

export default function (store) {
    (store.server = axios.create({
        baseURL: BASE_API_URL,
        headers: {
            Authorization: "Bearer " + AUTH_TOKEN,
        },
    })),
        (store.dataGet = async function (path) {
            try {
                const response = await this.server.get(path);
                return response;
            } catch (error) {
                throw new Error("Įvyko klaida gaunant duomenis iš serverio");
            }
        }),
        (store.dataGetSingle = async function (path) {
            try {
                const response = await this.server.get(path);
                return response;
            } catch (error) {
                throw new Error("Įvyko klaida gaunant duomenis iš serverio");
            }
        }),
        (store.dataGetMultiple = async function (...paths) {
            try {
                const allResponses = await axios.all(
                    paths.map((path) => this.server.get(path))
                );
                return allResponses;
            } catch (error) {
                console.error(error);
                throw new Error("Įvyko klaida gaunant duomenis iš serverio");
            }
        }),
        (store.dataGetPerPage = async function (path, page) {
            try {
                const response = await this.server.get(`${path}/${page}`);
                return response;
            } catch (error) {
                throw new Error("Įvyko klaida gaunant duomenis iš serverio");
            }
        }),
        (store.dataPost = async function (path, dataToPost) {
            try {
                const response = await this.server.post(path, dataToPost);
                return response;
            } catch (error) {
                throw new Error("Įvyko klaida siunčiant duomenis į serverį");
            }
        });

    store.dataPatch = async function (path, dataToUpdateId, updatedData) {
        try {
            const response = await this.server.patch(
                `${path}/${dataToUpdateId}`,
                updatedData
            );
            return response;
        } catch (error) {
            throw new Error("Įvyko klaida atnaujinant duomenis serveryje");
        }
    };

    store.dataDelete = async function (path, dataToDeleteId) {
        try {
            const response = await this.server.delete(
                `${path}/${dataToDeleteId}`
            );
            return response;
        } catch (error) {
            throw new Error("Įvyko klaida naikinant duomenis");
        }
    };
}
