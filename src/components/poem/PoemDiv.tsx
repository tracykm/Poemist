import styled from "styled-components";
import { sizes } from "src/components/universal/_variables";
const paperTextureImg = require("src/images/paper-rect-contrast.jpg");
const treeBarkImg = require("src/images/tree-bark.jpg");
const circlePatternImg = require("src/images/contemporary_china_small.png");
const oldPaperImg = require("src/images/old_paper_2_by_semireal_stock.jpg");
const f0c4457 = require("src/images/f0c4457.jpg");
const maxresdefault = require("src/images/maxresdefault.jpg");
const blueTile = require("src/images/blueTile.jpg");
const redTile = require("src/images/redTile.jpg");
const Alcala_lg = require("src/images/Alcala_lg.jpg");
const blackOutline = require("src/images/blackOutline.jpg");
const blue = require("src/images/blue.jpg");
const triangles123 = require("src/images/triangles-123.jpg");
const geoGreen = require("src/images/geoGreen.png");
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
  padding-bottom: 0.3em;
`;

let stringColors = "";

let i = 0;
while (i < 36) {
  i++;
  stringColors += `
    &.color-${i} {
      filter: hue-rotate(${i * 10}deg);
    }
  `;
}

const PoemDiv = styled.div`
  ${stringColors};
  &.close-up {
    width: ${sizes.poemWidth * 2}px;
    font-size: ${sizes.fontSizeBase * 2}px;
    padding: ${sizes.spaceBase * 2}px;
    margin: ${sizes.spaceBase * 2}px;
    .background-img {
      width: ${sizes.poemWidth * 2}px;
      height: ${sizes.poemHeight * 2}px;
      margin: ${-sizes.spaceBase * 2}px;
      padding: ${sizes.spaceBase * 2}px;
    }
  }
  font-family: 'Garamond';
  width: ${sizes.poemWidth}px;
  padding: ${sizes.spaceBase}px;
  margin: ${sizes.spaceBase}px;
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
    margin: ${-sizes.spaceBase}px;
    padding: ${sizes.spaceBase}px;
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
      color: rgba(0, 0, 0, 0.2);
    }
  }

  &.style-2 {
    .background-img {
      filter: contrast(1.2);
    }
    .not-selected {
      opacity: 0;
    }
  }

  &.style-3 {
    .background-img {
      filter: invert(100%);
    }
    .is-selected {
      color: white;
    }
  }

  &.style-4 {
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

  &.style-5 {
    .background-img {
      background: red;
    }
    .is-selected {
      background: url(${paperTextureImg});
      border-radius: ${sizes.spaceBase}px;
      padding: ${sizes.spaceSm}px ${sizes.spaceBase}px;
      margin: ${-sizes.spaceBase}px;
    }
  }

  &.style-6 {
    .not-selected {
      background: black;
    }
    .is_selected {
      background: url(${paperTextureImg});
      padding: ${sizes.spaceSm}px ${sizes.spaceBase}px;
      margin: ${-sizes.spaceBase}px;
    }
  }

  &.style-7 {
    .background-img {
      background: url(${circlePatternImg});
    }
    .is-selected {
      text-shadow: black 0.05em 0.02em 0;
    }
  }

  &.style-8 {
    background: white;
    .is-selected {
      background: pink;
      &:before {
        content: "";
        position: absolute;
        height: 1em;
        width: 1000px;
        border: 2px solid;
        margin-top: -2px;
        margin-left: -2px;
      }
    }
  }

  &.style-9 {
    .background-img {
      background: white;
    }
    .not-selected {
      color: black;
      border-top: solid 0.2em;
      border-bottom: solid 0.2em;
    }
    .is-selected {
      background: white;
      padding: ${sizes.spaceSm}px ${sizes.spaceSm}px;
      margin: ${-sizes.spaceSm}px;
    }
  }

  &.style-10 {
    .background-img {
      background: url(${f0c4457});
      background-size: 100%;
    }
    .not-selected {
      color: rgba(0, 0, 0, 0);
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
      background-size: 100% 82%;
    }
    .not-selected {
      color: rgba(0, 0, 0, 0.1);
    }
    .is-selected {
      background: none;
      color: black;
      /* text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white; */
      padding: ${sizes.spaceSm}px ${sizes.spaceBase}px;
      margin: ${-sizes.spaceBase}px;
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
      background: url(${redTile});
      background-size: 20%;
    }
    .is-selected {
      background: #2c3c4e;
      color: #cccbbf;
      padding: ${sizes.spaceSm}px ${sizes.spaceBase}px;
      margin: ${-sizes.spaceBase}px;
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
      background: url(${geoGreen});
    }
    .is-selected {
      background: #01868c;
      color: #d3f3d0;
      padding: ${sizes.spaceSm}px ${sizes.spaceBase}px;
      margin: ${-sizes.spaceBase}px;
    }
  }

  &.style-19 {
    .background-img {
      background: url(${blackOutline});
      background-size: 200% 120%;
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
    background-size: 50%;
  }
  .not-selected {
    color: rgba(0, 0, 0, 0);
  }
  .is-selected {
    background: white;
    color: #008308;
    padding: ${sizes.spaceSm}px ${sizes.spaceBase}px;
    margin: ${-sizes.spaceBase}px;
  }
`;

export default PoemDiv;
