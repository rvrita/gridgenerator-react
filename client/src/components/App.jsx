/* eslint-disable prefer-destructuring */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable quotes */
/* eslint-disable react/no-danger */
import React from 'react';
// import products1Up from '../../../templates/products-1up';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textareaValue: '',
      gridtype: 'twoByFour',
      showTags: true,
      showBrand: true,
      products: [],
      // products: [{
      //   skuId: 1234,
      //   imageLink: `<a href="[@trackurl LinkID='' LinkName='pmgdivinerosepalette' LinkTag='pl-p7' LinkDesc='' Tracked='ON' Encode='OFF' LinkType='REDIRECT']https://www.sephora.com/product/P458276?skuId=2351542&$deep_link=true[/@trackurl]"  target="_blank">`,
      //   productName: 'FOo',
      //   textLink: `<a href="[@trackurl LinkID='' LinkName='dennisgrossdailypeel' LinkTag='pl-p4' LinkDesc='' Tracked='ON' Encode='OFF' LinkType='REDIRECT']https://www.sephora.com/product/P269122?skuId=1499482&$deep_link=true[/@trackurl]"  target="_blank"`,
      //   tags: 'HELLO WORLD',
      //   brandName: 'FOOoo',
      //   price: '$100',
      //   valuePrice: '$120',
      // }, {
      //   skuId: 1234,
      //   imageLink: `<a href="[@trackurl LinkID='' LinkName='pmgdivinerosepalette' LinkTag='pl-p7' LinkDesc='' Tracked='ON' Encode='OFF' LinkType='REDIRECT']https://www.sephora.com/product/P458276?skuId=2351542&$deep_link=true[/@trackurl]"  target="_blank">`,
      //   productName: 'Bsafasdf',
      //   textLink: `<a href="[@trackurl LinkID='' LinkName='dennisgrossdailypeel' LinkTag='pl-p4' LinkDesc='' Tracked='ON' Encode='OFF' LinkType='REDIRECT']https://www.sephora.com/product/P269122?skuId=1499482&$deep_link=true[/@trackurl]"  target="_blank"`,
      //   tags: 'HELLO WORLD',
      //   brandName: 'FOOoo',
      //   price: '$100',
      //   valuePrice: '$120',
      // }],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.skuToLinkMap = {};
  }

  // sending get request to proxy
  getData(sku, obj) {
    return fetch(`/skus/${sku}`)
      .then((response) => response.json())
      // .then(data => { console.log(data); return data; })
      .then((data) => {
        let price;
        if (data.listPrice.split('.')[1] === 50) {
          price = data.listPrice;
        } else {
          price = data.listPrice.split('.')[0];
        }
        let tags = '';
        if (data.isNew) {
          tags += 'NEW. ';
        } else if (data.isSephoraExclusive) {
          tags += 'EXCLUSIVE. ';
        } else if (data.isLimitedEdition) {
          tags += 'LIMITED EDITION. ';
        } else if (data.isOnlineOnly) {
          tags += 'ONLINE ONLY.';
        }
        const item = {
          skuId: data.skuId,
          brandName: data.primaryProduct.brand.displayName.toUpperCase(),
          productName: data.primaryProduct.displayName.replace(/[®™©]/g, ''),
          tags,
          price,
          valuePrice: data.valuePrice ? `${data.valuePrice.split('.')[0]} value)` : '',
          rating: data.primaryProduct.rating,
          imageLink: obj[data.skuId],
          textLink: obj[data.skuId].replace('>', ' style="text-decoration:none;color:#000000;">'),
        };
        return item;
      })
      .catch(() => {
        const item = {
          skuId: sku,
          brandName: 'PLACEHOLDER BRAND NAME',
          productName: 'Placeholder product name',
          tags: 'PLACEHOLDER TAGS',
          price: '$00',
          valuePrice: '',
          rating: 0,
          imageLink: obj[sku],
          textLink: obj[sku].replace('>', ' style="text-decoration:none;color:#000000;">'),
        };
        return item;
      });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const { textareaValue } = this.state;
    // get ids from links
    const skus = this.parseSkus(textareaValue);
    // get data based on ids
    const promises = skus.map((sku) => this.getData(sku, this.skuToLinkMap));
    // update state with data
    Promise.all(promises)
      .then((data) => {
        this.setState({
          products: data,
        }, () => console.log(this.state));
      });
    // render output
  }

  handleInputChange(event) {
    const { name } = event.target;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState({
      [name]: value,
    });
  }

  parseSkus(links) {
    this.skuToLinkMap = {};
    const lines = links.split('\n');
    const skus = lines.map((line, index) => {
      const match = line.match(/skuId=([0-9]+)/);
      if (match == null) return null;
      this.skuToLinkMap[match[1]] = lines[index];
      return match[1];
    });
    return skus;
  }

  render() {
    const {
      products, textareaValue, gridtype, showTags, showBrand,
    } = this.state;
    // const productsHtml = products1Up(products, true, false);
    return (
      <div>
        <h1>Sephora Email Grid Generator</h1>
        <form onSubmit={this.handleFormSubmit}>
          <div id="typePfGrid">
            <label htmlFor="oneUp">
              1up grid
              <input type="radio" id="oneUp" name="gridtype" value="oneUp" onChange={this.handleInputChange} checked={gridtype === 'oneUp'} />
            </label>
            <label htmlFor="twoByFour">
              2x4 grid
              <input type="radio" id="twoByFour" name="gridtype" value="twoByFour" onChange={this.handleInputChange} checked={gridtype === 'twoByFour'} />
            </label>
          </div>
          <div>
            <label htmlFor="links">
              Paste your links here, one each line:
              <textarea rows="20" cols="80" id="links" name="textareaValue" value={textareaValue} onChange={this.handleInputChange} />
            </label>
          </div>
          <div id="checkboxes">
            <label htmlFor="showTags">
              Show tags
              <input type="checkbox" id="showTags" name="showTags" checked={showTags} onChange={this.handleInputChange} />
            </label>
            <label htmlFor="showBrand">
              Include Brand Name
              <input type="checkbox" id="showBrand" name="showBrand" checked={showBrand} onChange={this.handleInputChange} />
            </label>
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

{ /* return (
<>
<div dangerouslySetInnerHTML={{ __html: productsHtml }} />
<textarea>{productsHtml.replace(/\n\s+\n/g, '\n')}</textarea>
</>
); */ }

export default App;
