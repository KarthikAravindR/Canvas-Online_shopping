import React from 'react';
import { connect } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle} from '@fortawesome/free-solid-svg-icons';

import './Toast.css'

const Toast = (props) =>  {
        return (
            <div>
                <div className="Toast" style={{
                    transform: props.show  ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                    <div className="delete1" style={!props.completed ? {margin:"0 8px"}: {margin:"0 8px 0 auto"}}><FontAwesomeIcon icon={faCheckCircle}/></div>
                    <div>Added To Bag</div>
                </div>
                <div className="Toast" style={{
                    transform: props.show1  ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show1 ? '1' : '0'
                }}>
                    <div className="delete1" style={!props.completed ? {margin:"0 8px"}: {margin:"0 8px 0 auto"}}><FontAwesomeIcon icon={faCheckCircle}/></div>
                    <div>Added To Wishlist</div>
                </div>
                <div className="Toast" style={{
                    transform: props.show2  ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show2 ? '1' : '0'
                }}>
                    <div className="delete1" style={!props.completed ? {margin:"0 8px"}: {margin:"0 8px 0 auto"}}><FontAwesomeIcon icon={faCheckCircle}/></div>
                    <div>Order Placed</div>
                </div>
            </div >
        );
}
const mapStateToProps = state => {
    return{
        show: state.canvas.successfullydeleted,
        show1: state.canvas.successfullywishlisted,
        show2: state.order.orderplaced
    }
}

export default connect(mapStateToProps)(Toast)
