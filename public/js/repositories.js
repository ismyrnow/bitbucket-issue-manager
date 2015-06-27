/* global $, React */
/* eslint no-console:0 */

var RepositoryPanel = React.createClass({
  loadRepositoriesFromServer: function() {
    var component = this;
    $.getJSON(this.props.url).then(function (results) {
      var repos = results
        .sort(function (a, b) {
          return b.utc_last_updated.localeCompare(a.utc_last_updated);
        })
        .map(function (repo) {
          return {
            name: repo.name,
            account: repo.owner,
            slug: repo.slug
          };
        });

      component.setState({ data: repos });
    });
  },
  getInitialState: function() {
    return { data: [] };
  },
  componentDidMount: function() {
    this.loadRepositoriesFromServer();
    setInterval(this.loadRepositoriesFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <RepositoryList data={this.state.data} />
    );
  }
});

var RepositoryList = React.createClass({
  render: function() {
    var repoNodes = this.props.data.map(function (repo, i) {
      return (
        <Repository key={i} name={repo.name} account={repo.account} />
      );
    });
    return (
      <div className="repository-list">
        {repoNodes}
      </div>
    );
  }
});

var Repository = React.createClass({
  render: function() {
    return (
      <li>
        {this.props.account} / {this.props.name}
      </li>
    );
  }
});

React.render(
  <RepositoryPanel url="/api/repositories" pollInterval={10000} />,
  document.getElementById('panel-repositories')
);
