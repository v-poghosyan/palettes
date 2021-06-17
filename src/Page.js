import React from 'react';

/* In App.js, writing <Page>page contents</Page> passes "page contents" in props.children to this component. Below, we're extracting children from props. */

function Page({children}) {
  return <section className="page">{children}</section>
}

export default Page;