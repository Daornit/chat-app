import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      response: false,
      list: [],
      socket: socketIOClient("http://127.0.0.1:4001")
    };
  }

  componentDidMount() {
    const { socket } = this.state;

    axios.post('/api/users/login', {
      "user": {
        "email": "daonrit2@gmail.com",
        "password": "test@123"
      }
    }).then( data => {
      axios.get('/api').then((data) => console.log(data.data ));
    })
    socket.on("FromAPI", data => this.setState({ response: data }));
    socket.on('chat message', (msg) => {
      this.setState({list: [...this.state.list, msg]})
    });
  }

  render() {
    const { list, socket } = this.state;
    let input;

    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault()
            if (!input.value.trim()) {
              return
            }
            socket.emit('chat message', input.value);
            input.value = ''
          }}
        >
          <input ref={node => (input = node)} />
          <button type="submit">sent</button>
        </form>
        <div>
         {list.map((msg, index) => <p key={index}>{msg}</p>)}
        </div>
      </div>
    );
  }
}

export default App;
