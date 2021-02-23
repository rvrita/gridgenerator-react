export default function klarnaPayment(showKlarna, klarna) {
  return `${showKlarna ? `
  <span style="letter-spacing:0.01em; color:gray;"><br />Or pay in 4 interest-free payments of $${klarna}</span>` : ''}`;
}
