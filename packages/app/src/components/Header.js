import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ContentAdd from 'material-ui/svg-icons/content/add'

const Container = styled.div`
    padding: 20px 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    
    .add-button {
      transform: ${({ isOpen }) => isOpen ? 'rotate(45deg)' : 'rotate(0deg)'};
    }
`;

const FloatingActionButton = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: -webkit-linear-gradient(top, #ff5b84 30%,#ff3a53 67%);
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.8) 0px 3px 10px;
    transition: all .3s ease;
    
    &:active {
      box-shadow: rgba(0, 0, 0, 0.4) 0px 10px 30px, rgba(0, 0, 0, 0.46) 0px 6px 10px;
    }
`;

const Header = ({ notes, onClick, isOpen }) => {
    const notCompleted = notes.filter(note => !note.completed).length;

    return (
        <Container isOpen={isOpen}>
            <span>{notCompleted} open task{notCompleted > 1 && 's'}</span>
            <FloatingActionButton onClick={onClick('click')}>
                <ContentAdd color={'#fff'} className='add-button'/>
            </FloatingActionButton>
        </Container>
    );
};

Header.propTypes = {
    notes: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired
};

export default Header;