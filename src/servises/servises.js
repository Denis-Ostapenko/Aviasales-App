/* eslint-disable arrow-body-style */
/* eslint-disable spaced-comment */
class ApiServise {
    async getKey() {
        const api = await fetch('https://front-test.beta.aviasales.ru/search')
            .then(res => {
                if (!res.ok) {
                    throw new Error(`error fetch URL`);
                }
                return res.json()
            })
        return api.searchId
    }

    async getTickets(searchId) {
        try {
            const body = await fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`)
                .then((res) => res.json());
            return body;
        } catch {
            const body = await fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`)
                .then((res) => res.json());
            return body;
            //Если надо получить всю пачку билетов
            //return []
        }
    }
}

const apiServise = new ApiServise();

export default apiServise;