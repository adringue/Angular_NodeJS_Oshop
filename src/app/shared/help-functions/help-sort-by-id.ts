export let helpSortId = (a, b) => {
  const nameA = a._id; // ignore upper and lowercase
  const nameB = b._id; // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  // names must be equal
  return 0;
};
