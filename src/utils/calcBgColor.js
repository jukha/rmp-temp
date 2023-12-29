export function getBgColor(rating) {
  switch (parseInt(rating)) {
    case 5:
      return "#ADD8E6";
    case 4:
      return "#90EE90";
    case 3:
      return "#BFBFA2";
    case 2:
      return "#FFD700";
    default:
      return "#FFB6C1";
  }
}
