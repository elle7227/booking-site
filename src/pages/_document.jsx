import Document, { Html, Head, Main, NextScript } from "next/document";


//pageprops er den data som ligger på siden, props specifikke egenskaber vi sender videre.

export default class MyDocument extends Document {
  render() {
    const pageProps = this.props?.__NEXT_DATA__?.props?.pageProps;
    //vi destrukturere pageprops og splitter det i 3 props.
    const { isLanding, isProgram, isSchedule } = pageProps;

    let bodyClass = "";
    if (isLanding) {
      bodyClass = "landing-background";
    } else if (isProgram) {
      bodyClass = "program-background";
    } else if (isSchedule) {
      bodyClass = "schedule-background";
    } else {
      bodyClass = "default-background";
    }

    return (
      <Html lang="en">
        <Head />
        <body className={bodyClass}>
          <link rel="stylesheet" href="https://use.typekit.net/bxq7sds.css" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
