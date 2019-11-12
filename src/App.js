import React from 'react';
import './App.css';

class App extends React.Component {
  constructor () {
    super ();
    this.state = {
      items : JSON.parse(localStorage.getItem("items"))
    }
  }

  add () {
    let title = this.refs.title.value;
    if (localStorage.getItem("items") == null) {
      let items = [];
      items.push(title);
      localStorage.setItem("items", JSON.stringify(items));
      this.refs.title.value = "";
    } else {
      let items = JSON.parse(localStorage.getItem("items"));
      items.push(title);
      localStorage.setItem("items", JSON.stringify(items));
      this.refs.title.value = "";
    }
    this.setState({
      items: JSON.parse(localStorage.getItem("items"))
    });
  }

  delete (e) {
    let index = e.target.getAttribute("data-key");
    let list = JSON.parse(localStorage.getItem("items"));
    list.splice(index, 1);
    this.setState({
      items: list
    });
    localStorage.setItem("items", JSON.stringify(list));
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Shopping List</h1>
          <input type="text" placeholder="What Do You Need?" ref="title"/>
          <input type="button" value="Add" onClick={this.add.bind(this)}/>
          <br/><br/>
          <ul>
            {this.state.items.map((item, index) => {
              return (
                <li key={index}>
                  <p>{item}</p>
                  <input className="delete" type="button" value="X" onClick={this.delete.bind(this)} data-key={index}/> 
                </li>
              );
            }, this)}
          </ul>
        </header>
        
      </div>
    );
  }
  
}

export default App;
