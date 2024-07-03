// Reactivity in Vue.js is made through proxies

const project = {
  id: 1,
  description: "Alura Tracker",
}

const proxy = new Proxy(project, {
  get(obj, key) {
    console.log(`Someone asked the project key '${key}'.`);
    return obj[key];
  },
  set(obj, key, value) {
    console.log(`Someone changed the project key to '${key}'.`);
    obj[key] = value;
  }
})

console.log(proxy.description)
