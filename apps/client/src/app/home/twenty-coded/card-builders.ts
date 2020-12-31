import { TotalContributionsQuery } from '../../generated/graphql';
import { buildTwitterIntent } from '../../shared/helpers';
import { TwentyShareCardType } from '../../shared/models';
import { buildCommitModal, buildRepoModal } from './modal-builders';

export function buildRepoCard(data: TotalContributionsQuery): TwentyShareCardType {
  let forkCount = 0,
    forkedFromCount = 0,
    starCount = 0;

  const user = data.user;
  const contributionsCollection = user.contributionsCollection;

  contributionsCollection.repositoryContributions.edges.forEach((item) => {
    forkCount += item.node.repository.forkCount;
    forkedFromCount += item.node.repository.isFork ? 1 : 0;
    starCount += item.node.repository.stargazerCount;
  });

  const login = user.login;
  const repositoriesCount = contributionsCollection.totalRepositoryContributions;

  let card: TwentyShareCardType;

  card = {
    cols: 2,
    rows: 1,
    modalData: {
      content: buildRepoModal(login, repositoriesCount, starCount, forkCount),
      title: '2020 GitHub Repositories',
      twitterIntent: buildTwitterIntent(
        `I created ${repositoriesCount} 📘 repositories, they got ${starCount} ⭐s and were forked ${forkCount} times!\n\n Find out yours!\n\n`
      ),
    },
    primaryData: contributionsCollection.totalRepositoryContributions,
    secondaryData: [
      {
        icon: 'star-fill',
        isIconSVG: true,
        value: starCount,
      },
      {
        icon: 'git-fork',
        isIconSVG: true,
        value: forkCount,
      },
    ],
    queryType: 'totalRepositoryContributions',
  };

  return card;
}

export function buildCommitCard(data: TotalContributionsQuery): TwentyShareCardType {
  const user = data.user;
  const contributionsCollection = user.contributionsCollection;

  const login = user.login;
  const totalCommitContributions = contributionsCollection.totalCommitContributions;
  const totalRepositoriesWithContributedCommits =
    contributionsCollection.totalRepositoriesWithContributedCommits;

  let card: TwentyShareCardType;

  card = {
    cols: 2,
    rows: 1,
    modalData: {
      content: buildCommitModal(
        login,
        totalCommitContributions,
        totalRepositoriesWithContributedCommits
      ),
      title: '2020 GitHub Repositories',
      twitterIntent: buildTwitterIntent(
        `I pushed total ${totalCommitContributions} commits, from them ${totalRepositoriesWithContributedCommits} were pushed in different repositories in 2020 on GitHub!\n\n Find out yours!\n\n`
      ),
    },
    primaryData: contributionsCollection.totalCommitContributions,
    secondaryData: [
      {
        icon: 'unfold',
        isIconSVG: true,
        value: contributionsCollection.totalRepositoriesWithContributedCommits,
      },
    ],
    queryType: 'totalCommitContributions',
  };

  return card;
}
