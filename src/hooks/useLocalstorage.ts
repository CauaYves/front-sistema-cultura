"use client";
function SetData(key: string, value: string) {
  const data = { [key]: value };

  const jsonData = JSON.stringify(data);

  localStorage.setItem(key, jsonData);
}

function getData(key: string) {
  const storedData = localStorage.getItem(key);

  if (storedData) {
    return JSON.parse(storedData);
  } else {
    return null;
  }
}
function removeData(key: string) {
  localStorage.removeItem(key);
}

const appLocalStore = {
  SetData,
  getData,
  removeData,
};

export { appLocalStore };
