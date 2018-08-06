import React, { Component } from 'react'
import Promise from 'bluebird'
import styled from 'styled-components'
import ErrorBoundary from './ErrorBoundary'
import Header from './Header'
import Progress from './Progress'
import Notes from "./Notes"
import TextField from './TextField'
import CircularProgress from 'material-ui/CircularProgress'

const Content = styled.div`
    max-width: 540px;
    margin: 0 auto;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    font-size: 24px;
    line-height: 1em;
    font-weight: 300;
    background-color: #1e1d23;
    color: #4d4d4e;
    text-transform: capitalize;
    overflow: hidden;
`;

const Loader = styled.div`
    text-align: center;
    display: flex;
    height: calc(100vh - 40px);
    margin: 0 auto;
    overflow: hidden;
    > * {
        margin: auto;
    }
`;

class App extends Component {
    state = {
        dataLoading: true,
        isOpenInput: false,
        inputValue: ''
    };

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        Promise.props({
            notes: fetch('http://localhost:3000/todos').then(response => response.json())

        }).then(res => {
            this.setState({
                notes: res.notes,
                dataLoading: false
            });
        });
    }

    handleClickPlus = () => () => {
        this.setState({
            isOpenInput: !this.state.isOpenInput
        });
    };

    handleClickCheckbox = (id, completed) => () => {
        const body = {
            _id: id,
            completed: !completed
        };

        return fetch('http://localhost:3000/todos', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
            .then(res => {
                const { status } = res;

                if (status === 200) {
                    return res.json();
                } else {
                    throw new Error(`Error load status ${status}`)
                }
            })
            .then(() => {
                this.loadData();
            })
            .catch(e => {
                console.error(e)
            })
    };

    handleInputChange = (ev) => {
        this.setState({
            inputValue: ev.target.value
        });
    };

    handleClickAddButton = () => () => {
        const { inputValue } = this.state;

        const body = {
            title: inputValue,
            completed: false,
            date: new Date()
        };

        return fetch('http://localhost:3000/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
            .then(res => {
                const { status } = res;

                if (status === 200) {
                    return res.json();
                } else {
                    throw new Error(`Error load status ${status}`)
                }
            })
            .then(() => {
                this.setState({
                    inputValue: ''
                });

                this.loadData();
            })
            .catch(e => {
                console.error(e)
            })
    };

    render () {
        const { notes, isOpenInput, inputValue } = this.state;
        if (!notes) return null;

        const styles = {
          color: '#ff3a53'
        };

        if (this.state.dataLoading) {
            return (
                <Loader>
                    <CircularProgress color={ styles.color }/>
                </Loader>
            );
        }

        return (
            <ErrorBoundary>
                <Content>
                    <Header
                        notes={notes}
                        onClick={this.handleClickPlus}
                        isOpen={isOpenInput}
                    />
                    <TextField
                        inputChange={this.handleInputChange}
                        clickAddButton={this.handleClickAddButton}
                        isOpen={isOpenInput}
                        inputValue={inputValue}
                    />
                    <Progress
                        notes={notes}
                    />
                    <Notes
                        notes={notes}
                        onClick={this.handleClickCheckbox}
                    />
                </Content>
            </ErrorBoundary>
        );
    }
};

export default App;