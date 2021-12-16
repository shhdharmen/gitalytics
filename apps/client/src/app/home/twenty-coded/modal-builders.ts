export function buildRepoModal(
  login: string,
  repositoriesCount: number,
  starCount: number,
  forkCount: number,
  year: string
): string {
  return `<div class="rounded bg-primary text-white p-3 my-3 position-relative share-div">
  <div class="share-content">
    <div
      class="m-n3 px-3 py-1 bg-accent rounded-top share-title"
    >
      <p class="mb-0">
        ${year} GitHub Contributions for <span class="highlight">${login}</span>
      </p>
    </div>
    <div class="mb-4"></div>
    <h2 class="mat-display-1">
      They created<br /><span class="highlight">${repositoriesCount} repositories</span
      ><br />
      in ${year}!
    </h2>
    <h2>
      Their repositories got <span class="highlight">~${starCount} stars</span>.
    </h2>
    <h2>
      Their repositories were <span class="highlight">forked ~${forkCount}</span> times.
    </h2>
    <div class="mb-4"></div>
    <div class="bg-dark m-n3 px-3 py-1 rounded-bottom">
      <div class="row align-items-center">
        <div class="col">
          <p class="mb-0">
            <img
              src="../../../../assets/gitalytics.png"
              height="24"
              width="24"
              alt="Gitalytics"
              srcset=""
              class="align-middle"
            />
            Gitalytics
          </p>
        </div>
        <div class="col text-right">
          <p class="mb-0">#${year}Coded</p>
        </div>
      </div>
    </div>
  </div>
  <div class="share-bg repo-bg"></div>
</div>
<p>ℹ Star and fork count are calculated from <br> 1st 100 <a href="https://docs.github.com/en/free-pro-team@latest/graphql/reference/objects#createdrepositorycontribution" target="_blank" rel="noopener noreferrer"><code>CreatedRepositoryContribution</code></a> of ${year}.</p>`;
}

export function buildCommitModal(
  login: string,
  totalCommitContributions: number,
  totalRepositoriesWithContributedCommits: number,
  year: string
): string {
  return `<div class="rounded bg-primary text-white p-3 my-3 position-relative share-div">
  <div class="share-content">
    <div
      class="m-n3 px-3 py-1 bg-accent rounded-top share-title"
    >
      <p class="mb-0">
        ${year} GitHub Contributions for <span class="highlight">${login}</span>
      </p>
    </div>
    <div class="mb-4"></div>
    <h2 class="mat-display-1">
      They pushed<br /><span class="highlight">${totalCommitContributions} commits</span
      ><br />
      in ${year}!
    </h2>
    <h2>
      Out of which,
      <span class="highlight">${totalRepositoriesWithContributedCommits} commits</span>
      were pushed in<br />different repositories.
    </h2>
    <div class="mb-4"></div>
    <div class="bg-dark m-n3 px-3 py-1 rounded-bottom">
      <div class="row align-items-center">
        <div class="col">
          <p class="mb-0">
            <img
              src="../../../../../assets/gitalytics.png"
              height="24"
              width="24"
              alt="Gitalytics"
              srcset=""
              class="align-middle"
            />
            Gitalytics
          </p>
        </div>
        <div class="col text-right">
          <p class="mb-0">#${year}Coded</p>
        </div>
      </div>
    </div>
  </div>
  <div class="share-bg commit-bg"></div>
</div>`;
}

export function buildIssueModal(
  login: string,
  totalIssueContributions: number,
  totalRepositoriesWithContributedIssues: number,
  closedIssues: number,
  year: string
): string {
  return `<div class="rounded bg-primary text-white p-3 my-3 position-relative share-div">
  <div class="share-content">
    <div
      class="m-n3 px-3 py-1 bg-accent rounded-top share-title"
    >
      <p class="mb-0">
        ${year} GitHub Contributions for <span class="highlight">${login}</span>
      </p>
    </div>
    <div class="mb-4"></div>
    <h2 class="mat-display-1">
      They submitted<br /><span class="highlight">${totalIssueContributions} issues</span
      ><br />
      in ${year}!
    </h2>
    <h2>
      Out of which,
      <span class="highlight">${totalRepositoriesWithContributedIssues} issues</span>
      were <span class="highlight">submitted in<br />different repositories</span>.
    </h2>
    <h2>
      And
      <span class="highlight">~${closedIssues} issues</span>
      were <span class="highlight">closed</span>.
    </h2>
    <div class="mb-4"></div>
    <div class="bg-dark m-n3 px-3 py-1 rounded-bottom">
      <div class="row align-items-center">
        <div class="col">
          <p class="mb-0">
            <img
              src="../../../../../assets/gitalytics.png"
              height="24"
              width="24"
              alt="Gitalytics"
              srcset=""
              class="align-middle"
            />
            Gitalytics
          </p>
        </div>
        <div class="col text-right">
          <p class="mb-0">#${year}Coded</p>
        </div>
      </div>
    </div>
  </div>
  <div class="share-bg issue-bg"></div>
</div>
<p>ℹ Closed issues count is calculated from <br> 1st 100 <a href="https://docs.github.com/en/free-pro-team@latest/graphql/reference/objects#createdissuecontribution" target="_blank" rel="noopener noreferrer"><code>CreatedIssueContribution</code></a> of ${year}.</p>`;
}

