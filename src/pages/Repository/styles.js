import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  height: 100vh;
  display: flex;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    margin-top: 30px;
    height: 120px;
    display: flex;
    border-radius: 50%;
  }

  h1 {
    margin-top: 10px;
    font-size: 30px;
    color: #000;
    font-weight: bold;
  }

  p {
    margin-top: 10px;
    font-size: 20px;
    color: #999;
  }

  link {
    text-decoration: none;
    color: #7159c1;
    font-size: 15px;
  }
`;

export const IssuesList = styled.ul.attrs(props => ({
  disabled: props.notFound,
}))`
  &[disabled] {
    display: none;
  }

  margin-top: 20px;
  border-top: 1px solid #eee;
  list-style: none;

  strong {
    span {
      margin: 0 5px;
      height: 25px;
      padding: 5px;
      background: #999;
      color: #eee;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }

  div {
    margin-left: 10px;
    line-height: 25px;

    p {
      font-size: 15px;
    }

    strong {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }
  }

  li {
    padding: 15px;
    display: flex;
    flex-direction: row;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 15px;
    }
  }

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #eee;
  }

  a {
    text-decoration: none;
    font-size: 17px;
  }
`;

export const FilterSwitch = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin: 20px 0;
`;

export const FilterButton = styled.button`
  border: none;
  border-radius: 4px;
  margin-right: 10px;
  padding: 20px;
  font-size: 16px;
  color: #fff;
  background: #7159c1;
  height: 30px;
  width: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const PageSwitch = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const PageButton = styled.button.attrs(props => ({
  disabled: props.noPreviousPage,
}))`
  border: none;
  border-radius: 4px;
  background: #7159c1;
  color: #fff;
  height: 40px;
  width: 100px;

  &[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const PageIndicator = styled.div`
  font-size: 13px;
  font-weight: bold;
  border-radius: 4px;
  background: #7159c1;
  color: #fff;
  margin: 0 10px;
  padding: 20px;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NotFound = styled.h1`
  width: 100%;
  margin: 30px 0 20px;
  color: #000;
  font-size: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
