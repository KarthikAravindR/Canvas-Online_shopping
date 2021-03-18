import React, { } from 'react';
import { connect } from 'react-redux'

// import * as actions from '../../../store/actions/index'
// import LoadingIndicator from '../LoadingIndicator/LoadingIndicator'
import './Modal.css'
import Backdrop from '../Backdrop/Backdrop'

const Modal = (props) =>  {
        return (
            <div>
                <Backdrop show={props.show} clicked={props.modalclosed} />
                {props.show?<div className="Modal1" style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                    <div>
                        <div className="modalbuttonclose">
                            <button onClick={props.modalclose}>CLOSE</button>
                        </div>
                        <div className="modalsizechart">Size Chart</div>
                        <div>
                            <div className="modalparticularsize">
                                <div style={{width:"50%",textAlign:"center"}}>UK</div>
                                <div style={{width:"50%",textAlign:"center"}}>To Fit Foot Length (cm)</div>
                            </div>
                            <div className="modalparticularsize">
                                <div style={{width:"50%",textAlign:"center"}}>3</div>
                                <div style={{width:"50%",textAlign:"center"}}>22.0</div>
                            </div>
                            <div className="modalparticularsize">
                                <div style={{width:"50%",textAlign:"center"}}>4</div>
                                <div style={{width:"50%",textAlign:"center"}}>22.8</div>
                            </div>
                            <div className="modalparticularsize">
                                <div style={{width:"50%",textAlign:"center"}}>5</div>
                                <div style={{width:"50%",textAlign:"center"}}>23.7</div>
                            </div>
                            <div className="modalparticularsize">
                                <div style={{width:"50%",textAlign:"center"}}>6</div>
                                <div style={{width:"50%",textAlign:"center"}}>24.5</div>
                            </div>
                            <div className="modalparticularsize">
                                <div style={{width:"50%",textAlign:"center"}}>7</div>
                                <div style={{width:"50%",textAlign:"center"}}>25.4</div>
                            </div>
                            <div className="modalparticularsize">
                                <div style={{width:"50%",textAlign:"center"}}>8</div>
                                <div style={{width:"50%",textAlign:"center"}}>26.2</div>
                            </div>
                            <div className="modalparticularsize">
                                <div style={{width:"50%",textAlign:"center"}}>9</div>
                                <div style={{width:"50%",textAlign:"center"}}>27.1</div>
                            </div>
                            <div className="modalparticularsize">
                                <div style={{width:"50%",textAlign:"center"}}>10</div>
                                <div style={{width:"50%",textAlign:"center"}}>27.9</div>
                            </div>
                            <div className="modalparticularsize">
                                <div style={{width:"50%",textAlign:"center"}}>11</div>
                                <div style={{width:"50%",textAlign:"center"}}>28.8</div>
                            </div>
                        </div>
                        <div className="modalsizechart">How To Measure</div>
                        <div className="howtomeasureimg">
                            <img src="https://assets.myntassets.com/assets/images/sizechart/2016/12/12/11481538267795-footwear.png" alt="Size Chart"/>
                        </div>
                    </div>
                </div>:null}
            </div >
        );
}
const mapStateToProps = state => {
    return{
        // title: state.modal.title,
        // description: state.modal.description,
        // userId: state.auth.userid
    }
}
const mapDispatchToState = dispatch => {
    return{
        // onSetTitle: (title) => {dispatch(actions.setTitle(title))},
        // onSetDescription: (description) => {dispatch(actions.setDescription(description))},
        modalclose:() => { dispatch({type:"MODAL_CLOSE"})},
    }
}
export default connect(mapStateToProps,mapDispatchToState)(Modal)
