import React, { Component } from "react";
import TutorialDataService from "services/tutorial.service";
import {
  Form,
  FormGroup,
  Input,
  Button,
  Label,
  Card,
  CardText,
  CardTitle,
  Alert,
  Badge,
} from "reactstrap";

export default class AddTutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveTutorial = this.saveTutorial.bind(this);
    this.newTutorial = this.newTutorial.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "",
      published: false,

      submitted: false,
    };
  }

  onChangeTitle(e) {
    this.setState({ title: e.target.value });
  }
  onChangeDescription(e) {
    this.setState({ description: e.target.value });
  }
  saveTutorial() {
    var data = {
      title: this.state.title,
      description: this.state.description,
    };

    TutorialDataService.create(data)
      .then((response) => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published,

          submitted: true,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  newTutorial() {
    this.setState({
      id: null,
      title: "",
      description: "",
      published: false,

      submitted: false,
    });
  }
  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <Alert color="info" dismissible>
              Your Tutorial has been submitted
            </Alert>
            <div>
              <Button color="info" outline size="sm" onClick={this.newTutorial}>
                Add tutorial
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <Form inline>
              <FormGroup floating>
                <Input
                  id="title"
                  name="title"
                  placeholder="Title"
                  type="text"
                  required
                  value={this.state.title}
                  onChange={this.onChangeTitle}
                />
                <Label for="title">Title</Label>
              </FormGroup>{" "}
              <FormGroup floating>
                <Input
                  id="desc"
                  name="desc"
                  placeholder="description"
                  type="text"
                  required
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                />
                <Label for="desc">Description</Label>
              </FormGroup>{" "}
              <Button color="success" outline size="sm" onClick={this.saveTutorial}>
                Submit
              </Button>
            </Form>
          </div>
        )}
      </div>
    );
  }
}
