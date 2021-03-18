import React, { } from 'react';
import { connect } from 'react-redux'

import './Picturemodal.css'
import Backdrop from '../Backdrop/Backdrop'

const Picturemodal = (props) =>  {
        return (
            <div>
                <Backdrop show={props.show} clicked={props.modalclosed} />
                {props.show?<div className="Modalssss" style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                <div className="modalbuttonclose">
                    <button onClick={props.modalclosed}>CLOSE</button>
                </div>
                <div className="picturemodalpicture">
                    <img src={props.pic} alt="shoe"/>
                </div>
                </div>:null}
            </div >
        );
}
const mapStateToProps = state => {
    return{
        show:state.canvas.picturemodalshow,
        pic:state.canvas.picture
    }
}
const mapDispatchToState = dispatch => {
    return{
        modalclose:() => { dispatch({type:"MODAL_CLOSE"})},
        modalclosed:() => {dispatch({type:"PICTURE_MODAL_CLOSE"})}
    }
}
export default connect(mapStateToProps,mapDispatchToState)(Picturemodal)
