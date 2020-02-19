import React, { Component } from "react"
import { withFirebase } from "./Firebase"

class SignUpFormBase extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: "",
    }
  }

  onSubmit = event => {
    event.preventDefault()
    var win = document.getElementsByTagName("iframe")[0].contentWindow
    var obj = {
      emailForSignIn: this.state.email,
    }
    const ret = win.postMessage(
      JSON.stringify({ key: "storage", data: obj }),
      "*"
    )
    console.log(ret)
    this.props.firebase.doSignInWithLink(this.state.email).then(authUser => {
      console.log(authUser)
    })
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const { email } = this.state
    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <button type="submit">Sign Up</button>
      </form>
    )
  }
}

export default withFirebase(SignUpFormBase)
