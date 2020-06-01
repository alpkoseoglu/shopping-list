import React from "react"
import "./App.css"

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      value: "",
      items: JSON.parse(localStorage.getItem("items")) || [],
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    localStorage.setItem("items", JSON.stringify(this.state.items))
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    let val = this.state.value.trim()
    if (val !== "") {
      let item = JSON.parse(localStorage.getItem("items"))
      item.push(val)
      localStorage.setItem("items", JSON.stringify(item))
    }
    this.setState({ value: "", items: JSON.parse(localStorage.getItem("items")) })
  }

  delete(e) {
    let index = e.target.getAttribute("data-key")
    let list = JSON.parse(localStorage.getItem("items"))
    list.splice(index, 1)
    this.setState({
      items: list,
    })
    localStorage.setItem("items", JSON.stringify(list))
  }

  render() {
    return (
      <div className="App App-header">
        <h1>Shopping List</h1>
        <form onSubmit={this.handleSubmit}>
          <input id="input" type="text" placeholder="What Do You Need?" ref="title" value={this.state.value} onChange={this.handleChange} />
          <input id="add" type="submit" value="+" />
        </form>
        <br />
        <br />
        <ul>
          {this.state.items.map((item, index) => {
            return (
              <li key={index}>
                <p>
                  {index + 1 + "- "}
                  {item}
                </p>
                <input className="edit" type="button" value="Edit" onClick={this.edit.bind(this)} data-key={index} />
                <input className="delete" type="button" value="Delete" onClick={this.delete.bind(this)} data-key={index} />
              </li>
            )
          }, this)}
        </ul>
      </div>
    )
  }
}

export default App
