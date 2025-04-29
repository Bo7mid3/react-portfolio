import $ from "jquery";
import React, { Component } from "react";
import "./App.scss";
import About from "./components/About";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Projects from "./components/Projects";
import Skills from "./components/Skills";

const LANGUAGES = {
  ENGLISH: {
    id: 0,
    resumePath: "res_eng.json",
  },
  FRENCH: {
    id: 1,
    resumePath: "res_fr.json",
  },
  ARABIC: {
    id: 2,
    resumePath: "res_arb.json",
  },
};

class App extends Component {
  constructor(props) {
    super();
    const pickedLanguage = localStorage.getItem("pickedLanguage") 
        ?JSON.parse(localStorage.getItem("pickedLanguage"))
        :LANGUAGES.ENGLISH;
    this.state = {
      foo: "bar",
      resumeData: {},
      sharedData: {},
      pickedLanguage
    };
  }

  applyPickedLanguage(pickedLanguage) {
    this.setState({ ...this.state, pickedLanguage });
    localStorage.setItem("pickedLanguage", JSON.stringify(pickedLanguage));
    this.loadResumeFromPath(pickedLanguage.resumePath);
  }

  componentDidMount() {
    this.loadSharedData();
    this.loadResumeFromPath(this.state.pickedLanguage.resumePath);
  }

  loadResumeFromPath(path) {
    console.log(path);
    $.ajax({
      url: path,
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ resumeData: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(err);
      },
    });
  }

  loadSharedData() {
    $.ajax({
      url: `portfolio_shared_data.json`,
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ sharedData: data });
        document.title = `${this.state.sharedData.basic_info.title}`;
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(err);
      },
    });
  }

  render() {
    return (
      <div>
        <Header resumeDataBasicInfo={this.state.resumeData.basic_info}  />
        <div className="col-md-12 mx-auto text-center language">
          <button
            onClick={() => this.applyPickedLanguage(LANGUAGES.ENGLISH)}
            style={{
              all: "unset",
              display: "inline",
              filter:
                this.state.pickedLanguage.id !== LANGUAGES.ENGLISH.id &&
                "brightness(40%)",
            }}
            aria-label="Switch to English"
          >
            <span
              className="iconify language-icon mr-5"
              data-icon="twemoji-flag-for-flag-united-kingdom"
              data-inline="false"
              id={window.$primaryLanguageIconId}
            ></span>
          </button>
          <button
            onClick={() => this.applyPickedLanguage(LANGUAGES.FRENCH)}
            style={{
              all: "unset",
              display: "inline",
              filter:
                this.state.pickedLanguage.id !== LANGUAGES.FRENCH.id &&
                "brightness(40%)",
            }}
            aria-label="Switch to French"
          >
            <span
              className="iconify language-icon mr-5"
              data-icon="twemoji-flag-for-flag-france"
              data-inline="false"
              id={window.$secondaryLanguageIconId}
            ></span>
          </button>
          <button
            onClick={() => this.applyPickedLanguage(LANGUAGES.ARABIC)}
            style={{
              all: "unset",
              display: "inline",
              filter:
                this.state.pickedLanguage.id !== LANGUAGES.ARABIC.id &&
                "brightness(40%)",
            }}
            aria-label="Switch to Arabic"
          >
            <span
              className="iconify language-icon"
              data-icon="twemoji-flag-for-flag-saudi-arabia"
              data-inline="false"
              id={window.$secondaryLanguageIconId}
            ></span>
          </button>
        </div>
        <About
          resumeBasicInfo={this.state.resumeData.basic_info}
          sharedBasicInfo={this.state.sharedData.basic_info}
        />
        <Projects
          resumeProjects={this.state.resumeData.projects}
          resumeBasicInfo={this.state.resumeData.basic_info}
        />
        <Skills
          sharedSkills={this.state.sharedData.skills}
          resumeBasicInfo={this.state.resumeData.basic_info}
        />
        <Experience
          resumeExperience={this.state.resumeData.experience}
          resumeBasicInfo={this.state.resumeData.basic_info}
        />
        <Footer sharedBasicInfo={this.state.sharedData.basic_info} />
      </div>
    );
  }
}

export default App;
