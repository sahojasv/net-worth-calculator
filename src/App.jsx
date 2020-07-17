import React, { Component } from 'react';
import styled from 'styled-components';
import NetWorth from './components/NetWorth/NetWorth';
import NetWorthContainer from './components/NetWorth/NetWorthContainer';

const HeaderContainer = styled.div`
  position: relative;
`;

const Container = styled.main`
  position: absolute;
  top: 60px;
  left: 100px;
  margin-right: 20%;
  right: 0;
  bottom: 0;
  @media (max-width: 1600px) {
    left: 80px;
  }

  @media (max-width: 768px) {
    top: 60px;
    left: 0;
  }
`;

const Content = styled.div`
  position: relative;
  padding: 10px;
  min-height: calc(100vh - 166px);
`;

class App extends Component {
  render() {
    return (
      <div>
        <HeaderContainer>
          <nav className="navbar navbar-dark bg-dark">
              <div className="container-fluid">
                  <div className="navbar-header">
                      <a className="navbar-brand" href="#">Net Worth Calculator</a>
                  </div>
              </div>
          </nav>
        </HeaderContainer>
        <Container id="mainContainer">
          <NetWorthContainer/>
        </Container>
      </div>
    );
  }
}

export { App };
