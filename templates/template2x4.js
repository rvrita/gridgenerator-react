/* eslint-disable no-else-return */
export default function template2x4(products, showTags, showBrand) {
  return `<!-- grid gen -->
  <table width="700" border="0" cellspacing="0" cellpadding="0" align="center">
    <tr>
      <td style="padding-top: 50px;">
        <table width="700" border="0" cellspacing="0" cellpadding="0" align="center">
  ${products.map((p, index) => {
    if (index % 2 === 0) {
      return `
        <tr>
          <td valign="top">
            <table width="280" border="0" cellspacing="0" cellpadding="0" align="center">
              <tr>
                <td valign="top">
                  ${p.imageLink}
                    <img alt="${p.productName}" border="0" height="280" src="https://www.sephora.com/productimages/sku/s${p.skuId}-main-hero.jpg?${p.badge.value}imwidth=450" style="display:block; margin: 10px 0;" width="280"/>
                  </a>
                </td>
              </tr>
              <tr>
                <td style="line-height:25px;padding-bottom:70px;padding-top:25px;font-family:Helvetica, Arial, sans-serif; font-size:20px;">
                  ${p.textLink}
                  ${(showTags && p.tags) ? `
                    <span style="color:#C0143C; letter-spacing:0.1em;line-height:25px;"><b>${p.tags}</b></span><br/>
                    <span style="line-height:20px;"><b>&nbsp;</b></span><br/>
                    ` : `
                    <span style="line-height:45px;"><b>&nbsp;</b></span><br/>
                    `}
                    <span style="letter-spacing:0.01em; color:#000000;">
                    ${showBrand ? `<b>${p.brandName}</b><br/>` : ''}${p.productName}, ${p.price} ${p.valuePrice || ''}
                  </span>
                  </a>
                </td>
              </tr>
            </table>
          </td>`;
    } else {
      return `
          <td valign="top">
            <table width="280" border="0" cellspacing="0" cellpadding="0" align="center">
              <tr>
                <td valign="top">
                  ${p.imageLink}
                    <img alt="${p.productName}" border="0" height="280" src="https://www.sephora.com/productimages/sku/s${p.skuId}-main-hero.jpg?${p.badge.value}imwidth=450" style="display:block; margin: 10px 0;" width="280"/>
                  </a>
                </td>
              </tr>
              <tr>
                <td style="line-height:25px;padding-bottom:70px;padding-top:25px;font-family:Helvetica, Arial, sans-serif; font-size:20px;">
                ${p.textLink}
                ${(showTags && p.tags) ? `
                  <span style="color:#C0143C; letter-spacing:0.1em;line-height:25px;"><b>${p.tags}</b></span><br/>
                  <span style="line-height:20px;"><b>&nbsp;</b></span><br/>
                  ` : `
                  <span style="line-height:45px;"><b>&nbsp;</b></span><br/>
                  `}
                  <span style="letter-spacing:0.01em; color:#000000;">
                  ${showBrand ? `<b>${p.brandName}</b><br/>` : ''}${p.productName}, ${p.price} ${p.valuePrice || ''}
                  </span>
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>`;
    }
  }).join('')}
        </table>
      </td>
    </tr>
  </table>`;
}
