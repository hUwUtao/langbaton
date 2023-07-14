type KV = { [k: string]: any };
type MapableKV = { key: string; value: string }[];
type FunctionKV = { [k: string]: (value: any) => string };
// function kvmap(obj: StringKV): MapableKV {
//   return Object.keys(obj).map((key) => ({ key, value: obj[key] }));
// }
// function renameKey(obr: MapableKV, map: StringKV) {
//   return
// }
const self = (v: string) => v;
const kvmap = (o: KV): MapableKV =>
    Object.keys(o).map((k) => ({ key: k, value: o[k] })),
  kmap = (o: MapableKV, remap: KV): MapableKV =>
    o.map(({ key: k, value }) => ({
      key: remap[k] || k,
      value,
    })),
  vmap = (o: MapableKV, remap: FunctionKV): MapableKV =>
    o.map(({ key, value: v }) => ({
      key,
      value: (remap[key] || self)(v),
    }));
export { kvmap, kmap, vmap };
