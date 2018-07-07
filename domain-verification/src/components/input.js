import React from 'react';

class Inputbox extends React.Component {

  changeDomain(e) {
    const Domain=e.target.value;
    this.props.Adddomain(Domain);
  }

  changeDescription(e) {
    const Description=e.target.value;
    this.props.AddDescription(Description);
  }

  render() {
    console.log(this.props);
    return (
      <div className="form-group">
        <h1 className ='title-container__title'>"Domain Verification"</h1>
        <div>
          Domain: <textarea className="form-control" placeholder="Enter your domain" onChange={this.changeDomain.bind(this)}></textarea>
        </div>
        <div>
          Description:<textarea className="form-control" placeholder="Enter your description" onChange={this.changeDescription.bind(this)}></textarea>
        </div>
        <div>
          <input className="btn btn-primary btn-md" type="submit" value="submit domain" onClick={this.props.sendDomain}/>
        </div>
        <div>
          <p>{this.props.Response}</p>
        </div>
      </div>
    );
  }
}

export default Inputbox;
