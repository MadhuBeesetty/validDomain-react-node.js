import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

import Inputbox from './components/input'
import Displaybutton from './components/displayButton'
import Domaindisplay from './components/domainDisplay'

class App extends React.Component {
  constructor(){
    super();
    this.state={
      EnteredDomain:'',
      EnteredDescription:'',
      //taking a sample data
      DomainList:[],
      ResponseFromServer:''
    }
  }

  getDomain () {
    fetch(`http://localhost:4000/getDomain`)
      .then(response => response.json())
      .then(response => {
        const DomainList = this.state.DomainList.concat(response);
        this.setState({DomainList})
      })
      .catch(err => console.log(err))
  }

  sendDomain () {
    fetch(`http://localhost:4000/sendDomain?Domain=${this.state.EnteredDomain}&Description=${this.state.EnteredDescription}`)
      .then(response => this.setState({ResponseFromServer: response}))
  };

  Adddomain(EnteredDomain) {
    this.setState({EnteredDomain});  
  }

  AddDescription(EnteredDescription) {
    this.setState({EnteredDescription});
  }

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="title-container">
              <BrowserRouter>
                <switch>    
                  <Route path='/'
                    render={ () => <Inputbox 
                      EnteredDomain={this.state.EnteredDomain}
                      EnteredDescription={this.state.EnteredDescription}
                      Adddomain={this.Adddomain.bind(this)}
                      AddDescription={this.AddDescription.bind(this)}
                      sendDomain={this.sendDomain.bind(this)}
                      response={this.state.ResponseFromServer}
                    />} exact />
                <Route path='/' 
                  render={ () => <Displaybutton 
                    getDomain={this.getDomain.bind(this)}
                  />} exact />
                <Route path="/Displaydomains" 
                  render={ () => <Domaindisplay 
                    DomainList={this.state.DomainList}
                  />} exact />
              </switch>
            </BrowserRouter>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default App;
