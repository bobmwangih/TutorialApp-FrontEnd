import React, { Component } from "react";
import TutorialDataService from "services/tutorial.service";
import { Link } from "react-router-dom";
import {
  Button,
  InputGroup,
  Input,
  Card,
  CardText,
  CardTitle,
  CardSubtitle,
  CardBody,
  Alert,
  Badge,
} from "reactstrap";

export default class TutorialList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTutorials = this.retrieveTutorials.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.removeAllTutorials = this.removeAllTutorials.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.state = {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: "",
    };
  }
  componentDidMount() {
    this.retrieveTutorials();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;
    this.setState({
      searchTitle: searchTitle,
    });
  }

  retrieveTutorials() {
    TutorialDataService.getAll()
      .then((response) => {
        this.setState({
          tutorials: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTutorials();
    this.setState({
      currentTutorial: null,
      currentIndex: -1,
    });
  }

  setActiveTutorial(tutorial, index) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index,
    });
  }

  removeAllTutorials() {
    TutorialDataService.deleteAll()
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  searchTitle() {
    TutorialDataService.findByTitle(this.state.searchTitle)
      .then((response) => {
        this.setState({
          tutorials: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  render() {
    const { searchTitle, tutorials, currentTutorial, currentIndex } =
      this.state;
    return (
      <div>
        <Card color="warning" inverse outline>
          <CardBody>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              Tutorial List
            </CardSubtitle>
          </CardBody>
        </Card>
        <Card color="warning" outline>
          <CardBody>
            <div className="list row">
              <div className="col-md-6">
                <ul className="list-group">
                  {tutorials &&
                    tutorials.map((tutorial, index) => (
                      <li
                        className={
                          "list-group-item " +
                          (index === currentIndex ? "active" : "")
                        }
                        onClick={() => this.setActiveTutorial(tutorial, index)}
                        key={index}
                      >
                        <div>
                          <Badge color="info" pill>
                            {tutorial.title}
                          </Badge>{" "}
                          <Badge color="info" pill>
                            {tutorial.description}
                          </Badge>
                        </div>
                      </li>
                    ))}
                </ul>

                <Button
                  color="danger"
                  outline
                  onClick={this.removeAllTutorials}
                >
                  Remove All
                </Button>
              </div>
              <div className="col-md-6">
                {currentTutorial ? (
                  <Card body color="warning" outline>
                    <CardTitle tag="h5">Tutorial</CardTitle>
                    <CardText>
                      <label>
                        <strong>Title:</strong>
                      </label>{" "}
                      {currentTutorial.title}
                    </CardText>
                    <CardText>
                      <label>
                        <strong>Description:</strong>
                      </label>{" "}
                      {currentTutorial.description}
                    </CardText>
                    <CardText>
                      <label>
                        <strong>Status:</strong>
                      </label>{" "}
                      {currentTutorial.published ? "Published" : "Pending"}
                    </CardText>
                    <CardText>
                      <Link
                        to={"/tutorials/" + currentTutorial.id}
                        className="nav-link"
                      >
                        Edit
                      </Link>
                    </CardText>
                  </Card>
                ) : (
                  <Alert color="warning">Please select a tutorial ....</Alert>
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}
