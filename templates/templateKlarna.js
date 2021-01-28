export default function templateKlarna(showKlarna, klarna) {
  return `${showKlarna ? `
    <span style="letter-spacing:0.01em; color:gray;"><br />Or pay in 4 interest-free payments of $${klarna}</span><br />
    <img src="http://images.harmony.epsilon.com/ContentHandler/images?id=8fb824b4-e467-4831-b531-1e37d63881fd" width="76" height="30" border="0" style="display:block;">
    ` : ''}`;
}
