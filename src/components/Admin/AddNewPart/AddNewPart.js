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
      description: "",
      formShowself: true
    };
  }

  handleChange(property, event) {
    event.preventDefault();
    this.setState({ [property]: event.target.value }); // directly changing state's values
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
        alert("New part was created!");
        this.setState({
          formShowself: false //Refreshing the form
        }, function(){
          this.setState({
            formShowself: true
          })
        })
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="addnewpart-container">
        <h2>Add a new part</h2>
        {this.state.formShowself &&
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
                    type="number"
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
                    type="number"
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
        }
      </div>
    );
  }
}
