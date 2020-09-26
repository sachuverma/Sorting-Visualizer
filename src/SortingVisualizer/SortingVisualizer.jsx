import React, { Component } from "react";
import * as sortingAlgorithms from "../sortingAlgorithms/sortingAlgorithms";
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
    for (let i = 0; i < 220; ++i) {
      array.push(randomIntFromInterval(5, 550));
    }
    this.setState({ array });
  }

  // CHECKING IF OUR CODE IS CORRECT FOR 100 RANDOM ARRAYS
  // using javascript sort method and our sorting algorithm
  testSortingAlgo() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let j = 0; j < length; ++j)
        array.push(randomIntFromInterval(-1000, 1000));
      const javascriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortArray = sortingAlgorithms.mergeSort(array);
      console.log(
        "merge sort: " + compareArrays(javascriptSortedArray, mergeSortArray)
      );
    }
  }

  mergeSort() {
    const animations = sortingAlgorithms.mergeSort(this.state.array);
    const newAnimations = [];
    for (const animation of animations) {
      newAnimations.push(animation.comparison);
      newAnimations.push(animation.comparison);
      newAnimations.push(animation.swap);
    }

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;

      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = newAnimations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;

        const color = i % 3 === 0 ? "rgb(153, 49, 49)" : "rgb(86, 120, 153)";
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * 5);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = newAnimations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * 5);
      }
    }
  }

  quickSort() {}
  heapSort() {}
  bubbleSort() {}

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
          <button onClick={() => this.resetArray()}>
            Generate A New Array
          </button>{" "}
          <button onClick={() => this.mergeSort()}>Merge Sort</button>{" "}
          <button onClick={() => this.quickSort()}>Quick Sort</button>{" "}
          <button onClick={() => this.heapSort()}>Heap Sort</button>{" "}
          <button onClick={() => this.bubbleSort()}>Bubble Sort</button>{" "}
          <button onClick={() => this.testSortingAlgo()}>
            Test Sorting Algo
          </button>
        </div>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function compareArrays(array1, array2) {
  if (array1.length !== array2.length) return false;
  for (let i = 0; i < array1.length; ++i)
    if (array1[i] !== array2[i]) return false;
  return true;
}
