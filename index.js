const contrast = require("get-contrast");
const simpleIcons = require('simple-icons');
const fs = require('fs');

const readme = [
  '# a11y markdown badges'
  ,''
  ,'accessible badges for your profile `README` and projects via [shields.io](https://shields.io) and [Simple Icons](https://github.com/simple-icons/simple-icons)'
  ,''
  ,'## use'
  ,''
  ,'- copy the markdown snippet and paste it in your markdown file'
  ,'- customize as you see fit - badge style, colors, etc. (see [shields.io](https://shields.io) for documentation)'
  ,''
  ,'## limitations'
  ,''
  ,'currently, we have no control over the font color, so we can still end up with badges of poor contrast.  there is [an open issue at shields.io](https://github.com/badges/shields/issues/5497) for this.'
  ,'until that gets resolved, for any poor contrast badges, I suggest darkening the colors in the snippet until it meets WCAG AA.  although this sacrifices some brand identity, it is more important that we accommodate folks with visual issues.'
  ,''
  ,'## the badges'
  ,''
  ,'| Name | Badge | Markdown Snippet |'
  ,'| --- | --- | --- |'
];

for (const iconSlug in simpleIcons) {

  const icon = simpleIcons.Get(iconSlug);

  let fgColor = 'white';

  if(!contrast.isAccessible(`#${icon.hex}`, fgColor)){

    fgColor = 'black';
    
    if(!contrast.isAccessible(`#${icon.hex}`, fgColor)){
      throw new Error(`can't find good contrast for: ${icon.title} - #${icon.hex}`)
    }
    
  }

  const badgeURL = `https://img.shields.io/badge/${icon.title.replace(/ /g,'_').replace(/-/g,'--')}-${icon.hex}.svg?style=for-the-badge&logo=${icon.slug}&logoColor=${fgColor}`
  const badgeLine = `|${icon.title}|![${icon.title}](${badgeURL})|\`![${icon.title}](${badgeURL})\`|`;

  readme.push(badgeLine);

}

readme.push(
    ''
    ,'## implementation details'
    ,''
    ,'- iterates over all [Simple Icons](https://github.com/simple-icons/simple-icons)'
    ,'- checks if a white foreground meets WCAG AA contrast requirements for accessibility (a11y)'
    ,'- if white does not provide accessible contrast for the background color, it uses black (and confirms black provides accessible contrast)'
    ,'- generates this file'
    ,''
    ,'## inspiration'
    ,''
    ,'inspired by [Markdown Badges](https://github.com/Ileriayo/markdown-badges), I wanted an automated way to generate accessible contrast versions of all the badges'
)

fs.writeFileSync("README.md", readme.join('\n'));