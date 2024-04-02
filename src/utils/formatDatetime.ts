export default function formatDatetime(datetime: string) {
  const fusoDiferenceInHours = 3;
  const date = datetime.substring(8, 10);
  const month = datetime.substring(5, 7);
  const year = datetime.substring(0, 4);
  const hour = +datetime.substring(11, 13) - fusoDiferenceInHours;
  const minutes = datetime.substring(14, 16);
  const seconds = datetime.substring(17, 19);

  const formatedDate = `${date}/${month}/${year} ${hour}:${minutes}:${seconds}`;
  return formatedDate;
}
