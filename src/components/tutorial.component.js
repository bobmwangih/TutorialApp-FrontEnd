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
  Badge
} from "reactstrap";

export default class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getTutorial = this.getTutorial.bind(this);
    this.updateTutorial = this.updateTutorial.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.deleteTutorial = this.deleteTutorial.bind(this);
    this.state = {
      currentTutorial: {
        id: null,
        title: "",
        description: "",
        published: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getTutorial(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState((prevState) => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        title: title,
      },
    }));
  }

  onChangeDescription(e) {
    const description = e.target.value;
    this.setState((prevState) => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        description: description,
      },
    }));
  }

  getTutorial(id) {
    TutorialDataService.get(id)
      .then((response) => {
        console.log(response.data);
        this.setState({
          currentTutorial: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateTutorial() {
    TutorialDataService.update(
      this.state.currentTutorial.id,
      this.state.currentTutorial
    )
      .then((response) => {
        console.log(response.data);

        this.setState({
          message: "Tutorial updated successfully",
        });
        this.props.history.push("/tutorials");
      })
      .then((e) => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentTutorial.id,
      title: this.state.currentTutorial.title,
      description: this.state.currentTutorial.description,
      published: status,
    };

    TutorialDataService.update(this.state.currentTutorial.id, data)
      .then((response) => {
        console.log(response.data);

        this.setState((prevState) => ({
          currentTutorial: {
            ...prevState.currentTutorial,
            published: status,
          },
        }));
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteTutorial() {
    TutorialDataService.delete(this.state.currentTutorial.id)
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/tutorials");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentTutorial } = this.state;

    return (
      <div>
        {currentTutorial ? (
          <Card body color="warning" outline>
            <CardTitle tag="h5">Tutorial</CardTitle>
            <Form inline>
              <FormGroup floating>
                <Input
                  id="title"
                  name="title"
                  placeholder="Title"
                  value={currentTutorial.title}
                  onChange={this.onChangeTitle}
                />
                <Label for="title">Title</Label>
              </FormGroup>{" "}
              <FormGroup floating>
                <Input
                  id="description"
                  name="description"
                  placeholder="description"
                  value={currentTutorial.description}
                  onChange={this.onChangeDescription}
                />
                <Label for="description">Description</Label>
              </FormGroup>{" "}
              <FormGroup floating>
                {currentTutorial.published ? (
                  <div>
                    <Badge color="success" pill>
                      Published
                    </Badge>
                  </div>
                ) : (
                  <div>
                    <Badge color="danger" pill>
                      Not Published
                    </Badge>
                  </div>
                )}
              </FormGroup>{" "}
            </Form>
            <div>
              {currentTutorial.published ? (
                <Button
                  onClick={() => this.updatePublished(false)}
                  color="success"
                  outline
                  size="sm"
                >
                  UnPublish
                </Button>
              ) : (
                <Button
                  onClick={() => this.updatePublished(true)}
                  color="success"
                  outline
                  size="sm"
                >
                  Publish
                </Button>
              )}{" "}
              <Button
                onClick={this.deleteTutorial}
                color="danger"
                outline
                size="sm"
              >
                Delete
              </Button>{" "}
              <Button
                onClick={this.updateTutorial}
                color="info"
                outline
                size="sm"
              >
                Update
              </Button>{" "}
            </div>
            <p>{this.state.message}</p>
          </Card>
        ) : (
          <Card body color="warning" outline>
            <CardTitle tag="h5">Special Title Treatment</CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content.
            </CardText>
            <Button>Button</Button>
          </Card>
        )}
      </div>
    );
  }
}
