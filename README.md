# prismatic-soul-site

Website for Prismatic Soul — book, classes, retreats, coaching and mentoring.
Live at https://prismatic-soul.com, deployed by Cloudflare Pages from `main`.

## The site lives in `public/`

**Cloudflare Pages must have its Build output directory set to `public`.** Do not move
the site files back to the repository root.

Pages treats its assets directory as everything in that folder and rejects any file over
25 MiB — including Git's own packfile in `.git/`, which it should ignore but does not
(cloudflare/workerd#4336). Once the repository carried audio, `.git/objects/pack/*.pack`
grew past 25 MiB and every build failed with:

    Cloudflare Workers supports assets with sizes of up to 25 MiB. We found a file
    /opt/buildhome/repo/.git/objects/pack/pack-….pack with a size of 41.7 MiB.

Keeping the site in `public/` puts `.git` outside the scanned directory, so history can
grow freely. Note that deleting large files in a later commit does *not* fix this on its
own — the blobs stay in history and the packfile stays large.

Individual assets must still be under 25 MiB. The largest today is an 11 MB MP3. If the
audio library grows substantially, move it to R2 rather than the repository.

## Layout

    public/            everything served
      audio/           practice recordings (MP3, normalised to -16 LUFS)
      css/ js/ images/ favicons/ content/
      _redirects       301s, including the withdrawn resources wing
      sitemap.xml robots.txt
    README.md .gitignore   root only, never served
