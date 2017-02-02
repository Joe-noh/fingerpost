export function upcase(string) {
  return string.toUpperCase();
}

export function definitionId(ref) {
  return `#${definitionModelName(ref)}`;
}

export function definitionModelName(ref) {
  if (ref) {
    let splitted = ref.split('/');
    let modelName = splitted[splitted.length - 1];

    return modelName;
  } else {
    return "";
  }
}
