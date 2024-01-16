import axios from "axios";

export default function (store) {
    (store.server = axios.create({
        baseURL: BASE_API_URL,
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
                const header = this.createHeader();
                const response = await this.server.post(
                    path,
                    dataToPost,
                    header
                );
                return response;
            } catch (error) {
                if (
                    error.response.data.data.name.code ===
                    "validation_not_unique"
                ) {
                    throw new Error("Klaida, toks įrašas jau egzistuoja");
                }
                if (error.message === "Network Error") {
                    throw new Error("Įvyko serverio klaida");
                }
                if (error.response.status === 401) {
                    throw new Error(error.response.status);
                }
                if (
                    error.response.data.message.includes(
                        "Failed to authenticate"
                    )
                ) {
                    throw new Error(error.response.data.message);
                } else {
                    throw new Error(
                        "Įvyko klaida siunčiant duomenis į serverį"
                    );
                }
            }
        });

    store.dataPatch = async function (path, dataToUpdateId, updatedData) {
        try {
            const header = this.createHeader();
            const response = await this.server.patch(
                `${path}/${dataToUpdateId}`,
                updatedData,
                header
            );
            return response;
        } catch (error) {
            if (
                error.response.data.data.name.code === "validation_not_unique"
            ) {
                throw new Error("Klaida, toks įrašas jau egzistuoja");
            }
            throw new Error("Įvyko klaida atnaujinant duomenis serveryje");
        }
    };

    store.dataDelete = async function (path, dataToDeleteId) {
        try {
            const header = this.createHeader();
            const response = await this.server.delete(
                `${path}/${dataToDeleteId}`,
                header
            );
            return response;
        } catch (error) {
            throw new Error("Įvyko klaida naikinant duomenis");
        }
    };

    store.createHeader = function () {
        const token = localStorage.getItem("token")
            ? localStorage.getItem("token")
            : "";
        return {
            headers: {
                Authorization: "Bearer " + token,
            },
        };
    };
}
