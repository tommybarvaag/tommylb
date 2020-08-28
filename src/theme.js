export default {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: "inherit",
    monospace: "Menlo, monospace"
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125
  },
  colors: {
    text: "#000",
    background: "#fff",
    primary: "#000",
    secondary: "#30c",
    muted: "#f6f6f6",
    modes: {
      dark: {
        text: "#fff",
        background: "#000",
        primary: "#fff",
        secondary: "#30c",
        muted: "#f6f6f6"
      }
    }
  },
  sizes: {
    container: 700
  },
  styles: {
    root: {
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "body"
    },
    h1: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 5
    },
    h2: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 4
    },
    h3: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 3
    },
    h4: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 2
    },
    h5: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 1
    },
    h6: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 0
    },
    p: {
      color: "text",
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body"
    },
    textarea: {
      color: "text",
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body"
    },
    a: {
      color: "primary"
    },
    pre: {
      fontFamily: "monospace",
      overflowX: "auto",
      code: {
        color: "inherit"
      }
    },
    code: {
      fontFamily: "monospace",
      fontSize: "inherit"
    },
    table: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: 0
    },
    th: {
      textAlign: "left",
      borderBottomStyle: "solid"
    },
    td: {
      textAlign: "left",
      borderBottomStyle: "solid"
    },
    img: {
      maxWidth: "100%"
    }
  },
  layout: {
    container: {},
    nav: {
      display: "flex",
      height: 100,
      alignItems: "center",
      justifyContent: "space-between",
      px: 4
    },
    main: {
      width: "100%",
      flex: "1 1 auto",
      px: 4
    },
    footer: {
      display: "flex",
      height: 100,
      alignItems: "center",
      justifyContent: "space-between",
      px: 4
    },
    contactForm: {
      variant: "layout.container",
      maxWidth: 500,
      mt: 5
    }
  },
  buttons: {
    primary: {
      cursor: "pointer",
      color: "background"
    },
    secondary: {
      variant: "buttons.primary",
      fontWeight: "bold"
    },
    icon: {
      cursor: "pointer",
      color: "primary"
    }
  },
  text: {
    caps: {
      textTransform: "uppercase",
      letterSpacing: ".2em"
    },
    heading: {
      fontFamily: "heading",
      fontWeight: "heading",
      lineHeight: "heading"
    },
    display: {
      // extends the text.heading styles
      variant: "text.heading",
      fontSize: [6, 7, 8],
      fontWeight: "display"
    }
  },
  cards: {
    primary: {
      padding: 2,
      borderRadius: 4,
      boxShadow: "0 0 4px 1px rgba(0, 0, 0, 0.5)"
    }
  },
  forms: {
    label: {
      mt: 2,
      mb: 1
    },
    textarea: {
      fontFamily: "body"
    }
  }
};
