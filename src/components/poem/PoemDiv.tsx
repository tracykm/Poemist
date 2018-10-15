import styled from "styled-components";
import { sizes, color } from "src/components/universal/_variables";
const paperTextureImg = require("src/images/paper-rect-contrast.jpg");
const treeBarkImg = require("src/images/tree-bark.jpg");
const circlePatternImg = require("src/images/contemporary_china_small.png");
const oldPaperImg = require("src/images/4345189-xs.jpg");
const f0c4457 = require("src/images/f0c4457.jpg");
const maxresdefault = require("src/images/maxresdefault.jpg");
const blueTile = require("src/images/blueTile.jpg");
const tile = require("src/images/life_original_wild_urban_shells_abstract_texture_love-572258.jpg");
const paintingCracks = require("src/images/painting-cracks.jpg");
const Alcala_lg = require("src/images/Alcala_lg.jpg");
const map = require("src/images/map2.jpg");
const blue = require("src/images/blue.jpg");
const triangles123 = require("src/images/triangles-123.jpg");
const mU0yXR99Bg91S1ACSyPq_w = require("src/images/1_mU0yXR99Bg91S1ACSyPq_w.jpg");

// @for $i from 1 through 36 {
//   .color-#{$i} {
//     filter: hue-rotate(#{10 * $i}deg);
//   }
// }

export const BodyDiv = styled.div`
  line-height: 1em;
  height: 25em; /* 25 lines */
  overflow: hidden;
  font-family: "Garamond", serif;
  font-weight: 400;
  padding-bottom: 0.3em;
  padding-top: 1.5em;
  padding-bottom: 1.5em;
  padding-left: 0.5em;
  padding-right: 0.5em;
`;

let stringColors = "";

let i = 0;
while (i < 36) {
  i++;
  stringColors += `
    &.color-${i} .background-img, &.color-${i} .poem-text {
      filter: hue-rotate(${i * 10}deg);
    }
  `;
}

