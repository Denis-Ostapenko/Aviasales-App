/* eslint-disable arrow-body-style */
/* eslint-disable spaced-comment */
class ApiServise {
  async getKey() {
    const api = await fetch('https://aviasales-test-api.kata.academy/search').then((res) => {
      if (!res.ok) {
        throw new Error(`error fetch URL`);
      }
      return res.json();
    });
    return api.searchId;
  }

  async getTickets(searchId) {
    try {
      const body = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`).then((res) => {
        if (!res.ok) {
          throw new Error(`error fetch URL`);
        }
        return res.json();
      });
      return body;
    } catch {
      return { tickets: [], stop: false };
    }
  }
}

const apiServise = new ApiServise();

export default apiServise;
