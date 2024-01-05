function set(key, value) {
  //@ts-ignore
  localforage.config({
    //@ts-ignore
    driver: localforage.INDEXEDDB,
    name: "Nebula",
    version: 1.0,
    storeName: "nebula_config",
    description: "Nebula Config for things reliant on IndexedDB"
  });
  //@ts-ignore
  localforage.setItem(key, value);
}
async function get(key) {
  //@ts-ignore
  localforage.config({
    //@ts-ignore
    driver: localforage.INDEXEDDB,
    name: "Nebula",
    version: 1.0,
    storeName: "nebula_config",
    description: "Nebula Config for things reliant on IndexedDB"
  });
  //@ts-ignore
  return await localforage.getItem(key);
}

export { set, get };
