import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

const Form = styled.div`
    padding: 0 30px;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: ${({ isOpen }) => isOpen ? '88px' : 0};
    opacity: ${({ isOpen }) => isOpen ? 1 : 0};
    transition: all .5s ease;
    
    .text-field {
      flex: 0 1 100%;
    }
`;

const Input = ({ inputChange, clickAddButton, isOpen, inputValue }) => {
    const styles = {
        inputStyle: {
            color: '#fff'
        },
        underlineStyle: {
            borderColor: '#4d4d4e',
        },
        underlineFocusStyle: {
            borderColor: '#eb3248'
        },
        floatingLabelStyle: {
            color: '#4d4d4e',
        }
    };

    return (
        <Form isOpen={isOpen}>
            <TextField
                hintText="Hint Text"
                value={inputValue}
                hintStyle={styles.floatingLabelStyle}
                underlineStyle={styles.underlineStyle}
                underlineFocusStyle={styles.underlineFocusStyle}
                inputStyle={styles.inputStyle}
                onChange={inputChange}
                className='text-field'
            />
            <RaisedButton
                label="add task"
                secondary={true}
                style={{fontSize: '10px', lineHeight: '1em', marginLeft: '10px', minWidth: '100px'}}
                onClick={clickAddButton()}
            />
        </Form>
    );
};

Input.propTypes = {
    inputChange: PropTypes.func.isRequired,
    clickAddButton: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    inputValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default Input;