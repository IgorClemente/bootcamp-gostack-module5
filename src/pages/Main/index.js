import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Container from '../../components/container';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Form, SubmitButton, Header, List } from './styles';

import api from '../../services/api';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    repositoryNotFound: false,
  };

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (repositories !== prevState.repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true, repositoryNotFound: false });

    const { repositories, newRepo } = this.state;

    try {
      const checkExistsRepository = repositories.find(({ name }) => {
        return name === newRepo;
      });

      if (checkExistsRepository) {
        throw new Error('Repository already exists');
      }

      const response = await api.get(`/repos/${this.state.newRepo}`);

      const data = {
        name: response.data.full_name,
      };

      this.setState({
        loading: false,
      });

      this.setState({
        repositories: [...this.state.repositories, data],
        newRepo: '',
      });
    } catch (e) {
      this.setState({
        loading: false,
        repositoryNotFound: true,
      });
    }
  };

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  render() {
    const { newRepo, loading, repositories, repositoryNotFound } = this.state;

    return (
      <Container>
        <Header>
          <FaGithubAlt />
          Repositórios
        </Header>

        <Form onSubmit={this.handleSubmit} notFound={repositoryNotFound}>
          <input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton loadingSpinner={loading}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
