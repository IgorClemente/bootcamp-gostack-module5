import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Container from '../../components/container';

import {
  Loading,
  Owner,
  IssuesList,
  FilterSwitch,
  FilterButton,
  PageSwitch,
  PageButton,
  PageIndicator,
  NotFound,
} from './styles';

import api from '../../services/api';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    page: 1,
    loading: true,
    noPreviousPage: true,
    issuesNotFound: false,
  };

  async componentDidMount() {
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
        },
      }),
    ]);

    const issuesNotFound = issues.data.length === 0 ? true : false;

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
      issuesNotFound,
    });
  }

  async handleFilterButton(filter) {
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);
    const response = await api.get(`/repos/${repoName}/issues?state=${filter}`);

    this.setState({
      issues: [...response.data],
    });
  }

  async handleChangePage() {
    const { page } = this.state;
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);
    const response = await api.get(`/repos/${repoName}/issues?page=${page}`);

    this.setState({
      issues: response.data,
    });
  }

  handlePageButton(action) {
    const { page } = this.state;

    if (page - 1 === 1 && action === '-') {
      this.setState({
        noPreviousPage: true,
        page: page - 1,
      });
      return;
    }

    const nextPage = action === '+' ? page + 1 : page - 1;

    this.setState({
      noPreviousPage: false,
      page: nextPage,
    });

    this.handleChangePage();
  }

  render() {
    const {
      repository,
      issues,
      loading,
      page,
      noPreviousPage,
      issuesNotFound,
    } = this.state;

    if (loading) {
      return <Loading>Carregando ...</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        {issuesNotFound && (
          <NotFound>Esse repositório não possui issues</NotFound>
        )}

        <IssuesList notFound={issuesNotFound}>
          <FilterSwitch>
            <FilterButton
              onClick={() => {
                this.handleFilterButton('open');
              }}
            >
              Aberto
            </FilterButton>
            <FilterButton
              onClick={() => {
                this.handleFilterButton('closed');
              }}
            >
              Fechado
            </FilterButton>
            <FilterButton
              onClick={() => {
                this.handleFilterButton('all');
              }}
            >
              Todos
            </FilterButton>
          </FilterSwitch>

          {issues.map(issue => (
            <li key={issue.name}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={label.name}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}

          <PageSwitch>
            <PageButton
              noPreviousPage={noPreviousPage}
              onClick={() => {
                this.handlePageButton('-');
              }}
            >
              Anterior
            </PageButton>
            <PageIndicator>{page}</PageIndicator>
            <PageButton
              onClick={() => {
                this.handlePageButton('+');
              }}
            >
              Próxima
            </PageButton>
          </PageSwitch>
        </IssuesList>
      </Container>
    );
  }
}
