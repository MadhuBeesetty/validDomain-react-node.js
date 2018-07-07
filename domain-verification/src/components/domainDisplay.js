import React from 'react';

class Domaindisplay extends React.Component {

  render() {
    console.log(this.props,'hi i am props');
    return (
      <div className="title-container__title">
        <p>Displaying all valid Domains</p>
        <ul>
          {
            this.props.DomainList.map((each) =>{
              return <ul>
                Domain:{each.domain && <li >{each.domain}</li>}
                Description:{each.description && <li>{each.description}</li>}
                Timestamp:{each.datetime && <li>{each.datetime}</li>}
                Validity:{each.valid_domain && <li>{each.valid_domain}</li>}
                <div className="hr">
                  <hr />
            </div>
              </ul>
            })
          }
        </ul>
        <input className="btn btn-primary btn-md" type="submit" value="previous" />
        <input className="btn btn-primary btn-md" type="submit" value="Next" />
      </div>
    );
  }
}

export default Domaindisplay;
