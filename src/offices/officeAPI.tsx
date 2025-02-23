import { Office } from "./Office";

const baseUrl = "http://localhost:4000";
const url = `${baseUrl}/offices`;

function translateStatusToErrorMessage(status: number): string {
  switch (status) {
    case 401:
      return "Please login again.";
    case 403:
      return "You do not have permission to view the office(s).";
    default:
      return "There was an error retrieving the office(s). Please try again.";
  }
}
function checkStatus(response: Response): Response {
  if (response.ok) {
    return response;
  } else {
    const httpErrorInfo = {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
    };
    console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);
    const errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
    throw new Error(errorMessage);
  }
}

function parseJSON<T>(response: Response): Promise<T> {
  return response.json() as Promise<T>;
}
function delay<T>(ms: number): (x: T) => Promise<T> {
  return (x: T) => new Promise((resolve) => setTimeout(() => resolve(x), ms));
}
function convertToOfficeModels(data: unknown[]): Office[] {
  return data.map((item) => convertToOfficeModel(item));
}

function convertToOfficeModel(item: unknown): Office {
  if (typeof item === "object" && item !== null && "id" in item) {
    return new Office(item as Office);
  }
  throw new Error("Invalid Office data format.");
}

const officeAPI = {
  get(page = 1, limit = 12): Promise<Office[]> {
    return fetch(`${url}?_page=${page}&_limit=${limit}&_sort=name`)
      .then(delay<Response>(200))
      .then(checkStatus)
      .then(parseJSON<Office[]>)
      .then(convertToOfficeModels)
      .catch((error: TypeError) => {
        console.log("log client error " + error);
        throw new Error("There was an error retrieving the offices. Please try again.");
      });
    
  },

  find(id: number): Promise<Office> {
    return fetch(`${url}/${id}`)
      .then(checkStatus)
      .then(parseJSON<Office>)
      .then(convertToOfficeModel);
  },

  put(office: Office): Promise<Office> {
    return fetch(`${url}/${office.id}`, {
      method: "PUT",
      body: JSON.stringify(office),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(delay<Response>(200))
      .then(checkStatus)
      .then(parseJSON<Office>)
      .catch((error: TypeError) => {
        console.log("log client error " + error);
        throw new Error("There was an error updating the office. Please try again.");
      });
  },
};

export { officeAPI };