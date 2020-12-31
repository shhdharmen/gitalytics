export function buildRepoModal(
  login: string,
  repositoriesCount: number,
  starCount: number,
  forkCount: number
): string {
  return `<div class="rounded bg-primary text-white p-3 my-3 position-relative share-div">
  <div class="share-content">
    <div
      class="m-n3 px-3 py-1 bg-accent rounded-top share-title"
    >
      <p class="mb-0">
        2020 Coded for <span class="highlight">${login}</span>
      </p>
    </div>
    <div class="mb-4"></div>
    <h2 class="mat-display-1">
      They created<br /><span class="highlight">${repositoriesCount} repositories</span
      ><br />
      in 2020!
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
          <p class="mb-0">#2020Coded</p>
        </div>
      </div>
    </div>
  </div>
  <div class="share-bg repo-bg"></div>
</div>`;
}

export function buildCommitModal(
  login: string,
  totalCommitContributions: number,
  totalRepositoriesWithContributedCommits: number
): string {
  return `<div class="rounded bg-primary text-white p-3 my-3 position-relative share-div">
  <div class="share-content">
    <div
      class="m-n3 px-3 py-1 bg-accent rounded-top share-title"
    >
      <p class="mb-0">
        2020 Coded for <span class="highlight">${login}</span>
      </p>
    </div>
    <div class="mb-4"></div>
    <h2 class="mat-display-1">
      They pushed<br /><span class="highlight">${totalCommitContributions} commits</span
      ><br />
      in 2020!
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
          <p class="mb-0">#2020Coded</p>
        </div>
      </div>
    </div>
  </div>
  <div class="share-bg commit-bg"></div>
</div>`;
}