const PoemDiv = styled.div`
  ${stringColors};
  &.close-up {
    width: ${sizes.poemWidth * 2}px;
    font-size: ${sizes.fontSizeBase * 2}px;
    .background-img {
      width: ${sizes.poemWidth * 2}px;
      height: ${sizes.poemHeight * 2}px;
    }
    .poem-header, .poem-footer {
      font-size: ${sizes.fontSizeBase * 1.5}px;
    }
  }
  .poem-header, .poem-text, .poem-footer {
    padding-left: .5em;
    padding-right: .5em;
  }
  .poem-header, .poem-footer {
    width: 100%;
    background: rgba(0, 0, 0, 0);
    color: ${color.lightGrey};
    font-size: ${sizes.fontSizeBase}px;
    a {
      color: ${color.greyDarken1};
      &:hover {
        color: white;
      }
    }
  }
  width: ${sizes.poemWidth}px;
  margin: 1em;
  display: inline-block;
  vertical-align: text-top;
  text-align: center;
  position: relative; /* for absolute overflow styles */
  overflow: hidden;

  .background-img {
    content: "";
    background: url(${paperTextureImg});
    position: absolute;
    width: ${sizes.poemWidth}px;
    height: ${sizes.poemHeight}px;
    z-index: -10;
    top: 0;
    left: 0;
  }

  .is-selected {
    position: relative; /* for zindex */
    background: yellow;
  }
  .not-selected {
    color: rgba(0, 0, 0, 0.2);
  }

  /* @include mobile {
    width: 100%;
  } */

  &.style-1 {
    .background-img {
      filter: contrast(1.2);
    }
    .not-selected {
      color: rgba(0, 0, 0, 0.1);
      text-shadow: ${color.greyLighten2} 0 0 0.2em;
    }
    .is-selected {
      text-shadow: black 1px 1px 1px;
      background: none;
    }
  }

  &.style-2 {
    .background-img {
      filter: contrast(1.2);
    }
    .not-selected {
      opacity: 0;
    }
    .is-selected {
      background: none;
    }
  }

  &.style-3 {
    .background-img {
      filter: invert(100%);
    }
    .not-selected {
      opacity: .2;
    }
    .is-selected {
      background: none;
      color: white;
    }
  }

  &.style-4 {
    background: white;
    .is-selected {
      background: pink;
      &:before {
        content: "";
        position: absolute;
        height: 1.2em;
        width: 1000px;
        border: .2em solid;
        margin: -.1em;
        margin-left: -.3em;
        z-index: 11;
      }
    }
  }

  &.style-5 {
    .background-img {
      background: white;
    }
    .not-selected {
      color: black;
      border-top: solid 0.1em;
      border-bottom: solid 0.1em;
      text-decoration: line-through;
    }
    .is-selected {
      background: white;
      padding: ${sizes.spaceSm}px ${sizes.spaceSm}px;
      margin: ${-sizes.spaceSm}px;
      box-shadow: black 0.2em 0.2em 0;
    }
  }

  &.style-6 {
    .not-selected {
      background: rgba(0,0,0, .75);
    }
    .is_selected {
      background: white !important;
      padding: ${sizes.spaceSm}px ${sizes.spaceBase}px;
      margin: ${-sizes.spaceBase}px;
    }
  }

  &.style-7 {
    .background-img {
      background: url(${circlePatternImg});
    }
    .is-selected {
      background: none !important;
      text-shadow: black 0.05em 0.02em 0;
    }
  }

  &.style-8 {
    .background-img {
      background: url(${treeBarkImg});
    }
    .is-selected {
      color: white;
      background: red;
      padding: ${sizes.spaceSm}px ${sizes.spaceBase}px;
      margin: ${-sizes.spaceBase}px;
    }
  }

  &.style-9 {
    .background-img {
      background: url(${paintingCracks});
      background-size: 100%;
    }
    .is-selected {
      background: #3e144c;
      color: #cccbbf;
      padding: ${sizes.spaceSm}px ${sizes.spaceBase}px;
      margin: ${-sizes.spaceBase}px;
      .text {
        z-index: 10;
        color: white;
        position: relative;
      }
    }
  }

  &.style-10 {
    .background-img {
      background: url(${f0c4457});
      background-size: 100%;
    }
    .not-selected {
      color: rgba(255, 255, 255, .2);
    }
    .is-selected {
      background: none;
      color: white;
      padding: ${sizes.spaceSm}px ${sizes.spaceBase}px;
      margin: ${-sizes.spaceBase}px;
    }
  }

  &.style-11 {
    .background-img {
      background: url(${oldPaperImg});
      background-size: 100%;
    }
    .is-selected {
      background: #2c3c4e;
      color: #cccbbf;
      padding: ${sizes.spaceSm}px ${sizes.spaceBase}px;
      margin: ${-sizes.spaceBase}px;
      .text {
        z-index: 10;
        color: white;
        position: relative;
      }
    }
  }

  &.style-12 {
    .background-img {
      background: url(${mU0yXR99Bg91S1ACSyPq_w});
      background-size: 80%;
    }
    .not-selected {
      color: rgba(0, 0, 0, 0);
    }
    .is-selected {
      background: #0091ae;
      color: #e7b8bc;
      padding: ${sizes.spaceSm}px ${sizes.spaceBase}px;
      margin: ${-sizes.spaceBase}px;
    }
  }

  &.style-13 {
    .background-img {
      background: url(${maxresdefault});
      background-size: 120%;
    }
    .not-selected {
      color: rgba(0, 0, 0, 0);
    }
    .is-selected {
      background: none;
      color: white;
      padding: ${sizes.spaceSm}px ${sizes.spaceBase}px;
      margin: ${-sizes.spaceBase}px;
      text-shadow: white 1px 1px 1px;
    }
  }

  &.style-14 {
    .background-img {
      background: url(${blueTile});
      background-size: 20%;
    }
    .not-selected {
      color: rgba(0, 0, 0, 0);
    }
    .is-selected {
      background: #8f1660;
      color: #ebe8ce;
      padding: ${sizes.spaceSm}px ${sizes.spaceBase}px;
      margin: ${-sizes.spaceBase}px;
    }
  }

  &.style-15 {
    .background-img {
      background: url(${tile});
      filter: darken(6);
      background-size: 100%;
    }
    .is-selected {
      background: #2c3c4e;
      color: #cccbbf;
      padding: ${sizes.spaceSm}px ${sizes.spaceBase}px;
      margin: ${-sizes.spaceBase}px;
      .text {
        z-index: 10;
        color: white;
        position: relative;
      }
    }
  }

  &.style-16 {
    .background-img {
      background: url(${triangles123});
      background-repeat: repeat-y;
      background-size: 100%;
    }
    .is-selected {
      background: #f7ffa9;
      color: #499991;
      padding: ${sizes.spaceSm}px ${sizes.spaceBase}px;
      margin: ${-sizes.spaceBase}px;
    }
  }

  &.style-17 {
    .background-img {
      background: url(${Alcala_lg});
      background-repeat: repeat-y;
    }
    .is-selected {
      background: #380b1c;
      color: #d2d4d1;
      padding: ${sizes.spaceSm}px ${sizes.spaceBase}px;
      margin: ${-sizes.spaceBase}px;
    }
  }

  &.style-18 {
    .background-img {
      background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNjAiIGhlaWdodD0iMzAiPgo8ZGVmcz4KPHJlY3QgaWQ9InIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIxNSIgZmlsbD0iI2JiMDg1ZiIgc3Ryb2tlLXdpZHRoPSIyLjUiIHN0cm9rZT0iIzdhMDU0ZCI+PC9yZWN0Pgo8ZyBpZD0icCI+Cjx1c2UgeGxpbms6aHJlZj0iI3IiPjwvdXNlPgo8dXNlIHk9IjE1IiB4bGluazpocmVmPSIjciI+PC91c2U+Cjx1c2UgeT0iMzAiIHhsaW5rOmhyZWY9IiNyIj48L3VzZT4KPHVzZSB5PSI0NSIgeGxpbms6aHJlZj0iI3IiPjwvdXNlPgo8L2c+CjwvZGVmcz4KPHVzZSB4bGluazpocmVmPSIjcCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAtMjUpIHNrZXdZKDQwKSI+PC91c2U+Cjx1c2UgeGxpbms6aHJlZj0iI3AiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMwIDApIHNrZXdZKC00MCkiPjwvdXNlPgo8L3N2Zz4=");
      background-size: 100%;
    }
    .is-selected {
      background: white;
      color: black;
      padding: ${0.1}em ${0.3}em;
      margin: ${-0.1}em ${-0.3}em;
      .text {
        z-index: 11;
        position: relative;
      }
    }
  }

  &.style-19 {
    .background-img {
      background: url(${map});
      background-position-x: 60%;
      background-position-y: 70%;
    }
    .is-selected {
      background: black;
      padding: 5px 15px;
      margin: -15px;
      color: #61c098;
      padding: ${sizes.spaceSm}px ${sizes.spaceBase}px;
      margin: ${-sizes.spaceBase}px;
    }
  }

  &.style-20 {
  .background-img {
    background: url(${blue});
    background-size: 8%;
  }
  .not-selected {
    color: rgba(0, 0, 0, 0);
  }
  .is-selected {
    background: white;
    color: #008308;
    padding: 0 ${sizes.spaceSm}px;
    margin: 0 ${-sizes.spaceSm}px;
  }
`;

export default PoemDiv;
