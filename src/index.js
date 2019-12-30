import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    render() {
      return (
        <button className="square" onClick={()=>this.props.onClick()}>
          {this.props.value}
        </button>
      );
    }
  }
  
  class Board extends React.Component {
    renderSquare(i) {
      return <Square onClick={() => this.props.onClick(i)} value={this.props.squares[i]}/>;
    }
    
    render() { 
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props){
      super(props)
      this.state={
        history:[
          {squares:Array(9).fill(null)}
        ],
        xIsNext:true,
        record:[
          <li key={0} onClick={()=>this.move(0)}>Start</li>
        ]
      }
    }
    //网格点击触发方法
    handleClick(i){
      const squares = this.state.history[this.state.history.length-1].squares.concat()
      if(this.calcWinner() || squares[i]){ //有赢家或者各种有值就直接返回。
        return
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O'
      const step = this.state.history.length
      this.setState({
        history:this.state.history.concat([
          {squares:squares}
        ]),
        xIsNext:!this.state.xIsNext,
        record:this.state.record.concat([
          <li key={step} onClick={()=>this.move(step)}>go to move #{step}</li>
        ])
      })
      
    }
    //计算winner方法
    calcWinner(){
      const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
      ]
      const squares = this.state.history[this.state.history.length-1].squares
      for(let item of lines){
        const [a,b,c] = item
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
          return squares[a]
        }
      }
      return null
    }
    //步骤跳转方法。时光旅行。
    move(step){
      this.setState({
        history:this.state.history.slice(0,step+1),
        xIsNext:step % 2 === 0,
        record:this.state.record.slice(0,step+1)
      })
    }
    render() {
      const winner = this.calcWinner()
      let status
      if(winner){
        status = 'Winner: ' + winner
      }else{
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares = {this.state.history[this.state.history.length-1].squares}
              onClick = {(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{this.state.record}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  