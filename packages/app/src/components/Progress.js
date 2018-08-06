import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Bar = styled.div`
    height: 11px;
    width: 100%;
    background-color: #000;
    position: relative;
    
    span {
        height: 100%;
        width: ${({ width }) => width}%;
        display: inline-block;
        position:absolute;
        top: 0;
        left: 0;
        transition: all .3s ease;
        background: -webkit-linear-gradient(left, #eb3248 40%,#f45c85 79%);
        
        i {
            font-size: 9px;
            line-height: 1em;
            font-weight: 300;
            color: #fff;
            font-style: normal;
            position: absolute;
            top: 50%;
            right: 0;
            transform: translate(calc(100% + 3px), -50%);
        }
    }  
`;

const Progress = ({ notes }) => {
    const max = notes.length;
    const completed = notes.filter(note => note.completed).length;
    const persents = 100 / (max/completed);
    const value = Math.round(persents * 10) / 10;

    return (
        <Bar width={value}><span><i>{value}%</i></span></Bar>
    );
};

Progress.propTypes = {
    notes: PropTypes.array.isRequired
};

export default Progress;