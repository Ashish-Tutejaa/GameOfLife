import React from 'react'
import {connect} from 'react-redux'
import { toggle, increment, decrement, clear } from '../redux/actionCreators.js'
import './css/Board.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
// import '../../node_modules/@popperjs/core/lib/'
import '../../node_modules/bootstrap/js/dist/button'
// import '../../node_modules/bootstrap/js/src/tooltip'
import '../../node_modules/bootstrap/js/src/util'

const mapStateToProps = (state, ownProps) => {
    return {
        board : state.present,
    } 
}

const mapDispathToProps = (dispatch) => {
    return {
        toggle : id => {dispatch(toggle(id))},
        increment : () => {dispatch(increment())},
        decrement : () => {dispatch(decrement())},
        clear : () => {dispatch(clear())}
    }
}

 function MakeRow({offset, values, clicker}){
    const row = [];
    for(var i = 0 ; i<40 ; i++){
        var col = values[offset*40 + i] == '0' ? "white" : "gray";
        row.push(<td onClick={clicker} style={{backgroundColor:col}} key={offset*40 + i} id={offset*40 + i}></td>)

    }
    return(row);
 }

class Board extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            value : '',
            speed : '1',
            playCounter : null,
        }
    this.handleInput = this.handleInput.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.toggleCell = this.toggleCell.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    }

    play(){
        if(this.state.playCounter)
            return;
        var speed;
        switch(this.state.speed){
            case '1':
                speed = 800;
                break;
            case '2':
                speed = 650;
                break;
            case '3':
                speed = 300;
                break;
            case '4':
                speed = 150;
                break;
            case '5':
                speed = 50;
                break;
            default:
                speed = 500;
        }
        this.setState({
            playCounter : setInterval(this.props.increment, speed)
        })
    }

    pause(){
        if(this.state.playCounter)
            clearInterval(this.state.playCounter);
        this.setState({
            playCounter : null
        })
    }

    handleInput(event){
        this.setState({
            value : event.target.value
        })
    }

    handleSelect(event){
        console.log(event.target.id)
        this.setState({
            speed : event.target.id
        })
    }

    toggleCell(event){
        this.props.toggle(event.target.id);
    }

    render(){
        const rows = []
        for(var i = 0 ; i<20 ; i++) {
            rows.push(<tr key={i*100}><MakeRow clicker={this.toggleCell} values={this.props.board} offset={i}/></tr>)
        }
        
        const chosen = this.state.playCounter ? "0.5" : "1";
        const mouse = this.state.playCounter ? "not-allowed !important" : "pointer";
        return (
            <div className='mainwrapper'>
                <div className='left'>
                    <table>
                        <tbody>
                        {rows}
                        </tbody>
                    </table>
                    <div className='controls'>
                
                        <div style={{opacity:chosen, cursor:mouse}} className='btn-group'>
                            <button className="btn btn-dark" onClick={() => {this.props.increment()}}>
                                Next Gen.
                            </button>
                            <button className="btn btn-dark" onClick={this.props.decrement}>
                                Previous Gen.
                            </button>
                            <button className='btn btn-dark' onClick={() => {
                            if(!this.state.playCounter)
                                this.props.clear();
                            }}>
                                Clear
                            </button>
                        </div>

                        <div data-toggle="tooltip" data-placement="top" title="Simulation Speed" style={{opacity:chosen, cursor:mouse}} className='btn-group btn-group-toggle' data-toggle='buttons'>
                            <label className='btn btn-secondary'>
                                <input checked id='1' type='radio' onClick={this.handleSelect}/>1
                            </label>
                            <label className='btn btn-secondary'>
                                <input id='2' type='radio' onClick={this.handleSelect}/>2
                            </label>
                            <label className='btn btn-secondary'>
                                <input id='3' type='radio' onClick={this.handleSelect}/>3
                            </label>
                            <label className='btn btn-secondary'>
                                <input id='4' type='radio' onClick={this.handleSelect}/>4
                            </label>
                            <label className='btn btn-secondary'>
                                <input id='5' type='radio' onClick={this.handleSelect}/>5
                            </label>
                        </div>

                    <div className='d-flex flex-row justify-content-around align-items-center'>
                            {/* <label for='speed'>Speed:</label> */}

                        <div className='btn-group btn-group-toggle' data-toggle='buttons'>
                            <label className='btn btn-primary'>
                                <input type='radio' onClick={this.play}/>Play
                            </label>
                            <label className='btn btn-primary'>
                                <input type='radio' onClick={this.pause}/>Pause
                            </label>
                        </div>
                        
                    </div>



                    </div>

                </div>
                <div className='right'>
                    <h4>Conway's Game of Life</h4>
                    <hr/>
                    <p>The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970.
                         It is a zero-player game, meaning that its evolution is determined by its initial state,
                          requiring no further input. One interacts with the Game of Life by creating an initial 
                          configuration and observing how it evolves.</p>
                    <hr/>
                    <h5>Rules of the game:</h5>
                    <ul class="list-group">
                        <li class="list-group-item">A cell with one or less neighbors dies due to underpopulation. </li>
                        <li class="list-group-item">A cell with more than three neighbors dies due to overpopulation. </li>
                        <li class="list-group-item">Only cells with two or three neighbors survive to the next generation. </li>
                        <li class="list-group-item">A 'dead' cell with three neighbors becomes live due to reproduction. </li>
                    </ul>
                    <h5>How to play:</h5>
                    <ul class="list-group">
                        <li class="list-group-item">Click on a cell to change it's state.</li>
                        <li class="list-group-item">You can view the previous/ next generation using prev and next state buttons. </li>
                        <li class="list-group-item">Use the play/ pause buttons to simulate multiple generations.</li>
                        <li class="list-group-item">Use clear to reset the board.</li>
                    </ul>
                </div>
            </div>
        );
    }
}

const ComponentWrapper =  connect(mapStateToProps, mapDispathToProps);
// const board = ComponentWrapper(Board);
export default ComponentWrapper(Board);