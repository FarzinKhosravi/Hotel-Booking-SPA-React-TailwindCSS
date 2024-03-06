export default function listSorter(list) {
  return list.sort((a, b) => {
    return a.id > b.id ? 1 : -1;
  });
}