export function buildPullRequestModal(
  login: string,
  totalPullRequestContributions: number,
  totalRepositoriesWithContributedPullRequests: number,
  mergedPRs: number,
  closedPRs: number,
  year: string
): string {
  return `<div class="rounded bg-primary text-white p-3 my-3 position-relative share-div">
  <div class="share-content">
    <div
      class="m-n3 px-3 py-1 bg-accent rounded-top share-title"
    >
      <p class="mb-0">
        ${year} GitHub Contributions for <span class="highlight">${login}</span>
      </p>
    </div>
    <div class="mb-4"></div>
    <h2 class="mat-display-1">
      They created<br /><span class="highlight">${totalPullRequestContributions} pull requests</span
      ><br />
      in ${year}!
    </h2>
    <h2>
      Out of which,
      <span class="highlight">${totalRepositoriesWithContributedPullRequests} PRs</span>
      were <span class="highlight">created in<br />different repositories</span>.
    </h2>
    <h2>
      And
      <span class="highlight">~${mergedPRs} PRs</span>
      were <span class="highlight">merged</span> & <span class="highlight">~${closedPRs} PRs</span>
      were <span class="highlight">closed</span>.
    </h2>
    <div class="mb-4"></div>
    <div class="bg-dark m-n3 px-3 py-1 rounded-bottom">
      <div class="row align-items-center">
        <div class="col">
          <p class="mb-0">
            <img
              src="../../../../../assets/gitalytics.png"
              height="24"
              width="24"
              alt="Gitalytics"
              srcset=""
              class="align-middle"
            />
            Gitalytics
          </p>
        </div>
        <div class="col text-right">
          <p class="mb-0">#${year}Coded</p>
        </div>
      </div>
    </div>
  </div>
  <div class="share-bg pr-bg"></div>
</div>
<p>ℹ Closed and merged PR count is calculated from <br> 1st 100 <a href="https://docs.github.com/en/free-pro-team@latest/graphql/reference/objects#createdpullrequestcontribution" target="_blank" rel="noopener noreferrer"><code>CreatedPullRequestContribution</code></a> of ${year}.</p>`;
}

export function buildReviewModal(
  login: string,
  totalPullRequestReviewContributions: number,
  totalRepositoriesWithContributedPullRequestReviews: number,
  comments: number,
  reactions: number,
  year: string
): string {
  return `<div class="rounded bg-primary text-white p-3 my-3 position-relative share-div">
  <div class="share-content">
    <div
      class="m-n3 px-3 py-1 bg-accent rounded-top share-title"
    >
      <p class="mb-0">
        ${year} GitHub Contributions for <span class="highlight">${login}</span>
      </p>
    </div>
    <div class="mb-4"></div>
    <h2 class="mat-display-1">
      They <span class="highlight">
      reviewed ${totalPullRequestReviewContributions}
      </span><br>
      PRs in ${year}!
    </h2>
    <h2>
      Out of which,
      <span class="highlight">${totalRepositoriesWithContributedPullRequestReviews} reviews</span>
      were done in<br />different repositories</span>.
    </h2>
    <h2>
      And
      <span class="highlight">~${comments} comments</span> & <span class="highlight">~${reactions} reactions</span>
      were received.
    </h2>
    <div class="mb-4"></div>
    <div class="bg-dark m-n3 px-3 py-1 rounded-bottom">
      <div class="row align-items-center">
        <div class="col">
          <p class="mb-0">
            <img
              src="../../../../../assets/gitalytics.png"
              height="24"
              width="24"
              alt="Gitalytics"
              srcset=""
              class="align-middle"
            />
            Gitalytics
          </p>
        </div>
        <div class="col text-right">
          <p class="mb-0">#${year}Coded</p>
        </div>
      </div>
    </div>
  </div>
  <div class="share-bg review-bg"></div>
</div>
<p>ℹ Comments and reactions count is calculated from <br> 1st 100 <a href="https://docs.github.com/en/free-pro-team@latest/graphql/reference/objects#createdpullrequestreviewcontribution" target="_blank" rel="noopener noreferrer"><code>CreatedPullRequestReviewContribution</code></a> of ${year}.</p>`;
}
