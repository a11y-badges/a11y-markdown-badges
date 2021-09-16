const simpleIcons = require('simple-icons');
const fs = require('fs');

const readmeStart =
`# a11y markdown badges

[accessible](https://www.w3.org/WAI/fundamentals/accessibility-intro/) markdown badges for profile and project READMEs (and everything else!) via [a11y badges
](https://github.com/a11y-badges/a11y-badges)

__note: this is a list of badges created from [simple icons](https://simpleicons.org)  for easy cut/paste to your READMEs.  for icons created from [feather icons](https://feathericons.com), or your own custom icon/logo, see [a11y badges
](https://github.com/a11y-badges/a11y-badges)__

## use

- copy the markdown snippet and paste it in your markdown file
- customize as you see fit - badge style, colors, etc. (see [a11y badges
](https://github.com/a11y-badges/a11y-badges) for documentation)

## the badges

you may want to visit the [README](README.md) file directly to better see the badges, as they should appear larger there.

| Name | Badge | Markdown Snippet |
| --- | --- | --- |
`;

const badgeLines = [];

for (const iconSlug of Object.keys(simpleIcons)) {

  const icon = simpleIcons.Get(iconSlug);

  const badgeURL = `https://a11ybadges.com/badge?logo=${iconSlug}`;

  const badgeLine = `|${icon.title}|![${icon.title}](${badgeURL})|\`![${icon.title}](${badgeURL})\`|`;

  badgeLines.push(badgeLine);

}

const readmeEnd =
`

## implementation details

- iterates over all [Simple Icons](https://github.com/simple-icons/simple-icons)
- generates this file

## inspiration

inspired by [Markdown Badges](https://github.com/Ileriayo/markdown-badges), I wanted an automated way to generate accessible contrast versions of all the [simple icons](https://simpleicons.org) badges
`;

const readme = readmeStart + badgeLines.join('\n') + readmeEnd;

fs.writeFileSync('README.md', readme);
