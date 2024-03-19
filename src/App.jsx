import React from "react"
import AOS from "aos"
import "aos/dist/aos.css"
import "../src/style.css"

export default class TodoList extends React.Component {
  state = {
    value: "",
    list: [],
    index: "",
  }

  handleValue = (e) => {
    this.setState({
      value: e.target.value,
    })
  }

  handleItems = () => {
    if (this.state.value === "") {
      alert("Please Write Something")
    } else {
      let items = this.state.list

      let val = this.state.value
      items.push({ val })
      this.setState({
        list: items,
        value: "",
        index: -1,
      })
    }
  }

  handleShiftUp = (i) => {
    if (i === 0) {
      alert("Already on Top")
    } else {
      let arr = this.state.list
      let temp = arr[i - 1]
      arr[i - 1] = arr[i]
      arr[i] = temp

      this.setState({
        list: arr,
      })
    }
  }

  handleShiftDown = (i) => {
    if (i === this.state.list.length - 1) {
      alert("Already in Last")
    } else {
      let arr = this.state.list
      let temp = arr[i + 1]
      arr[i + 1] = arr[i]
      arr[i] = temp

      this.setState({
        list: arr,
      })
    }
  }

  handleDelete = (i) => {
    let data = this.state.list
    data.splice(i, 1)
    this.setState({
      list: data,
    })
  }

  handleEdit = (i) => {
    let arr = this.state.list

    this.setState({
      value: arr[i].val,
      index: i,
    })
  }

  handleUpdate = () => {
    if (this.state.index === -1) {
      alert("Click on Edit Button First")
    } else {
      let arr = this.state.list
      let i = this.state.index
      let val = this.state.value

      arr.splice(i, 1, { val })

      this.setState({
        list: arr,
        value: "",
        index: -1,
      })
    }
  }

  componentDidMount() {
    AOS.init({ duration: 2000 })
  }

  render() {
    console.log(this.state)

    let data = this.state.list.map((ele, i) => {
      return (
        <tr key={i}>
          <th>{i + 1}</th>
          <td className="overflow-ellipsis">{ele.val}</td>
          <td>{ele.t}</td>
          <td>
            <div className="container">
              <div className="row">
                <div className="p-0 col-lg-6 col-md-6 col-sm-6 col-12 d-flex justify-content-lg-end justify-content-md-end justify-content-sm-end justify-content-center align-items-center">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => this.handleEdit(i)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger ml-2"
                    type="button"
                    onClick={() => this.handleDelete(i)}
                  >
                    Delete
                  </button>
                </div>

                <div className="p-0 col-lg-6 col-md-6 col-sm-6 col-12 mt-lg-0 mt-md-0 mt-sm-0 mt-3 d-flex justify-content-lg-start justify-content-md-start justify-content-sm-start justify-content-center align-items-center">
                  <button
                    className="btn btn-success ml-2"
                    type="button"
                    onClick={() => this.handleShiftUp(i)}
                  >
                    Up
                  </button>
                  <button
                    className="btn btn-secondary ml-2"
                    type="button"
                    onClick={() => this.handleShiftDown(i)}
                  >
                    Down
                  </button>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )
    })

    return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8 col-md-8 col-sm-12 col-12">
              <img
                src="https://cdn.pixabay.com/photo/2017/08/30/07/56/clock-2696234_960_720.jpg"
                alt="Avatar"
                className="image img-fluid"
              />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12 col-12 d-flex justify-content-lg-start justify-content-md-start justify-content-sm-start justify-content-center align-items-center">
              <div className="text">
                <h1>Time Management</h1>
                <p>
                Time management is not about finding more time, it's about making the most of the time we have. It's the art of balancing priorities, focusing on what truly matters, and efficiently allocating our finite resources of time and energy towards our goals and aspirations.
                </p>
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-12 mt-5">
              <div data-aos="fade-right" className="overlay">
                <div className="task-list">
                  <h1>Today's Events!!!</h1>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12 mt-3">
                      <input
                        className="inpBox form-control"
                        type="text"
                        value={this.state.value}
                        onChange={this.handleValue}
                        placeholder="Add tasks.."
                        ref={(input) => { this.nameInput = input }}
                      />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12 mt-3 d-flex justify-content-lg-end justify-content-md-start">
                      <button
                        className="btn btn-primary updateBtn mr-2"
                        type="button"
                        onClick={this.handleItems}
                      >
                        Add
                      </button>
                      <button
                        className="btn btn-primary updateBtn"
                        type="button"
                        onClick={this.handleUpdate}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                  <table className="table table-dark mt-5 w-100">
                    <thead>
                      <tr>
                        <th scope="col">Sl no.</th>
                        <th scope="col">Todo</th>
                        <th></th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>{data}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
    
  }
}
