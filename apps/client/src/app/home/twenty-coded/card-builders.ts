import { TotalContributionsQuery } from '../../generated/graphql';
import { buildTwitterIntent } from '../../shared/helpers';
import { TwentyShareCardType } from '../../shared/models';
import {
  buildCommitModal,
  buildIssueModal,
  buildPullRequestModal,
  buildRepoModal,
  buildReviewModal,
} from './modal-builders';

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
    tabCols: 2,
    tabRows: 1,
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
    tabCols: 2,
    tabRows: 1,
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
    primaryData: totalCommitContributions,
    secondaryData: [
      {
        icon: 'unfold',
        isIconSVG: true,
        value: totalRepositoriesWithContributedCommits,
      },
    ],
    queryType: 'totalCommitContributions',
  };

  return card;
}

export function buildIssueCard(data: TotalContributionsQuery): TwentyShareCardType {
  const user = data.user;
  const contributionsCollection = user.contributionsCollection;

  const login = user.login;
  const totalIssueContributions = contributionsCollection.totalIssueContributions;
  const totalRepositoriesWithContributedIssues =
    contributionsCollection.totalRepositoriesWithContributedIssues;

  let closedIssues = 0;

  contributionsCollection.issueContributions.edges.forEach((issue) => {
    closedIssues += issue?.node.issue.closed ? 1 : 0;
  });

  let card: TwentyShareCardType;

  card = {
    cols: 2,
    rows: 1,
    tabCols: 2,
    tabRows: 1,
    modalData: {
      content: buildIssueModal(
        login,
        totalIssueContributions,
        totalRepositoriesWithContributedIssues,
        closedIssues
      ),
      title: '2020 GitHub Repositories',
      twitterIntent: buildTwitterIntent(
        `I submitted total ${totalIssueContributions} issues,\n
        from them ${totalRepositoriesWithContributedIssues} were submitted in different repositories\n
        and ~${closedIssues} were closed in 2020 on GitHub!\n\n
        Find out yours!\n\n`
      ),
    },
    primaryData: totalIssueContributions,
    secondaryData: [
      {
        icon: 'issue-closed',
        isIconSVG: true,
        value: closedIssues,
      },
      {
        icon: 'unfold',
        isIconSVG: true,
        value: totalRepositoriesWithContributedIssues,
      },
    ],
    queryType: 'totalIssueContributions',
  };

  return card;
}

export function buildPullRequestCard(data: TotalContributionsQuery): TwentyShareCardType {
  const user = data.user;
  const contributionsCollection = user.contributionsCollection;

  const login = user.login;
  const totalPullRequestContributions = contributionsCollection.totalPullRequestContributions;
  const totalRepositoriesWithContributedPullRequests =
    contributionsCollection.totalRepositoriesWithContributedPullRequests;

  let mergedPRs = 0,
    closedPRs = 0;

  contributionsCollection.pullRequestContributions.edges.forEach((pr) => {
    mergedPRs += pr?.node?.pullRequest?.merged ? 1 : 0;
    closedPRs += pr?.node?.pullRequest?.closed ? 1 : 0;
  });

  let card: TwentyShareCardType;

  card = {
    cols: 2,
    rows: 1,
    tabCols: 2,
    tabRows: 1,
    modalData: {
      content: buildPullRequestModal(
        login,
        totalPullRequestContributions,
        totalRepositoriesWithContributedPullRequests,
        mergedPRs,
        closedPRs
      ),
      title: '2020 GitHub Repositories',
      twitterIntent: buildTwitterIntent(
        `I created total ${totalPullRequestContributions} PRs,\n
        from them ${totalRepositoriesWithContributedPullRequests} were created in different repositories,\n
        ~${mergedPRs} were merged\n
        and ~${closedPRs} were closed\n
        in 2020 on GitHub!\n\n
        Find out yours!\n\n`
      ),
    },
    primaryData: totalPullRequestContributions,
    secondaryData: [
      {
        icon: 'git-merge',
        isIconSVG: true,
        value: mergedPRs,
      },
      {
        icon: 'issue-closed',
        isIconSVG: true,
        value: closedPRs,
      },
      {
        icon: 'unfold',
        isIconSVG: true,
        value: totalRepositoriesWithContributedPullRequests,
      },
    ],
    queryType: 'totalPullRequestContributions',
  };

  return card;
}

export function buildReviewCard(data: TotalContributionsQuery): TwentyShareCardType {
  const user = data.user;
  const contributionsCollection = user.contributionsCollection;

  const login = user.login;
  const totalPullRequestReviewContributions =
    contributionsCollection.totalPullRequestReviewContributions;
  const totalRepositoriesWithContributedPullRequestReviews =
    contributionsCollection.totalRepositoriesWithContributedPullRequestReviews;

  let comments = 0,
    reactions = 0;

  contributionsCollection.pullRequestReviewContributions.edges.forEach((re) => {
    comments += re?.node?.pullRequestReview?.comments?.totalCount ?? 0;
    reactions += re?.node?.pullRequestReview?.reactions?.totalCount ?? 0;
  });

  let card: TwentyShareCardType;

  card = {
    cols: 2,
    rows: 1,
    tabCols: 2,
    tabRows: 1,
    modalData: {
      content: buildReviewModal(
        login,
        totalPullRequestReviewContributions,
        totalRepositoriesWithContributedPullRequestReviews,
        comments,
        reactions
      ),
      title: '2020 GitHub Repositories',
      twitterIntent: buildTwitterIntent(
        `I reviewed total ${totalPullRequestReviewContributions} PRs,\n
        from them ${totalRepositoriesWithContributedPullRequestReviews} were reviewed in different repositories,\n
        ~${comments} comments\n
        and ~${reactions} reactions were received\n
        in 2020 on GitHub!\n\n
        Find out yours!\n\n`
      ),
    },
    primaryData: totalPullRequestReviewContributions,
    secondaryData: [
      {
        icon: 'comment',
        isIconSVG: true,
        value: comments,
      },
      {
        icon: 'smiley',
        isIconSVG: true,
        value: reactions,
      },
      {
        icon: 'unfold',
        isIconSVG: true,
        value: totalRepositoriesWithContributedPullRequestReviews,
      },
    ],
    queryType: 'totalPullRequestReviewContributions',
  };

  return card;
}
