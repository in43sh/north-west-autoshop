import React, { Component } from "react";
import axios from "axios";
import "./AddNewPart.css";

export default class AddNewPart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      brand: "",
      model: "",
      price: "",
      condition: "",
      year: "",
      description: ""
    };
  }

  handleChange(property, event) {
    event.preventDefault();
    this.setState({ [property]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let {
      title,
      brand,
      model,
      price,
      condition,
      year,
      description
    } = this.state;
    axios
      .post("/parts/new", {
        title,
        brand,
        model,
        price,
        condition,
        year,
        description
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="addnewpart-container">
        <h2>Add a new part</h2>
        {/* <form className="addnewpart-form" onSubmit={(event) => this.handleSubmit(event)}>
          <p>Title: <input onChange={(event) => this.handleChange("title", event)} class="input"/></p>
          <p>Brand: <input onChange={(event) => this.handleChange("brand", event)} class="input"/></p>
          <p>Model: <input onChange={(event) => this.handleChange("model", event)} class="input"/></p>
          <p>Price: <input onChange={(event) => this.handleChange("price", event)} class="input"/></p>
          <p>Condition: <input onChange={(event) => this.handleChange("condition", event)} class="input"/></p>
          <p>Year: <input onChange={(event) => this.handleChange("year", event)} class="input"/></p>
          <p>Description: <input onChange={(event) => this.handleChange("description", event)} class="input"/></p>
          <input type="submit"  class="input"/>
        </form> */}

        <form
          className="addnewpart-form"
          onSubmit={event => this.handleSubmit(event)}
        >
          <table>
            <tbody>
              <tr>
                <th>Options</th>
                <th>Parametres</th>
              </tr>
              <tr>
                <td>
                  <p>Title:</p>
                </td>
                <td>
                  <input
                    onChange={event => this.handleChange("title", event)}
                    className="input"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <p className="inputparagraph">Brand:</p>
                </td>
                <td>
                  <input
                    onChange={event => this.handleChange("brand", event)}
                    className="input"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <p className="inputparagraph">Model: </p>
                </td>
                <td>
                  <input
                    onChange={event => this.handleChange("model", event)}
                    className="input"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <p className="inputparagraph">Price: </p>
                </td>
                <td>
                  <input
                    onChange={event => this.handleChange("price", event)}
                    className="input"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <p className="inputparagraph">Condition: </p>
                </td>
                <td>
                  <input
                    onChange={event => this.handleChange("condition", event)}
                    className="input"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <p className="inputparagraph">Year: </p>
                </td>
                <td>
                  <input
                    onChange={event => this.handleChange("year", event)}
                    className="input"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <p className="inputparagraph">Description: </p>
                </td>
                <td>
                  <input
                    onChange={event => this.handleChange("description", event)}
                    className="input"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="submit" className="btn btn-primary" />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
}
