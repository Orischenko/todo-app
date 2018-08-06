import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'
import Done from 'material-ui/svg-icons/action/done'

const LI = styled.li`
    margin: 0;
    padding: 15px 30px 15px 60px;
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all .5s ease;
    background-color: ${({ isCompleted }) => !isCompleted ? 'transparent' : '#17161a'};
    
    &:before {
        content: '';
        display: inline-block;
        position:absolute;
        top: 50%;
        left: 29px;
        width: 13px;
        height: 13px;
        border-radius: 50%;
        background-color: #2d2c31;
        z-index: 0;
        transform: translateY(-100%);
        box-shadow: 0 0 5px 0 rgba(0,0,0,.9);
        ${({ isCompleted }) => !isCompleted && 'background: -webkit-linear-gradient(top, #ff5b84 30%,#ff3a53 67%);'};
    }
    
    &:after {
        content: '';
        display: inline-block;
        width: 1px;
        height: 100%;
        background: #3b3a3f;
        position: absolute;
        top: 0;
        left: 35px;
        z-index: -1;
    }
 
    .date {
      font-size: 12px;
      line-height: 1em;
      font-weight: 300;
      margin-bottom: 2px;
      color: ${({ isCompleted }) => !isCompleted ? '#a7a7a8' : '#40404c'};
    }
    
    .title {
      color: ${({ isCompleted }) => !isCompleted ? '#fff' : 'inherit'};
      margin-bottom: 5px;
    }
    
    .checkbox {
        height: 36px;
        width: 52px;
        background-color: ${({ isCompleted }) => !isCompleted ? '#4a484e' : '#363539'};
        border-radius: 18px;
        box-shadow: 0 0 3px 0 rgba(0,0,0,.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const Note = ({ note, onClick }) => {
    const date = moment(note.date).format('MMM DD, h:mm A');

    return (
        <LI isCompleted={note.completed}>
            <div>
                <div className='date'>{!note.completed ? date : 'Done task'}</div>
                <div className='title'>{note.title}</div>
            </div>
            <span className='checkbox' onClick={onClick(note._id, note.completed)}>{note.completed && <Done/>}</span>
        </LI>
    );
};

Note.propTypes = {
    note: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Note;