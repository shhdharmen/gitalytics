export type ThemeColor = 'primary' | 'accent' | 'warn';

export type LocalStorageKeys = 'isDark' | 'userName';

export const CONTRIBUTION_QUERY_LIST = [
  'totalIssueContributions',
  'totalCommitContributions',
  'totalRepositoryContributions',
  'totalPullRequestContributions',
  'totalPullRequestReviewContributions',
  'totalRepositoriesWithContributedIssues',
  'totalRepositoriesWithContributedCommits',
  'totalRepositoriesWithContributedPullRequests',
  'totalRepositoriesWithContributedPullRequestReviews',
] as const;

export const CONTRIBUTION_LIST = [
  'issue',
  'commit',
  'repository',
  'pull-request',
  'pull-request-review',
  'repositories-with-contributed-issues',
  'repositories-with-contributed-commits',
  'repositories-with-contributed-pull-requests',
  'repositories-with-contributed-pull-request-reviews',
] as const;

export type ContributionType = typeof CONTRIBUTION_LIST[number];

export type ContributionQueryType = typeof CONTRIBUTION_QUERY_LIST[number];

export type IconName = 'commit' | 'code-review' | 'issue-opened' | 'pull-request' | 'repo' | 'na';

export interface ShareModalData {
  title?: string;
  content: string;
  twitterIntent: string;
  year: string;
}

export interface TwentyShareCardType {
  cols: number;
  rows: number;
  tabCols: number;
  tabRows: number;
  queryType: ContributionQueryType;
  primaryData: number;
  secondaryData: {
    value: number;
    icon: string | IconName;
    isIconSVG: boolean;
    isApproximate?: boolean;
  }[];
  modalData: ShareModalData;
}
