import React, { Component } from "react";
import { getMergeSortAnimations } from "../sortingAlgorithms/sortingAlgorithms.js";
import "./SortingVisualizer.css";

export default class SortingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < 140; ++i) {
      array.push(randomIntFromInterval(5, 550));
    }
    this.setState({ array });
  }

  mergeSort() {
    // const allSortButtons = document.getElementsByClassName("start-button");
    // for (let i = 0; i < allSortButtons.length; ++i) {
    //   allSortButtons[i].classList.add("running-button");
    // }

    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? "rgb(153, 49, 49)" : "rgb(84, 116, 150)";
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * 3);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * 3);
      }
    }
  }

  quickSort() {
    alert("OOPS! currently not available");
  }
  heapSort() {
    alert("OOPS! currently not available");
  }
  bubbleSort() {
    alert("OOPS! currently not available");
  }

  render() {
    const { array } = this.state;
    return (
      <div>
        <h1>SORTING VISUALIZER</h1>
        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{ height: `${value}px` }}
            ></div>
          ))}
          <br />
          <button
            className="start-button generate-button"
            onClick={() => this.resetArray()}
          >
            Generate A New Array
          </button>{" "}
          <button className="start-button" onClick={() => this.mergeSort()}>
            Merge Sort
          </button>{" "}
          <button className="start-button" onClick={() => this.quickSort()}>
            Quick Sort
          </button>{" "}
          <button className="start-button" onClick={() => this.heapSort()}>
            Heap Sort
          </button>{" "}
          <button className="start-button" onClick={() => this.bubbleSort()}>
            Bubble Sort
          </button>{" "}
        </div>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
