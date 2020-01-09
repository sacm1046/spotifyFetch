import React from 'react';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visual:1,
      visible:"",
      invisible:"",
      songs: [],
    }
    this.player = null;
  }
  idname(e, i) {
    e.preventDefault();
    this.player = document.querySelectorAll("audio")[i];
    //this.setState({visual:2})
    this.player.play();
  }

  getSongs(url) {
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        this.setState({
          songs: data
        })
      })
      .catch(error => console.log(error))
  }

  componentDidMount() {
    console.log("Despues de renderizar el componente");
    this.getSongs('https://assets.breatheco.de/apis/sound/songs')
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 bg-dark" id="header"></div>
        </div>
        <div className="row">
          <div className="col-md-12 p-0">
            <div className="list-group-flush p-0" id="listMusic">
              {
                this.state.songs.map((item, i) => (
                  <li className="list-group-item" onClick={(e) => this.idname(e, i)} key={item.id}>
                    {item.id}. {item.name}
                    <audio ref={(t) => this.player = t}>
                      <source src={"https://assets.breatheco.de/apis/sound/" + item.url} type="audio/mp3" />
                      Your browser does not support the audio element.
                      </audio>
                  </li>
                ))
              }
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 bg-dark pt-4 pb-4" id="buttoms">
            <span className="d-flex justify-content-center">
              <div className={`${this.state.visual === 1 ? this.state.visible : this.state.invisible}`}>
                <button type="button" onClick={() => this.player.play()} className="btn"><i className="fas fa-play fa-3x text-white"></i></button>
              </div>
              <div className={`${this.state.visual === 1 ? this.state.visible : this.state.invisible}`}>
                <button type="button" onClick={() => this.player.pause()} className="btn"><i className="fas fa-pause fa-3x text-white"></i></button>
              </div>
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
