import axios from 'axios';


export function factpost(url, data) {
  return axios.post(url, data, {
    headers: { "X-CSRF-Token": window.localStorage.getItem("_t__k___") }
  })
}

export function factget(url, parma) {
  return axios.get(url, { parmas: parma }, {
    headers: { "X-CSRF-Token": window.localStorage.getItem("_t__k___") }
  })
}

export function factdel(url, parma) {
  return axios.delete(url, {
    parmas: parma,
    headers: {
      "X-CSRF-Token": window.localStorage.getItem("_t__k___")
    }
  })
}
export function factpatch(url, data) {
  return axios.patch(url, data, {
    headers: { "X-CSRF-Token": window.localStorage.getItem("_t__k___") }
  })
}


export default {
  factpost, factget, factdel, factpatch
}

