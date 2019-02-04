import styled, { css } from 'styled-components'

export const colors = {
  nprogress: '#FF3838',
  background: '#ccc'
}

export const dimensions = {
  mobileLarge: 400,
  tablet: 600,
  tabletLarge: 768,
  desktop: 1000,
  desktopLarge: 1280,
  desktopHuge: 1440
}

export const media = {
  mobile: (...args) => css`
    @media (max-width: ${dimensions.tablet - 1}px) {
      ${css(...args)};
    }
  `,
  mobileLarge: (...args) => css`
    @media (min-width: ${dimensions.mobileLarge}px) {
      ${css(...args)};
    }
  `,
  tablet: (...args) => css`
    @media (min-width: ${dimensions.tablet}px) {
      ${css(...args)};
    }
  `,
  onlyTabletWithoutLarge: (...args) => css`
    @media (min-width: ${dimensions.tablet}px) and (max-width: ${dimensions.tabletLarge - 1}px) {
      ${css(...args)};
    }
  `,
  beforeDesktop: (...args) => css`
    @media (max-width: ${dimensions.desktop - 1}px) {
      ${css(...args)};
    }
  `,
  desktop: (...args) => css`
    @media (min-width: ${dimensions.desktop}px) {
      ${css(...args)};
    }
  `,
  desktopLarge: (...args) => css`
    @media (min-width: ${dimensions.desktopLarge}px) {
      ${css(...args)};
    }
  `,
  desktopHuge: (...args) => css`
    @media (min-width: ${dimensions.desktopHuge}px) {
      ${css(...args)};
    }
  `
}

export const maxHeight = css`
  height: 100%;
`

export const MaxHeight = styled.div`
  ${maxHeight};
`

export const onlyMobile = css`
  @media (min-width: ${dimensions.tablet}px) {
    display: none !important;
  }
`

export const onlyTablet = css`
  @media (max-width: ${dimensions.tablet - 1}px), (min-width: ${dimensions.laptop}px) {
    display: none !important;
  }
`

export const onlyDesktop = css`
  @media (max-width: ${dimensions.desktop - 1}px), (min-width: ${dimensions.desktopLarge}px) {
    display: none !important;
  }
`

export const withDesktop = css`
  @media (max-width: ${dimensions.desktop - 1}px) {
    display: none !important;
  }
`

export const onlyDesktopLarge = css`
  @media (max-width: ${dimensions.desktopLarge - 1}px), (min-width: ${dimensions.desktopHuge}px) {
    display: none !important;
  }
`

export const onlyDesktopHuge = css`
  @media (max-width: ${dimensions.desktopHuge - 1}px) {
    display: none !important;
  }
`

export const withTablet = css`
  @media (max-width: ${dimensions.tablet - 1}px) {
    display: none !important;
  }
`

export const listStyleNone = css`
  margin: 0;
  padding: 0;
  list-style: none;
`

export const Container = styled.div`
  margin: 0 auto;
  padding: 0 20px;

  ${media.tablet`
    padding: 0 40px;
  `};

  ${media.desktopHuge`
    max-width: 1200px;
  `};

  ${props =>
    props.wide &&
    css`
      ${media.tablet`
        max-width: 1440px;
      `};
    `};
`
