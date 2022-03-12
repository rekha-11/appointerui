function ClassNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default ClassNames;
