const currencyFormat = (price) => {
  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return USDollar.format(price);
};

export default currencyFormat;
