import { ContributionType, ContributionQueryType, IconName } from './models';

export const LOCAL_STORAGE_PRE = 'gitalytics-';

export const twentyFrom = new Date(2020, 0, 1).toISOString();
export const twentyTo = new Date(2020, 11, 31).toISOString();

export const CONTRIBUTION_DESCRIPTION: { [key in ContributionQueryType]: string } = {
  totalCommitContributions: 'How many commits were made by the user in this time span.',
  totalIssueContributions: 'How many issues the user opened.',
  totalPullRequestContributions: 'How many pull requests the user opened.',
  totalPullRequestReviewContributions: 'How many pull request reviews the user left.',
  totalRepositoriesWithContributedCommits:
    'How many different repositories the user opened pull requests in.',
  totalRepositoriesWithContributedIssues:
    'How many different repositories the user opened issues in.',
  totalRepositoriesWithContributedPullRequestReviews:
    'How many different repositories the user left pull request reviews in.',
  totalRepositoriesWithContributedPullRequests:
    'How many different repositories the user opened pull requests in.',
  totalRepositoryContributions: 'How many repositories the user created.',
};

export const CONTRIBUTION_TITLE: { [key in ContributionQueryType]: string } = {
  totalCommitContributions: 'Commits',
  totalIssueContributions: 'Issues',
  totalPullRequestContributions: 'Pull Requests',
  totalPullRequestReviewContributions: 'Pull Request Reviews',
  totalRepositoriesWithContributedCommits: 'Different Repo Commits',
  totalRepositoriesWithContributedIssues: 'Different Repo Issues',
  totalRepositoriesWithContributedPullRequestReviews: 'Different Repo Pull Request Reviews',
  totalRepositoriesWithContributedPullRequests: 'Different Repo Pull Requests',
  totalRepositoryContributions: 'Repositories',
};

export const CONTRIBUTION_TYPE: {
  [key in ContributionQueryType]: ContributionType;
} = {
  totalCommitContributions: 'commit',
  totalIssueContributions: 'issue',
  totalPullRequestContributions: 'pull-request',
  totalPullRequestReviewContributions: 'pull-request-review',
  totalRepositoriesWithContributedCommits: 'repositories-with-contributed-commits',
  totalRepositoriesWithContributedIssues: 'repositories-with-contributed-issues',
  totalRepositoriesWithContributedPullRequestReviews:
    'repositories-with-contributed-pull-request-reviews',
  totalRepositoriesWithContributedPullRequests: 'repositories-with-contributed-pull-requests',
  totalRepositoryContributions: 'repository',
};

export const CONTRIBUTION_ICON: {
  [key in ContributionQueryType]: IconName;
} = {
  totalCommitContributions: 'commit',
  totalIssueContributions: 'issue-opened',
  totalPullRequestContributions: 'pull-request',
  totalPullRequestReviewContributions: 'code-review',
  totalRepositoryContributions: 'repo',
  totalRepositoriesWithContributedCommits: 'na',
  totalRepositoriesWithContributedIssues: 'na',
  totalRepositoriesWithContributedPullRequestReviews: 'na',
  totalRepositoriesWithContributedPullRequests: 'na',
};
