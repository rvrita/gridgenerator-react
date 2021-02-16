/* eslint-disable no-unused-expressions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable class-methods-use-this */
/* eslint-disable prefer-destructuring */
import React from 'react';
import template1up from '../../../templates/template1up';
import template1upnew from '../../../templates/template1up-new';
import template2x4 from '../../../templates/template2x4';
import template2x4new from '../../../templates/template2x4-new';
import templatec2x4 from '../../../templates/templateC2x4';
import templatec3x1 from '../../../templates/templateC3x1';

const badges = [
  {
    name: 'None',
    value: '',
  },
  {
    name: 'Clean',
    value: 'pb=2020-03-sephora-clean-2019&',
  },
  {
    name: 'Allure',
    value: 'pb=2020-03-allure-best-2018&',
  },
  {
    name: 'Value',
    value: 'pb=2020-03-sephora-value-2019&',
  },
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textareaValue: '',
      gridType: 'twobyfournew',
      showTags: true,
      showBrand: true,
      products: [],
      activeTab: 'codeview',
      certonaTag: '',
      showKlarna: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.skuToLinkMap = {};
    this.handleTabClick = this.handleTabClick.bind(this);
  }

  // sending get request to proxy
  getData(sku, skuToLinkMap) {
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
        const tags = [];
        if (data.isNew) {
          tags.push('NEW');
        }
        if (data.isSephoraExclusive) {
          tags.push('ONLY<span>&nbsp;</span>AT<span>&nbsp;</span>SEPHORA');
        }
        if (data.isLimitedEdition) {
          tags.push('LIMITED<span>&nbsp;</span>EDITION');
        }
        if (data.isOnlineOnly) {
          tags.push('ONLINE<span>&nbsp;</span>ONLY');
        }
        const item = {
          skuId: data.skuId,
          brandName: data.primaryProduct.brand.displayName.toUpperCase(),
          productName: data.primaryProduct.displayName.replace(/[®™©]/g, ''),
          tags,
          price,
          valuePrice: data.valuePrice ? `${data.valuePrice.split('.')[0]} value)` : '',
          rating: data.primaryProduct.rating,
          imageLink: skuToLinkMap[data.skuId],
          textLink: skuToLinkMap[data.skuId].replace('>', ' style="text-decoration:none;color:#000000;">'),
          badge: badges[0],
          salePrice: data.salePrice ? data.salePrice.split('.')[0] : '',
        };
        return item;
      })
      .catch(() => {
        const item = {
          skuId: sku,
          brandName: 'PLACEHOLDER BRAND NAME',
          productName: 'Placeholder product name',
          tags: ['PLACEHOLDER TAG'],
          price: '$00',
          valuePrice: '',
          rating: 0,
          imageLink: skuToLinkMap[sku],
          textLink: skuToLinkMap[sku].replace('>', ' style="text-decoration:none;color:#000000;">'),
          badge: badges[0],
          salePrice: '',
        };
        return item;
      });
  }

  setBadge(productIdx, badge) {
    const { products } = this.state;
    const newProduct = {
      ...products[productIdx],
      badge,
    };
    const newProducts = [...products];
    newProducts[productIdx] = newProduct;
    this.setState({
      products: newProducts,
    });
  }

  handleTabClick(event) {
    this.setState({ activeTab: event.target.value });
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
        });
      });

    document.location = '#step2';
  }

  handleInputChange(event) {
    const { name } = event.target;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState({
      [name]: value,
    });
  }

  // getting the sku number from the url
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
      products, textareaValue, gridType, showTags, showBrand, activeTab, certonaTag, showKlarna,
    } = this.state;
    let productsHtml = '';
    if (products.length > 0 && gridType === 'oneup') {
      productsHtml = template1up(products, showTags, showBrand, showKlarna).replace(/\n\s+\n/g, '\n');
    } else if (products.length > 0 && gridType === 'oneupnew') {
      productsHtml = template1upnew(products, showTags, showBrand, showKlarna).replace(/\n\s+\n/g, '\n');
    } else if (products.length > 0 && gridType === 'twobyfour') {
      productsHtml = template2x4(products, showTags, showBrand, showKlarna).replace(/\n\s+\n/g, '\n');
    } else if (products.length > 0 && gridType === 'twobyfournew') {
      productsHtml = template2x4new(products, showTags, showBrand, showKlarna).replace(/\n\s+\n/g, '\n');
    } else if (gridType === 'ctwobyfour') {
      productsHtml = templatec2x4(certonaTag).replace(/\n\s+\n/g, '\n');
    } else if (gridType === 'cthreebyone') {
      productsHtml = templatec3x1(certonaTag).replace(/\n\s+\n/g, '\n');
    }
    return (
      <div>
        <header>
          <div className="topline" />
          <div className="logo">
            <img src="/images/logo.svg" alt="Sephora logo" width="200" height="auto" />
            {/* <img src="https://sephora.i.lithium.com/t5/image/serverpage/avatar-name/default-avatar/avatar-theme/sephora/avatar-collection/sephora/avatar-display-size/profile/version/2?xdesc=1.0" width="30" height="auto" alt="avatar" /> */}
            <h1>Email Grid Generator</h1>
          </div>
          <div className="topline" />
        </header>
        <article className="fixed">
          <h2>Step 1: Generate your data</h2>
          <form onSubmit={this.handleFormSubmit}>
            <div>
              <label htmlFor="links">
                <br />
                Paste your links here, one each line:
                {' '}
                <br />
                <br />
                <textarea rows="25" cols="100" id="links" name="textareaValue" value={textareaValue} onChange={this.handleInputChange} />
              </label>
            </div>
            <br />
            <input type="submit" value="Submit" id="submit" />
          </form>
          <br />
          <br />
          <h2 id="step2">Step 2: Choose your preferences</h2>
          <br />
          <div id="typeofgrid">
            <h3>Type of the grid</h3>
            <label htmlFor="oneup">
              1up grid
              {' '}
              <input type="radio" id="oneup" name="gridType" value="oneup" onChange={this.handleInputChange} checked={gridType === 'oneup'} />
            </label>
            <label htmlFor="oneupnew">
              1up
              {' '}
              <span className="newtag">NEW</span>
              {' '}
              grid
              {' '}
              <input type="radio" id="oneupnew" name="gridType" value="oneupnew" onChange={this.handleInputChange} checked={gridType === 'oneupnew'} />
            </label>
            <label htmlFor="twobyfour">
              2x4 grid
              {' '}
              <input type="radio" id="twobyfour" name="gridType" value="twobyfour" onChange={this.handleInputChange} checked={gridType === 'twobyfour'} />
            </label>
            <label htmlFor="twobyfournew">
              2x4
              {' '}
              <span className="newtag">NEW</span>
              {' '}
              grid
              {' '}
              <input type="radio" id="twobyfournew" name="gridType" value="twobyfournew" onChange={this.handleInputChange} checked={gridType === 'twobyfournew'} />
            </label>
            <br />
            <br />
            <label htmlFor="ctwobyfour">
              Certona 2x4 grid
              {' '}
              <input type="radio" id="ctwobyfour" name="gridType" value="ctwobyfour" onChange={this.handleInputChange} checked={gridType === 'ctwobyfour'} />
            </label>
            <label htmlFor="cthreebyone">
              Certona 3x1 grid
              {' '}
              <input type="radio" id="cthreebyone" name="gridType" value="cthreebyone" onChange={this.handleInputChange} checked={gridType === 'cthreebyone'} />
            </label>
          </div>
          {gridType === 'ctwobyfour' || gridType === 'cthreebyone'
            ? (
              <div id="tagname">
                <label htmlFor="certonatag">
                  Tag name:
                  {' '}
                  <input type="text" id="certonatag" name="certonaTag" value={certonaTag} onChange={this.handleInputChange} />
                </label>
              </div>
            )
            : (
              <div>
                <div id="checkboxes">
                  <h3>Info</h3>
                  <label htmlFor="showTags">
                    Show Tags
                    {' '}
                    <input type="checkbox" id="showTags" name="showTags" checked={showTags} onChange={this.handleInputChange} />
                  </label>
                  <label htmlFor="showBrand">
                    Include Brand Name
                    {' '}
                    <input type="checkbox" id="showBrand" name="showBrand" checked={showBrand} onChange={this.handleInputChange} />
                  </label>
                  <label htmlFor="showKlarna">
                    Include Klarna Price
                    {' '}
                    <input type="checkbox" id="showKlarna" name="showKlarna" checked={showKlarna} onChange={this.handleInputChange} />
                  </label>
                </div>
                <div id="badges">
                  <h3>Badges</h3>
                  <ul>
                    {products.map((product, index) => {
                      const name = `product${index}badge`;
                      return (
                        <React.Fragment key={product.skuId}>
                          <li key={product.skuId}>{product.brandName}</li>
                          <ul>
                            {badges.map((badge, badgeIdx) => {
                              const id = `product${index}badge${badgeIdx}`;
                              return (
                                <li key={product.skuId + badge.name}>
                                  <label htmlFor={id}>
                                    <input type="radio" id={id} name={name} checked={product.badge === badge} onChange={() => this.setBadge(index, badge)} />
                                    {' '}
                                    {badge.name}
                                  </label>
                                </li>
                              );
                            })}
                          </ul>
                        </React.Fragment>
                      );
                    })}

                  </ul>
                </div>
              </div>
            )}
          <br />
          <h2>Step 3: Get your code</h2>
          <br />
          <div id="codewindow">
            <div className="tab">
              <button type="button" value="codeview" onClick={this.handleTabClick}>Generated Code</button>
              <button type="button" value="preview" onClick={this.handleTabClick}>Preview</button>
            </div>
            <br />
            {activeTab === 'codeview'
              && <textarea id="codeview" rows="25" cols="100" value={productsHtml} readOnly />}
            {activeTab === 'preview'
              // eslint-disable-next-line react/no-danger
              && <div id="preview" dangerouslySetInnerHTML={{ __html: productsHtml }} />}
          </div>

          <div id="examples">
            <h3>Example links</h3>
            <textarea
              id="links"
              name="links"
              rows="25"
              cols="100"
              defaultValue={`<a href="[@trackurl LinkID='' LinkName='shiseidofirmingset' LinkTag='pl-p1' LinkDesc='' Tracked='ON' Encode='OFF' OfferID='' LinkType='REDIRECT']https://www.sephora.com/product/P463953?skuId=2374296&$deep_link=true[/@trackurl]"  target="_blank">
<a href="[@trackurl LinkID='' LinkName='saintjaneglowkit' LinkTag='pl-p2' LinkDesc='' Tracked='ON' Encode='OFF' OfferID='' LinkType='REDIRECT']https://www.sephora.com/product/P463935?skuId=2369841&$deep_link=true[/@trackurl]"  target="_blank">
<a href="[@trackurl LinkID='' LinkName='slipbeautygiftset' LinkTag='pl-p3' LinkDesc='' Tracked='ON' Encode='OFF' OfferID='' LinkType='REDIRECT']https://www.sephora.com/product/P463350?skuId=2044139&$deep_link=true[/@trackurl]"  target="_blank">
<a href="[@trackurl LinkID='' LinkName='hourglassconfessionsduo' LinkTag='pl-p4' LinkDesc='' Tracked='ON' Encode='OFF' OfferID='' LinkType='REDIRECT']https://www.sephora.com/product/P463862?skuId=2378610&$deep_link=true[/@trackurl]"  target="_blank">
<a href="[@trackurl LinkID='' LinkName='dennisgrossdailypeel' LinkTag='pl-p4' LinkDesc='' Tracked='ON' Encode='OFF' LinkType='REDIRECT']https://www.sephora.com/product/P269122?skuId=1499482&$deep_link=true[/@trackurl]" target="_blank">
<a href="[@trackurl LinkID='' LinkName='carolinaherreraparfum' LinkTag='pl-p5' LinkDesc='' Tracked='ON' Encode='OFF' LinkType='REDIRECT']https://www.sephora.com/product/P420533?skuId=1960707&$deep_link=true[/@trackurl]" target="_blank">
<a href="[@trackurl LinkID='' LinkName='ctminilipsticklipliner' LinkTag='pl-p6' LinkDesc='' Tracked='ON' Encode='OFF' LinkType='REDIRECT']https://www.sephora.com/product/P458268?skuId=2339620&$deep_link=true[/@trackurl]" target="_blank">
<a href="[@trackurl LinkID='' LinkName='pmgdivinerosepalette' LinkTag='pl-p7' LinkDesc='' Tracked='ON' Encode='OFF' LinkType='REDIRECT']https://www.sephora.com/product/P458276?skuId=2351542&$deep_link=true[/@trackurl]" target="_blank">`}
            />
          </div>
        </article>
      </div>
    );
  }
}

export default App;
