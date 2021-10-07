import sweetAlertSvc from "./sweetAlert";

class HttpService {
  async get(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data.data;
  }
  async getOne(url, id) {
    const res = await fetch(`${url}/${id}`);
    const data = await res.json();
    return data.data;
  }
  async post(url, data) {
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((e) => {
        sweetAlertSvc.sweetAdded();
      })
      .catch((e) => sweetAlertSvc.sweetError(e));
  }
  async delete(url, id) {
    const confirm = await sweetAlertSvc.sweetQuestionDelete();
    if (confirm) {
      await fetch(`${url}/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          sweetAlertSvc.sweetDeleted();
        })
        .catch((err) => {
          sweetAlertSvc.sweetError();
        });
    }
  }

  async put(url, id, data) {
    fetch(`${url}/${id}`, {
      method: "PUT", 
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        sweetAlertSvc.sweetUpdated()
      })
      .catch((error) => {
        sweetAlertSvc.sweetError(error)
      })

  }
}

const httpService = new HttpService();
export default httpService;
