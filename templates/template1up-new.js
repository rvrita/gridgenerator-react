export default function template1up(products, showTags, showBrand, showKlarna) {
  return `<!-- grid gen -->
  <table width="700" border="0" cellspacing="0" cellpadding="0" align="center">
    <tr>
      <td style="padding-top: 50px;">
        <table width="500" border="0" cellspacing="0" cellpadding="0" align="center">
  ${products.map((p) => {
    const tags = p.tags.join('&nbsp;· ');
    // get price from '$10'
    const price = parseInt(p.price.slice(1), 10);
    // if klarna price rounded show it ($22) else always show 2 digits ($22.25 or $22.50)
    const klarna = price % 4 === 0 ? price / 4 : (price / 4).toFixed(2);
    return `
          <!-- next pick -->
          <tr>
            <td align="center">
              ${p.imageLink}
                <img alt="${p.productName}" border="0" height="450" src="https://www.sephora.com/productimages/sku/s${p.skuId}-main-hero.jpg?${p.badge.value}imwidth=450" style="display:block; margin: 10px 0;" width="450">
              </a>
            </td>
          </tr>
          <tr>
            <td align="center" style="line-height:25px;padding-bottom:10px;padding-top:10px;font-family:Helvetica, Arial, sans-serif; font-size:16px;">
            ${p.textLink}
                ${(showTags && p.tags) ? `
                <span style="color:#C0143C;letter-spacing:0.01em;line-height:25px;"><b>${tags}</b></span>
                ` : ''}
              </a>
            </td>
          </tr>
          <tr>
            <td align="center" style="line-height:25px;padding-bottom:25px;font-family:Helvetica, Arial, sans-serif; font-size:20px;">
            ${p.textLink}
                <span style="letter-spacing:0.01em; color:#000000;">
                ${showBrand ? `<b>${p.brandName}</b><br/>` : ''}${p.productName}, ${(p.salePrice) ? `<s>${p.price}</s> <span style="color:red">${p.salePrice}</span>` : p.price} ${p.valuePrice || ''}
                </span>
            ${showKlarna ? `
                <span style="letter-spacing:0.01em; color:gray;"><br />Or pay in 4 interest-free payments of $${klarna}</span><br />
                <img src="http://images.harmony.epsilon.com/ContentHandler/images?id=8fb824b4-e467-4831-b531-1e37d63881fd" width="76" height="30" border="0" style="display:block;">
                ` : ''}
              </a>
            </td>
          </tr>`;
  }).join('')}
        </table>
      </td>
    </tr>
  </table>
  `;
}
