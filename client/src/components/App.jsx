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
  }

  handleFormSubmit(event) {
    event.preventDefault();
    // get ids from links

    // get data based on ids

    // update state with data

    // render output
  }

  handleInputChange(event) {
    const { name } = event.target;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { products, textareaValue, gridtype, showTags, showBrand } = this.state;
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
