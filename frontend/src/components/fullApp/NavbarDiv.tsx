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
    padding-left: 0;
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
      max-width: 13rem;
      width: calc(100vw - 420px);
      fill: ${color.lightGrey};
    }
  }

  @media (max-width: ${sizes.mobileL}) {
    .logo {
      margin: 0;
    }
    .navbar {
      padding: 0;
    }
  }
  @media (max-width: ${sizes.tablet}) {
    .logo {
      margin: 0;
    }
    .navbar {
      padding: 0;
    }
  }
`;

export default NavbarDiv;
