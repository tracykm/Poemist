import styled from "styled-components";
import { sizes, color } from "src/components/universal/_variables";

const NavbarDiv = styled.div`
  li {
    display: inline-block;
    margin: ${sizes.spaceBase}px;
  }
  text-align: right;
  position: fixed;
  top: 0;
  z-index: 30;
  background: ${color.darkGrey};
  color: ${color.lightGrey};
  width: 100%;
  padding: ${sizes.spaceBase}px;
  height: ${sizes.headerHeight}px;

  a {
    color: ${color.lightGrey};
  }

  .active {
    color: white;
  }

  .navbarMenu {
    margin-bottom: 0;
    /* background: $dark-grey; */

    /* @include mobile {
        li {
          display: block;
        }
      } */
  }
  .hamburger {
    display: none;

    /* @include mobile {
        display: block;
      } */
  }

  .hidden-xs {
    /* @include mobile {
        display: none;
      } */
  }

  .logo {
    float: left;
    margin: ${sizes.spaceBase}px;
    svg {
      width: 13rem;
      fill: ${color.lightGrey};
    }
  }
`;

export default NavbarDiv;
