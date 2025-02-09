export default class Github {
    static githubRepoRegex = /^https:\/\/github\.com\/([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)(?:\/tree\/(.+))?$/;

    static getGithubUrlParts(url: string) {
        const match = this.githubRepoRegex.exec(url);
        if (!match) {
            throw new Error("Invalid GitHub repository URL");
        }

        return {
            owner: match[1],
            repo: match[2],
            ref: match[3] || null
        };
    }

    public static getFileDownloadLink(repo_url: string, path: string, ref?: string): string {
        const parts = this.getGithubUrlParts(repo_url);

        return `https://raw.githubusercontent.com/${parts.owner}/${parts.repo}/${ref ?? parts.ref ?? "main"}/${path}`;
    }

    public static getRepoDownloadLink(repo_url: string, ref?: string): string {
        const parts = this.getGithubUrlParts(repo_url);

        return `https://codeload.github.com/${parts.owner}/${parts.repo}/tar.gz/${ref ?? parts.ref ?? "main"}`;
    }
}