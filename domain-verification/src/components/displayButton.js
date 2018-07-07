import React from 'react';
import { NavLink } from 'react-router-dom';

class Displaybutton extends React.Component {

  updateDomain(){
  this.props.getDomain();
  console.log("they called me");
  }

  render() {
    return (
      <div>
        <NavLink to='/Displaydomains'>
          <input className="btn btn-primary btn-md" type="submit" value="domains" onClick={this.updateDomain.bind(this)} />
        </NavLink>
      </div>
    );
  }
}

export default Displaybutton;
