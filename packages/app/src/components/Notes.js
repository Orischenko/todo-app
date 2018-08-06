import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Note from './Note'

const UL = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    position: relative;
    overflow: scroll;
    max-height: 515px;
`;

const Notes = ({ notes, onClick }) => {
    return (
        <UL>
            {notes.map(note => {
                return (
                    <Note key={note._id} note={note} onClick={onClick}/>
                )
            })}
        </UL>
    );
};

Notes.propTypes = {
    notes: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Notes;