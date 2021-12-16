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

export function buildRepoCard(data: TotalContributionsQuery, year: string): TwentyShareCardType {
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
      content: buildRepoModal(login, repositoriesCount, starCount, forkCount, year),
      twitterIntent: buildTwitterIntent(
        `I created ${repositoriesCount} 📘 repositories, they got ${starCount} ⭐s and were forked ${forkCount} times!\n\n Find out yours!\n\n`,
        year
      ),
      year,
    },
    primaryData: contributionsCollection.totalRepositoryContributions,
    secondaryData: [
      {
        icon: 'star-fill',
        isIconSVG: true,
        value: starCount,
        isApproximate: true,
      },
      {
        icon: 'git-fork',
        isIconSVG: true,
        value: forkCount,
        isApproximate: true,
      },
    ],
    queryType: 'totalRepositoryContributions',
  };

  return card;
}

export function buildCommitCard(data: TotalContributionsQuery, year: string): TwentyShareCardType {
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
        totalRepositoriesWithContributedCommits,
        year
      ),
      twitterIntent: buildTwitterIntent(
        `I pushed total ${totalCommitContributions} commits, from them ${totalRepositoriesWithContributedCommits} were pushed in different repositories in ${year} on GitHub!\n\n Find out yours!\n\n`,
        year
      ),
      year,
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

export function buildIssueCard(data: TotalContributionsQuery, year: string): TwentyShareCardType {
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
        closedIssues,
        year
      ),
      twitterIntent: buildTwitterIntent(
        `I submitted total ${totalIssueContributions} issues,\n
        from them ${totalRepositoriesWithContributedIssues} were submitted in different repositories\n
        and ~${closedIssues} were closed in ${year} on GitHub!\n\n
        Find out yours!\n\n`,
        year
      ),
      year,
    },
    primaryData: totalIssueContributions,
    secondaryData: [
      {
        icon: 'issue-closed',
        isIconSVG: true,
        value: closedIssues,
        isApproximate: true,
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

export function buildPullRequestCard(
  data: TotalContributionsQuery,
  year: string
): TwentyShareCardType {
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
        closedPRs,
        year
      ),
      twitterIntent: buildTwitterIntent(
        `I created total ${totalPullRequestContributions} PRs,\n
        from them ${totalRepositoriesWithContributedPullRequests} were created in different repositories,\n
        ~${mergedPRs} were merged\n
        and ~${closedPRs} were closed\n
        in ${year} on GitHub!\n\n
        Find out yours!\n\n`,
        year
      ),
      year,
    },
    primaryData: totalPullRequestContributions,
    secondaryData: [
      {
        icon: 'git-merge',
        isIconSVG: true,
        value: mergedPRs,
        isApproximate: true,
      },
      {
        icon: 'issue-closed',
        isIconSVG: true,
        value: closedPRs,
        isApproximate: true,
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

export function buildReviewCard(data: TotalContributionsQuery, year: string): TwentyShareCardType {
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
        reactions,
        year
      ),
      twitterIntent: buildTwitterIntent(
        `I reviewed total ${totalPullRequestReviewContributions} PRs,\n
        from them ${totalRepositoriesWithContributedPullRequestReviews} were reviewed in different repositories,\n
        ~${comments} comments\n
        and ~${reactions} reactions were received\n
        in ${year} on GitHub!\n\n
        Find out yours!\n\n`,
        year
      ),
      year,
    },
    primaryData: totalPullRequestReviewContributions,
    secondaryData: [
      {
        icon: 'comment',
        isIconSVG: true,
        value: comments,
        isApproximate: true,
      },
      {
        icon: 'smiley',
        isIconSVG: true,
        value: reactions,
        isApproximate: true,
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
